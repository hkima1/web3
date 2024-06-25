const express = require("express");
const app = express();
const cors = require("cors");
const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { genrate_address } = require("./script/genertae_addresses")
const port = 3042;
app.use(cors());
app.use(express.json());
//const whitelist = ['http://localhost:5173']; // assuming front-end application is running on localhost port 3000

/*const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}*/


const balances = {
  "0x1b5af5b6839ff40ff046" : 100,
  "0xbe122e78221eeeb346cc" : 75,
  "0xe9fab33062e367fa2ee4" : 80
};

app.get("/balance/:address", (req,res)=>{
  const {address}= req.params;
  console.log("The address of the sender : ", address);
  const balance= balances[address] || 0;
  res.send({balance});
});

app.post("/send", (req, res) => {
  const  {Hex_sig,recovery_Bit, amount, recipient }= req.body;

  const signature1 = Hex_sig.split(',');
  const message_hash=keccak256(utf8ToBytes([amount, recipient].toString()))

  const signature=new secp256k1.Signature(BigInt(signature1[0]),BigInt(signature1[1]),recovery_Bit);
  const sender = signature.recoverPublicKey(message_hash).toHex();

  const verify_sender= secp256k1.verify(signature,message_hash,sender);
  console.log("The sender is :",account[sender]);
  console.log("His balance before update: ",balances[account[sender]]);
  if(verify_sender==true){
    AvoidStuck(sender);
    AvoidStuck(recipient);
    if (balances[account[sender]] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else if(account[sender]===recipient) {
      res.status(400).send({ message: "You Are sending to the same account!" });
    }else {
      balances[account[sender]] -= amount;
      balances[recipient] += amount;
      console.log("His balance after update: ",balances[account[sender]])
      res.send({ balance: balances[sender] });
    }
  }
  
  
});
app.listen(port,()=> {
  console.log(`Listening on port ${port}!`);
})

function AvoidStuck(address){
  if(!balances[address]){
    balances[address]=0;
  }
}

const account = {
  "027fe841e51f5bb1f90687498b6625e9c5992c7d5cc99570252e742912b291bbec" : "0x1b5af5b6839ff40ff046",
  "034912ffb571c62e5febfbc58a6351dd0403362a06403dfb9c6b3dfbe462e57a9b" : "0xbe122e78221eeeb346cc",
  "0291ef42526cc1210903f3ea0697ef8556dcb6b5105b35d32d5cb8f568d1b9e174" : "0xe9fab33062e367fa2ee4"
};
