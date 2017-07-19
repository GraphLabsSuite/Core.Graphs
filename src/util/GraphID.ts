export class GraphID {

    private idValue: number;

    public static generate(): GraphID {
        return new GraphID();
    }

    public get idValue(): number {
        return this.idValue;
    }

    public constructor() {
        this.idValue =  Math.random();
    }

    public equals(id: GraphID): boolean {
        return this.idValue == id.idValue;
    }
}