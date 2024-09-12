export default class MerkleTreeVerify {
  /*
  TODO: 이전 단계에서 만든 코드 전체를 복사해서 아래에 붙여넣기 한뒤, src/verify.js를 작성해주세요.
  */
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
    this.root = this.getRoot();
    this.proof = this.getProof();
  }

  /*
    TODO: 다음의 조건을 만족하는 함수를 만들어주세요.
    - 트리의 루트 노드를 찾아주는 함수입니다.
    */
  getRoot() {
    let nodes = this.leaves;
    while (nodes.length > 1) {
      let newLevel = [];
      for (let i = 0; i < nodes.length; i += 2) {
        if (i + 1 < nodes.length) {
          newLevel.push(this.concat(nodes[i], nodes[i + 1]));
        } else {
          newLevel.push(nodes[i]);
        }
      }
      nodes = newLevel;
    }
    return nodes[0];
  }

  /*
    TODO: 리프 노드의 인덱스를 받아서 proof를 반환합니다.
    증명은 해시를 나타내는 data 속성과 해시가 왼쪽에 있는지를 나타내는 left 속성을 가진 객체들의 배열이 됩니다.
    (예시)
    [
    { data: 'D', left: false },
    { data: 'AB', left: true },
    { data: 'E', left: false }
    ]
    */
  getProof(index) {
    let proof = [];
    let nodes = this.leaves;
    let currentIndex = index;
    while (nodes.length > 1) {
      let newLevel = [];
      for (let i = 0; i < nodes.length; i += 2) {
        // 짝이 있을 때 (i + 1이 유효한 인덱스일 때)
        if (i + 1 < nodes.length) {
          newLevel.push(this.concat(nodes[i], nodes[i + 1]));
          // 현재 노드의 인덱스가 짝이 될 경우 증명에 추가
          if (i === currentIndex || i + 1 === currentIndex) {
            let isLeftNode = currentIndex === i;
            proof.push({
              data: isLeftNode ? nodes[i + 1] : nodes[i],
              left: !isLeftNode,
            });
            //i나 i+1이 index인 경우.
            //currentIndex가 i면 isLeftNode가 true, 아니면 false
            //true면 오른쪽,  nodes[i+1]을 반환하고
            //그 아래에서 false를 반환한다.
            //false면 왼쪽 nodes[i]를 반환하고, 그 아래에 true를 반환한다.
            currentIndex = Math.floor(i / 2); // 상위 레벨에서의 새로운 인덱스(바닥함수 구간은 1/2)
          }
        } else {
          // 짝이 없으면 그대로 상위 레벨로 올림
          newLevel.push(nodes[i]);
          if (i === currentIndex) {
            currentIndex = Math.floor(i / 2);
          }
        }
      }
      nodes = newLevel; // 다음 레벨로 이동
    }

    return proof;
  }
}
