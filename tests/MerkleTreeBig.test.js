import MerkleTreeBig from "../src/MerkleTreeBig";

describe("MerkleTreeBig", () => {
  const concat = (a, b) => `Hash(${a} + ${b})`;

  it("두 노드로부터 루트 노드를 만들어야 합니다.", () => {
    const leaves = ["A", "B"];

    const merkleTree = new MerkleTreeBig(leaves, concat);

    expect(merkleTree.getRoot()).toBe("Hash(A + B)");
  });

  it("네 개의 노드로부터 루트 노드를 만들어야 합니다.", function () {
    const leaves = ["A", "B", "C", "D"];

    const merkleTree = new MerkleTreeBig(leaves, concat);

    expect(merkleTree.getRoot()).toBe("Hash(Hash(A + B) + Hash(C + D))");
  });
});
