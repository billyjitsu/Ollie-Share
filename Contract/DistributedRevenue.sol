// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (finance/PaymentSplitter.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Distributed Revenue
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

contract DistributedRevenueV0 is Context, Ownable {
    uint256 feePercentage = 1;
    uint256 ownerBalance = 0;
    uint256 combinedDistributedAmount;

    event PayeeAdded(address account, uint256 shares);
    event PaymentReleased(address to, uint256 amount);
    event ERC20PaymentReleased(IERC20 indexed token, address to, uint256 amount);
    event PaymentReceived(address from, uint256 amount);

    struct NFTProject {
        uint256 _currentDistributionId; //need to initialise to 0?
        uint256 _totalShares;
        uint256 _totalReleased;
        uint256 _totalDistributed;
        mapping(address => distShares) _shares;
        address[] _sharesAddress;
        uint256[] _distributedSum; //Structure: _distributedSum[distributionId]
        uint256[] _totalDistributedShares;
        mapping(address => uint256) _released;
        uint256 _balance;
    }

    mapping(address => NFTProject) private NFT;
    address[] NFTList;

    struct distShares {
        uint256[] _distribution;
    }

    function addNFTToList(address contractAddress) private {
        NFTList.push(contractAddress);
    }

    function existingNFT(address contractAddress) public view returns (bool) {
        bool exist = false;
        for(uint256 i=0; i < NFTList.length && exist == false; i++){
            if(NFTList[i] == contractAddress){
                exist = true;
            }
        }
        return exist;
    }

    /**
    * @dev Returns the account holder's NFT projects that gives revenue
    */
    function getAccountNFTProjects(address account) public view returns (address[] memory) {
        uint256 count = getAccountNFTProjectsCount(account);
        address[] memory accountNFT = new address[](count);
        uint256 k = 0;
        for(uint256 i=0; i < NFTList.length; i++){
            for(uint256 j=0; j < NFT[NFTList[i]]._sharesAddress.length; j++){
                if(NFT[NFTList[i]]._sharesAddress[j] == account){
                    //Cannot push
                    accountNFT[k] = NFTList[i];
                    k++;
                }
            }
        }
        return accountNFT;
    }

    function getAccountNFTProjectsCount(address account) public view returns (uint256) {
        uint256 count;
        for(uint256 i=0; i < NFTList.length; i++){
            for(uint256 j=0; j < NFT[NFTList[i]]._sharesAddress.length; j++){
                if(NFT[NFTList[i]]._sharesAddress[j] == account){
                    count++;
                }
            }
        }
        return count;
    }

    /**
     * @dev Creates an instance of `DynamicPaymentSplitter` where each account in `payees` is assigned the number of shares at
     * the matching position in the `shares` array.
     *
     * All addresses in `payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no
     * duplicates in `payees`.
     */
    constructor(address contractAddress, address[] memory account, uint256[] memory share, uint256 totalShares, uint256 paymentAmount) payable {
        addDistributedPayment(contractAddress, account, share,  totalShares, paymentAmount);
    }

    /**
    * @dev Access payeeAddress that contains distribution Id and shares
    * Example: distShares[0x01][2] = 3 i.e. Payee had 3 shares during distribution 2
    */

    function getLatestDistributionId(address contractAddress) public view returns (uint256) {
        return NFT[contractAddress]._currentDistributionId;
    }

    /**TEST
    0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
    */
    function getPayeeShareAtDistribution (address contractAddress, address account, uint256 distributionId) public view returns (uint256) {
        return NFT[contractAddress]._shares[account]._distribution[distributionId];
    }

    function addPayeeShareAtDistribution (address contractAddress, address account, uint256 distributionId, uint256 shareCount) private {
        while(NFT[contractAddress]._shares[account]._distribution.length < distributionId + 1) {
            NFT[contractAddress]._shares[account]._distribution.push(0);
        }
        NFT[contractAddress]._shares[account]._distribution[distributionId] = shareCount;
    }

    function getsharesDistributionLength(address contractAddress, address account) public view returns (uint256){
        uint256[] memory data = NFT[contractAddress]._shares[account]._distribution;
        return data.length;
    }

    function payeeTotalDistributedAmount (address contractAddress, address account) public view returns (uint256) {
        uint256 total = 0;
        uint256[] memory data = NFT[contractAddress]._shares[account]._distribution;
        for (uint256 i=0; i < data.length; i++){
            total = total + (data[i]  * NFT[contractAddress]._distributedSum[i]) / NFT[contractAddress]._totalDistributedShares[i]; 
        }
        return total;
    }

    function getDistributedSum(address contractAddress, uint256 distributionId) public view returns (uint256) {
        return NFT[contractAddress]._distributedSum[distributionId];
    }

    function getTotalDistributedShares(address contractAddress, uint256 distributionId) public view returns (uint256) {
        return NFT[contractAddress]._totalDistributedShares[distributionId];
    }

    //"share" corresponds to account's number of shares
    function addDistributedPayment (address contractAddress, address[] memory account, uint256[] memory share, uint256 totalShares, uint256 paymentAmount) public payable{
        //update NFT List
        if (!existingNFT(contractAddress)){
            addNFTToList(contractAddress);
        }
        uint256 fee = (paymentAmount * feePercentage)/100;
        ownerBalance += fee;
        uint256 amount = paymentAmount - fee;

        for(uint256 i=0; i < account.length; i++){
            bool added = false;
            for(uint j=0; j<NFT[contractAddress]._sharesAddress.length && added == false; j++){
                if(account[i] == NFT[contractAddress]._sharesAddress[j]) {
                    addPayeeShareAtDistribution(contractAddress, NFT[contractAddress]._sharesAddress[j], NFT[contractAddress]._currentDistributionId,share[i]);
                    added = true;
                }
            //if got new payee address
            }
            if (added == false){
                NFT[contractAddress]._sharesAddress.push(account[i]);
                addPayeeShareAtDistribution(contractAddress, NFT[contractAddress]._sharesAddress[NFT[contractAddress]._sharesAddress.length-1], NFT[contractAddress]._currentDistributionId,share[i]);
            }
        }

        NFT[contractAddress]._distributedSum.push(amount);
        NFT[contractAddress]._totalDistributedShares.push(totalShares);
        NFT[contractAddress]._currentDistributionId++;
        NFT[contractAddress]._balance += amount;
        NFT[contractAddress]._totalDistributed += amount;

        combinedDistributedAmount =  combinedDistributedAmount + amount;

        require( msg.value >= amount);
    }


    function released(address contractAddress, address account) public view returns (uint256) {
        return NFT[contractAddress]._released[account];
    }

        /**
     * @dev Triggers a transfer to `account` of the amount of Ether they are owed, according to their percentage of the
     * total shares and their previous withdrawals.
     */
    function release(address contractAddress, address payable account) public virtual {
        require(account == msg.sender, "Unauthorised release");
        uint256 totalPayable = payeeTotalDistributedAmount(contractAddress, account);
        uint256 payment = totalPayable - NFT[contractAddress]._released[account];

        //uint256 totalReceived = address(this).balance + totalReleased();
        //uint256 payment = _pendingPayment(account, totalReceived, released(account));

        require(payment > 0, "PaymentSplitter: account is not due payment");

        NFT[contractAddress]._released[account] += payment;
        NFT[contractAddress]._balance -= payment;
        NFT[contractAddress]._totalReleased += payment;

        Address.sendValue(account, payment);
        emit PaymentReleased(account, payment);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getNFTProjectBalance(address contractAddress) public view returns (uint256) {
        return NFT[contractAddress]._balance;
    }

    function getNFTProjectTotalReleased(address contractAddress) public view returns (uint256) {
        return NFT[contractAddress]._totalReleased;
    }

    function getNFTProjectTotalDistributed(address contractAddress) public view returns (uint256) {
        return NFT[contractAddress]._totalDistributed;
    }

    function getCombinedDistributedAmount() public view returns (uint256) {
        return combinedDistributedAmount;
    }

    function getFeePercentage() public view returns (uint256){
        return feePercentage;
    }

    function setFeePercentage(uint256 fee) public onlyOwner {
        feePercentage = fee;
    }
    
    function ownerWithdraw() public onlyOwner {
        require(payable(msg.sender).send(ownerBalance));
        ownerBalance = 0;
    }
    


}