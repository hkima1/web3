const secp = require("@noble/curves/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");


const privateKey = secp.secp256k1.utils.randomPrivateKey();
const pubKey = secp.secp256k1.getPublicKey(privateKey);

console.log(toHex(privateKey));
console.log(toHex(pubKey));
