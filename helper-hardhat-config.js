const { ethers } = require("hardhat");

const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane:
            "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "4628",
        callbackGasLimit: ethers.utils.parseEther("0.000000002"), //"2gwei",
        interval: "30",
        daiEthPriceFeed: "0xb4c4a493AB6356497713A78FFA6c60FB53517c63",
        usdEthPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        mintFee: "1000000000",
    },
    31337: {
        name: "hardhat",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane:
            "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callbackGasLimit: "50000",
        interval: "30",
        subscriptionId: "4628",
        mintFee: "1000000000",
    },
};

const DECIMALS = "18";
const INITIAL_PRICE = "200000000000000000000";
const developmentChains = ["hardhat", "localhost"];
const frontEndAbiLocation = "../nextjs-nft-marketplace/constants/";
const frontEndContractsFile =
    "../nextjs-nft-marketplace/constants/networkMapping.json";

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_PRICE,
    frontEndAbiLocation,
    frontEndContractsFile,
};
