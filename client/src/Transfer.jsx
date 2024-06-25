import { useState } from "react";
import server from "./server";
import { generate_sig } from "./generate_sig.js";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js"
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";


function Transfer({ address, setBalance, private_address }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);
  async function transfer(evt) {
    evt.preventDefault();
    const { Hex_sig, recovery_Bit } = await generate_sig(amount, recipient, private_address);
    const message_hash = toHex(utf8ToBytes([amount, recipient].toString()));
    try {
      const {
        data: { balance } } = await server.post("/send", { Hex_sig, recovery_Bit, amount: parseInt(amount), recipient });
      setBalance(balance);
      alert("Amount successfully transfered");
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <form className="transfer" onSubmit={transfer} class="mx-auto p-32 border-double border-4 border-indigo-600  bg-gradient-to-r from-sky-500 to-indigo-500">
      <h1 class="bg-slate-400	rounded-md	p-4 pl-24 pr-24  m-8 block mb-2 text-md font-medium text-gray-1200 dark:text-white ">Transaction Box</h1>
      <label for="wallet-recep" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipient :</label>
      <div class="flex">
        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </span>
        <input value={recipient} id="wallet-recep" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="addrrss such 0x1..." onChange={setValue(setRecipient)} />
      </div>

      <label for="wallet-amou" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
      <div class="flex">
        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg>
        </span>
        <input value={amount} id="wallet-amou" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Set send amount " onChange={setValue(setAmount)} />
      </div>
      <input type="submit" className="button" value="Transfer" class=" p-8 m-32 mt-16 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" />
    </form>

  );
}
export default Transfer;