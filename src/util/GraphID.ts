export class GraphID {

    private _idValue: number;

    public static generate(): GraphID {
        return new GraphID();
    }

    public get idValue(): number {
        return this._idValue;
    }

    public constructor() {
        this._idValue =  Math.random();
    }

    public equals(id: GraphID): boolean {
        return this.idValue == id.idValue;
    }
}