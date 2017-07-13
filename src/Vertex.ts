/**
 * Created by Егор on 13.07.2017.
 */
import {Md5} from 'ts-md5/dist/md5';
import {IVertex} from "./IVertex";

export class Vertex implements IVertex {
  private _id: number;
  private _name: string;
  private _label: string;

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  private setName(theName: string): void {
    this._name = theName;
  }
  public get label(): string {
    return this._label;
  }
  public set label(theLabel: string) {
    this._label = theLabel;
  }

  public constructor(name: string) {
    this._name = name;
    this._id = Math.random();
    this._label = "";
  }

  public rename(newName: string) {
    this.setName(newName);
  }

  public toString(): string {
    return this.name;
  }

  public clone(): IVertex {
    return new Vertex(this.name);
  }

  public hash(): string {
    return <string> Md5.hashStr(this.id.toString());
  }

  public eguals(vertex: IVertex) {
    return this.id == vertex.id;
  }

}