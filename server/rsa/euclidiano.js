function euclidianoEstendido(a, b) {
    let max = Math.max(a, b);
    let min = Math.min(a, b);
    let resto;
    if (max === min) return { mdc: max, alpha: 2, beta: -1 }
    const ehDivisivel = max % min == 0;

    const matriz = [];
    matriz[0] = [max, 0, 1, 0];
    matriz[1] = [
        min,
        0,
        ehDivisivel ? 1 : 0,
        ehDivisivel ? 1 - Math.floor(max / min) : 1
    ];
    let i = 2;

    do {
        resto = max % min;
        max = min;
        min = resto;
        const q = Math.floor(matriz[i - 2][0] / matriz[i - 1][0]);
        const x = matriz[i - 2][2] - q * matriz[i - 1][2];
        const y = matriz[i - 2][3] - q * matriz[i - 1][3];
        matriz[i] = [resto, q, x, y];
        i++;
    } while (resto != 0)

    const alpha = a < b ? matriz[matriz.length - 2][3] : matriz[matriz.length - 2][2];
    const beta = a < b ? matriz[matriz.length - 2][2] : matriz[matriz.length - 2][3];
    return {
        mdc: matriz[matriz.length - 2][0],
        alpha: alpha,
        beta: beta
    }
}

// testes
/*console.log("42 e 42:")
console.log(euclidianoEstendido(42, 42))
console.log("\n14 e 35:")
console.log(euclidianoEstendido(14, 35))
console.log("\n252 e 180:")
console.log(euclidianoEstendido(252, 180))
console.log("\n6643 e 2873:")
console.log(euclidianoEstendido(6643, 2873))
console.log("\n272828282 e 3242:")
console.log(euclidianoEstendido(272828282, 3242))
console.log("\n35 e 14:")
console.log(euclidianoEstendido(35, 14))
console.log("\n42 e 7:")
console.log(euclidianoEstendido(42, 7))
console.log("\n7 e 42:")
console.log(euclidianoEstendido(7, 42))*/
export default euclidianoEstendido;