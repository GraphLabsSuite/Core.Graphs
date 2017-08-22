import {Vertex} from "../main/Vertex";
import {Color} from "../types/Color";
import {Point} from "../types/Point";

export class GeometricVertex<T extends Vertex> {
  public vertex: T;

  public backgroundColor: Color = new Color(255,255,255);

  public borderColor: Color = new Color(0, 0, 0);

  public borderWidth: number = 1;

  public label: string;

  public radius: number = 10;

  public center: Point = new Point(0,0);

  public constructor<T extends Vertex>(vertex: T) {
    this.vertex = vertex;
    this.label = vertex.name;
  }
}