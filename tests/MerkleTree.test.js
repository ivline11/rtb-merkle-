import MerkleTree from "../src/MerkleTree";

describe("MerkleTree", () => {
  it("두 노드로부터 루트 노드를 만들어야 합니다.", () => {
    const leaves = ["A", "B"];
    const concat = (a, b) => `Hash(${a} + ${b})`;

    const merkleTree = new MerkleTree(leaves, concat);

    expect(merkleTree.getRoot()).toBe("Hash(A + B)");
  });
});
