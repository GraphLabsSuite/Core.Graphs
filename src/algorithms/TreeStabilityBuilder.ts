import {TreeNode} from '../main/TreeNode'
import {Graph} from '../main/Graph'
import {Vertex} from '../main/Vertex'
import {Edge} from '../main/Edge'

export class TreeStabilityBuilder {
  public static graphToTreeNode(taskGraph: Graph<Vertex, Edge>): string[][] {
    const treeNode = new TreeNode<{nonneighbourhood: Vertex[], graph: Graph<Vertex, Edge>}>("G", {
      nonneighbourhood: [],
      graph: taskGraph
    });
    const rootNodeId = TreeNode.lastId;
    const queue: number[] = [rootNodeId];
    const answers: string[][] = [];

    while (queue.length) {
      const parentNode = treeNode.getNodeById(queue.shift());

      const childrenNodes = taskGraph.getNeighbourhood(taskGraph.getVertexWithMinDegree()).concat(taskGraph.getVertexWithMinDegree());
      childrenNodes.forEach(node => {
        treeNode.addChild(parentNode.id, node.name, {
          nonneighbourhood: parentNode.weight.graph.getNonNeighbourhood(node),
          graph: <Graph<Vertex, Edge>>taskGraph.getSubgraph(parentNode.weight.graph.getNonNeighbourhood(node))
        })
        const newGraph = treeNode.getNodeById(TreeNode.lastId).weight.graph;
        if (newGraph.vertices.length) {
          const answer: string[] = [];
          let id = TreeNode.lastId;
          while (id !== rootNodeId) {
            const n = treeNode.getNodeById(id);
            answer.push(n.label);
            id = n.parentId;
          }
          answers.push(answer);
        } else {
          queue.push(TreeNode.lastId);
        }
      })
    }
    return TreeStabilityBuilder.cleanAnswer(answers);
  }

  private static cleanAnswer(answers: string[][]): string[][] {
    const newAnswer: string[][] = [];
    answers.forEach(a => {
      if (newAnswer.some(e => TreeStabilityBuilder.arrayIsEqual(e, a))) return;
      newAnswer.push(a);
    });
    return newAnswer;
  }

  private static arrayIsEqual(array1: string[], array2: string[]): boolean {
    if (array1.length !== array2.length) return false;
    return array1.every(e1 => array2.some(e2 => e1 === e2));
  }
}
