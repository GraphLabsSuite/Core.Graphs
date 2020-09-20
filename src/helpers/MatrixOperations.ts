/**
 * Matrix operations
 */
export class MatrixOperations {

    public static Sum(matrix1: number[][], matrix2: number[][] ): number[][] {
        if (matrix1.length == matrix2.length && matrix1[0].length == matrix2[0].length){
            for (let i:number = 0; i < matrix1.length; i++){
                for (let j: number = 0; j <matrix1[i].length; j++){
                    matrix1[i][j] += matrix2[i][j]
                }
            }
        }
        return matrix1;
    }

    public static Multiply(matrix1: number[][], matrix2: number[][] ): number[][] {
        const result: number[][] = [];
        if (matrix1[0].length == matrix2.length){
            for (let i:number = 0; i < matrix1.length; i++){
                result[i] = [];
                for (let k: number = 0; k < matrix2[i].length; k++){
                    result[i][k] = 0;
                    for (let j: number = 0; j < matrix2. length; j++) {
                        result[i][k] += matrix1[i][j] * matrix2[j][k];
                    }
                }
            }
        }
        return result;
    }

    public static Power(matrix: number[][], power: number ): number[][] {
        if (power > 0){
            for (let k: number = 1; k < power; k++)
            matrix = MatrixOperations.Multiply(matrix, matrix);
        }
        return matrix;
    }

    public static Binary(matrix: number[][]): number[][] {
        for (let i:number = 0; i < matrix.length; i++){
            for (let j: number = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] > 0){
                        matrix[i][j] = 1;
                    }
            }
        }
        return matrix;
    }
}