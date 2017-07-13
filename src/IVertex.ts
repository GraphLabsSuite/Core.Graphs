/**
 * Created by Егор on 13.07.2017.
 */
namespace GraphLabs.Core.Graphs {
  export interface IVertex {
    id: number;
    name: string;
    label?: string;
    rename: (newName: string)=> IVertex
  }
}