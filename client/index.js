const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // Generating a random index between the range 0 - 1000
  const index = Math.floor(Math.random() * 1001);

  // Creating a merkle tree in order to retrieve the merkle path
  const merkleTree = new MerkleTree(niceList);

  // Getting the merkle path for the data that needs to be proved
  const proof = merkleTree.getProof(index);

  console.log(index, niceList[index], proof);

  // Sending the data to the verifier (in this case, server) in order to verify if data is present
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    node: niceList[index],
    proof
  });

  // Response from the verifier
  // Must be always true, since data is taken from the niceList itself
  // We could try sending some random string which is not in niceList as node, in order to get false as response
  console.log({ gift });
}

main();