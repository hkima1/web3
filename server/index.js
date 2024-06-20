const secp = require("@noble/curves/secp256k1");
const {utf8ToBytes, toHex} = require("ethereum-cryptography/utils");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const whitelist = ['http://localhost:5173']; // assuming front-end application is running on localhost port 3000

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());

const balances = {
  "027fe841e51f5bb1f90687498b6625e9c5992c7d5cc99570252e742912b291bbec": 100,
  "034912ffb571c62e5febfbc58a6351dd0403362a06403dfb9c6b3dfbe462e57a9b" : 75,
  "0291ef42526cc1210903f3ea0697ef8556dcb6b5105b35d32d5cb8f568d1b9e174" : 80
};

app.get("/balance/:address", (req,res)=>{
  console.log(req);
  const [signature,hash,recoveryBit]= req.params;
  const sender= secp.recoverPublicKey(hash, signature, recoveryBit);
  console.log(sender);
  const balance= balances[address] || 0;
  res.send({balance});
});

app.post("/send", (req, res) => {
  const  [signature, { amount, recipient }, bool]= req.body;
  const sender= secp.recoverPublicKey(keccak256(utf8ToBytes(parseInt(amount) + " " + { recipient })), signature, recoveryBit);
  console.log(sender);
  AvoidStuck(sender);
  AvoidStuck(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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

