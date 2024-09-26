const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  // Grabing the parameters from the front-end here
  const { node, proof } = req.body;

  // Verifying if the data sent is present or not
  const isInTheList = verifyProof(proof, node, MERKLE_ROOT);

  // Sending response back to the front-end
  if(isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
