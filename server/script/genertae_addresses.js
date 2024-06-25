const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {utf8ToBytes, toHex} = require("ethereum-cryptography/utils");

function genrate_address(publicKey){
const publicKeyHash = toHex(keccak256(utf8ToBytes(publicKey)));
console.log("the byte pub:", utf8ToBytes(publicKey));
const sender = `0x${publicKeyHash.slice(-20)}`;
return sender;
}
module.exports = {genrate_address};
