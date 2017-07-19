import {IVertex} from "../main/IVertex";
import {IGraph} from "../main/IGraph";

/**
 * Checker of the two graphs isomorphism
 */
export class IsomorphismChecker {

    public static bijection: { [key: string]: string; };

    public static permute(vertices: IVertex[]): IVertex[][] {
        //TODO: find out the way of creating generator
        // if (xs.Length == 0) yield return pre;
        // for (int i = 0; i < xs.Length; i++)
        // {
        //     var tmp_xs = xs.Take(i).Union(xs.Skip(i + 1)).ToArray();
        //     var tmpParams = pre.Union(new[] { xs[i] }).ToArray();
        //     foreach (T[] y in Permute(tmp_xs, tmpParams))
        //     {
        //         yield return y;
        //     }
        // }
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