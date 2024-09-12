import MerkleTreeProof from "../src/MerkleTreeProof";
import { hashProof, sha256, concatHash, concatLetters } from "../src/testUtil";

describe("MerkleTreeProof", () => {
  const leaves = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const root =
    "eb100814abc896ab18bcf6c37b6550eeadeae0c312532286a4cf4be132ace526";
  const hashTree = new MerkleTreeProof(leaves.map(sha256), concatHash);
  const lettersTree = new MerkleTreeProof(leaves, concatLetters);

  describe("모든 리프(leaf)에 대해서", () => {
    leaves.forEach((leaf, i) => {
      it(`리프 ${leaves[i]}로부터 루트를 계산하는 proof를 반환해야 한다.`, function () {
        const proof = hashTree.getProof(i);
        const hashedProof = hashProof(leaf, proof).toString("hex");
        if (hashedProof !== root) {
          const lettersProof = lettersTree.getProof(i);
          console.log(
            "The resulting hash of your proof is wrong. \n" +
              `We were expecting: ${root} \n` +
              `We received: ${hashedProof} \n` +
              `In ${leaves.join("")} Merkle tree, the proof of ${
                leaves[i]
              } you gave us is: \n` +
              `${JSON.stringify(lettersProof, null, 2)}`
          );
        }

        expect(hashedProof).toBe(root);
      });
    });
  });
});
