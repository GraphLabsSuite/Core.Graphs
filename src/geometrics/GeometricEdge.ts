import {Edge} from "../main/Edge";
import {Color} from "../types/Color";
import {EdgeShape} from "../enums/EdgeShape";
import {Point} from "../types/Point";

export class GeometricEdge<T extends Edge> {
  public edge: T;

  public shape: EdgeShape = EdgeShape.WithoutArrow;

  public width: number;

  public color: Color = new Color(0,0,0);

  public inPoint: Point = new Point(0,0);

  public outPoint: Point = new Point(0,0);

  public constructor<T>(edge: T) {
    this.edge = edge;
  }
}