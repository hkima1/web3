import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js"
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";

export const generate_sig = async (amount, recipient, private_key ) => {
    const message_hash = keccak256(utf8ToBytes([amount, recipient].toString()));
    const { r, s, recovery }=  secp256k1.sign(message_hash, private_key);
    const Hex_sig = [r,s].toString();
    const recovery_Bit = recovery;
    return { Hex_sig, recovery_Bit };
};