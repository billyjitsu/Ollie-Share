
import OlliePolygon from './images/Ollie_Polygon.gif';
export const homeObjOne = {
  id: 'about',
  lightBg: true,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Premium Bank',
  headline: 'Unlimited Transactions with zero fees',
  description:
    'Get access to our exclusive app that allows you to send unlimited transactions without getting charged any fees',
  buttonLabel: 'Get Started',
  imgStart: false,
  img: require('./images/Ollie_Polygon.gif'),
  alt: 'Car',
  dark: true,
  primary: true,
  darkText: false
};

export const homeObjTwo = {
  id: 'discover',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Powered by Polygon',
  headline: 'Distribute funds easily with minimal gas fees',
  description:
    "All you need to do is enter your NFT Smart Contract address and click 'distribute'. That's all!",
  buttonLabel: 'Learn More',
  imgStart: true,
  img: OlliePolygon,
  alt: 'Piggybank',
  dark: false,
  primary: false,
  darkText: true
};

export const homeObjThree = {
  id: 'signup',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Join our Team',
  headline: 'Creating an account is extremely easy',
  description:
    "Get everything set up and ready in under 10 minutes. All you need to do is add your information and you're ready to go.",
  buttonLabel: 'Start Now',
  imgStart: false,
  img: require('./images/svg-3.svg'),
  alt: 'Papers',
  dark: false,
  primary: false,
  darkText: true
};
