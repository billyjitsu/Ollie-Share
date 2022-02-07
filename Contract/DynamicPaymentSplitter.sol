// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (finance/PaymentSplitter.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";

/**
 * @title DynamicPaymentSplitter
 * @dev This contract allows to split Ether payments among a group of accounts. The sender does not need to be aware
 * that the Ether will be split in this way, since it is handled transparently by the contract.
 *
 * The split can be in equal parts or in any other arbitrary proportion. The way this is specified is by assigning each
 * account to a number of shares. Of all the Ether that this contract receives, each account will then be able to claim
 * an amount proportional to the percentage of total shares they were assigned.
 *
 * `PaymentSplitter` follows a _pull payment_ model. This means that payments are not automatically forwarded to the
 * accounts but kept in this contract, and the actual transfer is triggered as a separate step by calling the {release}
 * function.
 *
 * NOTE: This contract assumes that ERC20 tokens will behave similarly to native tokens (Ether). Rebasing tokens, and
 * tokens that apply fees during transfers, are likely to not be supported as expected. If in doubt, we encourage you
 * to run tests before sending real value to this contract.
 */

 /**
 TESTS
1. ID = 0 (CONSTRUCTOR)
["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"]
[1,2,3] = 6
500 MATIC
2. ID = 1
["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"]
[1,3,2] = 6
600 MATIC
3. ID = 2
["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"]
[1,4,1,2] = 8
700 MATIC
 */
contract DynamicPaymentSplitterTest is Context {
    uint256 currency = 0.001 ether;


    event PayeeAdded(address account, uint256 shares);
    event PaymentReleased(address to, uint256 amount);
    event ERC20PaymentReleased(IERC20 indexed token, address to, uint256 amount);
    event PaymentReceived(address from, uint256 amount);

    uint256 private _totalShares;
    uint256 private _totalReleased;

    //TODO: check whether cna start from zero or one
    uint256 currentDistributionId = 0;
    uint256[] private _distributedSum; //Structure: _distributedSum[distributionId]
    uint256[] private _totalDistributedShares;

    struct distShares {
        uint256[] _distribution;
    }
    /**
    * @dev Access payeeAddress that contains distribution Id and shares
    * Example: distShares[0x01][2] = 3 i.e. Payee had 3 shares during distribution 2
    */

    mapping(address => distShares) private _zhares;
    address[] _zharesAddress;

    function getLatestDistributionId() public view returns (uint256) {
        return currentDistributionId;
    }

    /**TEST
    0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
    */
    function getPayeeShareAtDistribution (address account, uint256 distributionId) public view returns (uint256) {
        return _zhares[account]._distribution[distributionId];
    }

    function addPayeeShareAtDistribution (address account, uint256 distributionId, uint256 shareCount) private {
        while(_zhares[account]._distribution.length < distributionId + 1) {
            _zhares[account]._distribution.push(0);
        }
        _zhares[account]._distribution[distributionId] = shareCount;
    }

    function getZharesDistributionLength(address account) public view returns (uint256){
        uint256[] memory data = _zhares[account]._distribution;
        return data.length;
    }

    function payeeTotalDistributedAmount (address account) public view returns (uint256) {
        uint256 total = 0;
        uint256[] memory data = _zhares[account]._distribution;
        for (uint256 i=0; i < data.length; i++){
            total = total + (data[i]  * _distributedSum[i]) / _totalDistributedShares[i]; 
        }
        return total;
    }

    function getDistributedSum(uint256 distributionId) public view returns (uint256) {
        return _distributedSum[distributionId];
    }

    function getTotalDistributedShares(uint256 distributionId) public view returns (uint256) {
        return _totalDistributedShares[distributionId];
    }

    //"share" corresponds to account's number of shares
    function addDistributedPayment (address[] memory account, uint256[] memory share, uint256 totalShares, uint256 paymentAmount) public payable{
        //update
        uint256 amount = paymentAmount * currency;

        for(uint256 i=0; i < account.length; i++){
            bool added = false;
            for(uint j=0; j<_zharesAddress.length && added == false; j++){
                if(account[i] == _zharesAddress[j]) {
                    addPayeeShareAtDistribution(_zharesAddress[j], currentDistributionId,share[i]);
                    added = true;
                }
            //if got new payee address
            }
            if (added == false){
                _zharesAddress.push(account[i]);
                addPayeeShareAtDistribution(_zharesAddress[_zharesAddress.length-1], currentDistributionId,share[i]);
            }
        }

        _distributedSum.push(amount);
        _totalDistributedShares.push(totalShares);
        currentDistributionId++;

        

        require( msg.value >= amount);
    }

    mapping(address => uint256) private _shares;
    mapping(address => uint256) private _released;
    address[] private _payees;

    mapping(IERC20 => uint256) private _erc20TotalReleased;
    mapping(IERC20 => mapping(address => uint256)) private _erc20Released;

    /**
     * @dev Creates an instance of `DynamicPaymentSplitter` where each account in `payees` is assigned the number of shares at
     * the matching position in the `shares` array.
     *
     * All addresses in `payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no
     * duplicates in `payees`.
     */
    constructor(address[] memory account, uint256[] memory share, uint256 totalShares, uint256 paymentAmount) payable {
        addDistributedPayment(account, share,  totalShares, paymentAmount);
    }

    function released(address account) public view returns (uint256) {
        return _released[account];
    }

        /**
     * @dev Triggers a transfer to `account` of the amount of Ether they are owed, according to their percentage of the
     * total shares and their previous withdrawals.
     */
    function release(address payable account) public virtual {
        //require(_shares[account] > 0, "PaymentSplitter: account has no shares");

        uint256 totalPayable = payeeTotalDistributedAmount(account);
        uint256 payment = totalPayable - _released[account];

        //uint256 totalReceived = address(this).balance + totalReleased();
        //uint256 payment = _pendingPayment(account, totalReceived, released(account));

        require(payment > 0, "PaymentSplitter: account is not due payment");

        _released[account] += payment;
        //_totalReleased += payment;

        Address.sendValue(account, payment);
        emit PaymentReleased(account, payment);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

}
