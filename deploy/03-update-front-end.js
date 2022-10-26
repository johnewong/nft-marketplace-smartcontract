const {
    frontEndContractsFile,
    frontEndAbiLocation,
} = require("../helper-hardhat-config");
require("dotenv").config();
const fs = require("fs");
const { network } = require("hardhat");

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...");
        await updateContractAddresses();
        await updateAbi();
        console.log("Front end written!");
    }
};

async function updateAbi() {
    console.log("frontEndAbiLocation", frontEndAbiLocation);
    const nftMarketplace = await ethers.getContract("NftMarketplace");
    fs.writeFileSync(
        `${frontEndAbiLocation}NftMarketplace.json`,
        nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
    );

    const basicNft = await ethers.getContract("BasicNftNew");
    fs.writeFileSync(
        `${frontEndAbiLocation}BasicNftNew.json`,
        basicNft.interface.format(ethers.utils.FormatTypes.json)
    );
}

async function updateContractAddresses() {
    console.log("frontEndContractsFile", frontEndContractsFile);
    console.log(" network.config.chainId", network.config.chainId);
    const chainId = network.config.chainId.toString();
    const nftMarketplace = await ethers.getContract("NftMarketplace");
    const contractAddresses = JSON.parse(
        fs.readFileSync(frontEndContractsFile, "utf8")
    );
    if (chainId in contractAddresses) {
        if (
            !contractAddresses[chainId]["NftMarketplace"].includes(
                nftMarketplace.address
            )
        ) {
            contractAddresses[chainId]["NftMarketplace"].push(
                nftMarketplace.address
            );
        }
    } else {
        contractAddresses[chainId] = {
            NftMarketplace: [nftMarketplace.address],
        };
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}
module.exports.tags = ["all", "frontend"];
