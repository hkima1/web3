import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.css";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  return (
    <div className="app" class="flex m-16">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer address={address} setBalance={setBalance}></Transfer>
    </div >
  );
}

export default App;
