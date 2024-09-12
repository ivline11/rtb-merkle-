import MerkleTreeVerify from "../src/MerkleTreeVerify";
import verify from "../src/verify";

const concat = (a, b) => `Hash(${a} + ${b})`;

describe("MerkleTreeVerify", () => {
  describe("a given merkle tree", () => {
    const leaves = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
    const root =
      "Hash(Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";
    let tree;

    beforeEach(() => {
      tree = new MerkleTreeVerify(leaves.slice(0), concat);
    });

    describe("untampered proofs", () => {
      leaves.forEach((_, i) => {
        it(`should verify the proof for leaf index ${i}`, () => {
          const proof = tree.getProof(i);
          expect(verify(proof, leaves[i], root, concat)).toBe(true);
        });
      });
    });

    describe("tampered proofs", () => {
      describe("verifying a different node with a proof", () => {
        it("should not verify the proof", () => {
          const proof = tree.getProof(2);
          expect(verify(proof, leaves[3], root, concat)).toBe(false);
        });
      });

      describe("verifying a different root", () => {
        it("should not verify the proof", () => {
          const proof = tree.getProof(2);
          const badRoot =
            "Hash(Hash(Hash(Hash(A + C) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";
          expect(verify(proof, leaves[2], badRoot, concat)).toBe(false);
        });
      });

      describe("flipping a node's position", () => {
        it("should not verify the proof", () => {
          const proof = tree.getProof(3);
          proof[1].left = !proof[1].left;
          expect(verify(proof, leaves[3], root, concat)).toBe(false);
        });
      });

      describe("editing a hash", () => {
        it("should not verify the proof", () => {
          const proof = tree.getProof(5);
          proof[2].data = "Q";
          expect(verify(proof, leaves[5], root, concat)).toBe(false);
        });
      });
    });
  });
});
