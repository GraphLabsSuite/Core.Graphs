import {IVertex} from "../types/IVertex";
import {IGraph} from "../types/IGraph";

/**
 * Checker of the two graphs isomorphism
 */
export class IsomorphismChecker {

    public static bijection: { [key: string]: string; };

    //Not sure this is the right way to emulate generators working
    public static permute(vertices: IVertex[], pre: IVertex[][] = []): IVertex[][] {
        const result: IVertex[][] = [];
        if (vertices.length == 0) return pre;
        for (let i = 0; i < vertices.length; i++) {
            const tmp_vertices: IVertex[] = [];
            vertices.forEach(v => {
                if (!v.equals(vertices[i])) tmp_vertices.push(v);
            });
            const tmpParams: IVertex[][] = [];
            pre.forEach(v => tmpParams.push(v));
            tmpParams.push([vertices[i]]);
            for (const y of this.permute(tmp_vertices, tmpParams)) {
                result.push(y);
            }
        }
        return result;
    }

    public static updateBijection(verticesOne: IVertex[], verticesTwo: IVertex[]): void {
        IsomorphismChecker.bijection = {};
        verticesTwo.forEach(a => {
           verticesOne.map(b => {
               IsomorphismChecker.bijection[a.name] =  b.name;
           });
        });
    }

    private static compareHelper(vertexOne: IVertex, vertexTwo: IVertex): boolean {
        return vertexOne.name == IsomorphismChecker.bijection[vertexTwo.name];
    }

    public static directCompare(graphOne: IGraph, graphTwo: IGraph): boolean {
        let equals: number = 0;
        const count: number = graphOne.edgesNumber;
        for (let i: number = 0; i < count; i++)
        for (let j: number = 0; j < count; j++)
        if (IsomorphismChecker.compareHelper(graphOne.edges[i].vertexOne, graphTwo.edges[j].vertexOne) &&
            IsomorphismChecker.compareHelper(graphOne.edges[i].vertexTwo, graphTwo.edges[j].vertexTwo) ||
            (IsomorphismChecker.compareHelper(graphOne.edges[i].vertexTwo, graphTwo.edges[j].vertexOne) &&
            IsomorphismChecker.compareHelper(graphOne.edges[i].vertexOne, graphTwo.edges[j].vertexTwo)))
        {
          equals++;
          break;
        }
        return equals == count;
    }

    public static checkIsomorphism(graphOne: IGraph, graphTwo: IGraph): boolean {
        if (graphOne.verticesNumber != graphTwo.verticesNumber || graphOne.edgesNumber != graphTwo.edgesNumber)
            return false;
        IsomorphismChecker.permute(graphOne.vertices).forEach(perm => {
            IsomorphismChecker.updateBijection(perm, graphTwo.vertices);
            if (IsomorphismChecker.directCompare(graphOne, graphTwo))
              return true;
        });
        return false;
    }
}