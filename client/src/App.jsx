import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.css";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [private_address, setprivate_Address] = useState("");
  return (
    <div className="app" class="flex m-16">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        private_address={private_address}
        setprivate_Address={setprivate_Address}
      />
      <Transfer address={address} setBalance={setBalance} private_address={private_address} setprivate_Address={setprivate_Address}></Transfer>
    </div >
  );
}

export default App;
