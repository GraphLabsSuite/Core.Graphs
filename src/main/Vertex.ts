import {Md5} from 'ts-md5/dist/md5';
import {IVertex} from "../types/IVertex";
import {IGraph} from "../types/IGraph";
import {IEdge} from "../types/IEdge";
import {GraphID} from "../util/GraphID";

/**
 * @classdesc
 * The vertex implementation of IVertex interface
 */
export class Vertex implements IVertex {

  /**
   * @property
   * @private
   * Reference to the graph the vertex belongs to
   */
  private _graphReference?: IGraph<IVertex,IEdge>;

  /**
   * @property
   * @private
   * The identifier of the vertex
   */
  private _id: GraphID;
  /**
   * @property
   * @private
   * The name of the vertex shown visually
   */
  private _name: string;
  /**
   * @property
   * @private
   * The additional label for extra information (i.e. weight)
   */
  private _label: string;

  /**
   * @property
   * @public
   * Getter for the _id field
   * @returns {number}
   */
  public get id(): GraphID {
    return this._id;
  }

  /**
   * @property
   * @public
   * Getter for _name field
   * @returns {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * @property
   * @private
   * Private emulated setter for _name field
   * @param theName
   */
  private setName(theName: string): void {
    this._name = theName;
  }

  /**
   * @property
   * @public
   * Getter for _label field
   * @returns {string}
   */
  public get label(): string {
    return this._label;
  }

  /**
   * @property
   * @public
   * Setter for _label field
   * @param theLabel
   */
  public set label(theLabel: string) {
    this._label = theLabel;
  }

  /**
   * @constructor
   * @param name
   * @param graph
   */
  public constructor(name: string, graph?: IGraph<IVertex, IEdge>) {
    this._name = name;
    this._id = GraphID.generate();
    this._label = "";
    this._graphReference = graph
  }

  /**
   * @public
   * Allows to change the name field of the vertex
   * @param newName
   */
  public rename(newName: string) {
    this.setName(newName);
  }

  /**
   * @public
   * Checks whether the edge is incident to the vertex
   * @param edge
   */
  public isIncident(edge: IEdge): boolean {
    return edge.vertexOne.name === this.name || edge.vertexTwo.name === this.name;
  }

  /**
   * @public
   * Checks whether the vertex is adjacent to the given one
   * @param vertex
   */
  public isAdjacent(graph: IGraph<IVertex, IEdge>, vertex: IVertex): boolean {
    if (graph.edges.some((e: IEdge) =>
        (vertex && this && ((e.vertexOne.name === this.name
            && e.vertexTwo.name === vertex.name)
            || (e.vertexOne.name === vertex.name
                && e.vertexTwo.name === this.name)))))
      return true;
    else
      return false;
  }

  /**
   * @public
   * Return the array of incident edges for the vertex
   * @param graph
   */
  public arrOfIncidentEdges(graph: IGraph<IVertex, IEdge>): IEdge[] {
    let res: IEdge[] = [];
    for (let i = 0; i < graph.edges.length; i++) {
      if (this.isIncident(graph.edges[i])) {
        res.push(graph.edges[i]);
      }
    }
    return res;
  }
  
  /**
   * @public
   * Return the array of adjacent vertices for the vertex
   * @param graph
   */
  
    public arrOfAdjacentVertices(graph: IGraph<IVertex, IEdge>): IVertex[] {
    let res: IVertex[] = [];
    for (let i = 0; i < graph.vertices.length; i++) {
      if (this.isAdjacent(graph.vertices[i])) {
        res.push(graph.vertices[i]);
      }
    }
    return res;
  }

  /**
   * @public
   * Returns string representation of the vertex
   * @returns {string}
   */
  public toString(): string {
    return this.name;
  }

  /**
   * @public
   * Deep vertex-cloning
   * @returns {Vertex}
   */
  public clone(): Vertex {
    return new Vertex(this.name);
  }

  /**
   * @public
   * Calculates the hash function of the vertex
   * @returns {string}
   */
  public hash(): string {
    return <string> Md5.hashStr(this.id.toString());
  }

  /**
   * @public
   * Checks whether the second vertex equals with this one
   * @param vertex
   * @returns {boolean}
   */
  public equals(vertex: IVertex): boolean {
    if (vertex == null) return false;
    return this.id.equals(vertex.id);
  }

}
