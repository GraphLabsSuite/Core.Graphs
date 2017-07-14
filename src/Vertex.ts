/**
 * Created by Егор on 13.07.2017.
 */
import {Md5} from 'ts-md5/dist/md5';
import {IVertex} from "./IVertex";

/**
 * @classdesc
 * The vertex implementation of IVertex interface
 */
export class Vertex implements IVertex {
  /**
   * @property
   * @private
   * The identifier of the vertex
   */
  private _id: number;
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
  public get id(): number {
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
   */
  public constructor(name: string) {
    this._name = name;
    this._id = Math.random();
    this._label = "";
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
  public clone(): IVertex {
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
  public eguals(vertex: IVertex): boolean {
    return this.id == vertex.id;
  }

}