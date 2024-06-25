import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js"
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";
import { useEffect } from "react";


function Wallet({ address, setAddress, balance, setBalance, private_address, setprivate_Address }) {
  async function onChange(evt) {
    const private_address = evt.target.value;
    setprivate_Address(private_address);
    console.log("This the private key of the selected account : ", private_address);
    const pubKey_add = secp256k1.getPublicKey(private_address);
    const pubkey_hash = toHex(keccak256(pubKey_add));
    address = `0x${pubkey_hash.slice(-20)}`;
    console.log("The address of the sender is : ", address)
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      console.log(balance);
      setBalance(balance);
    } else {
      setBalance(0);
    }
    evt.target.select.defaultValue;
  }
  return (
    <div className="wallet-container border-2" class="border-double border-4 border-rose-600 p-32 bg-gradient-to-r from-purple-500 to-pink-500		">
      <h1 class="bg-slate-400	rounded-md	p-4 pl-36  m-8 block mb-2 text-md font-medium text-gray-900 dark:text-white">Wallet Box</h1>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
        <form class="max-w-sm mx-auto">
          <label class="sr-only">Choose a state</label>
          <select id="states" onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue selected>Choose an account</option>
            <option value="287d9fef06090e9378cc6b8ffa2882dc2d8f891221eab4fd83d897ac5baa7828">account 1 : 0x1b5af5b6839ff40ff046</option>
            <option value="77b45518fe4a778725cd17f3e39bc5a7b7a5863bcbdba74dddc1ecb20db6a83b">account 2 : 0xbe122e78221eeeb346cc</option>
            <option value="fc73776c87602ae5b7a6090d9c4a23b4023c4b2df9b55f0418b0db6cfd1cd330">account 3 : 0xe9fab33062e367fa2ee4</option>
          </select>
        </form>
      </label>
      <div className="Balance container" class="m-12 ml-2"> Unfortunately The current Balance is : {balance} ,You Should get more! </div>
    </div>
  )
}
export default Wallet;