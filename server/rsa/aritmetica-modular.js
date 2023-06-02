import euclidianoEstendido from "./euclidiano.js";

function menorDentreAbsolutos(numeros) {
    const numerosAbsolutos = numeros.map(n => Math.abs(n));
    const minimoAbsuluto = Math.min(...numerosAbsolutos);
    let menor;

    numeros.forEach(num => (Math.abs(num) === minimoAbsuluto) ? menor = num : null);

    return menor;
}

export function congruenciaModular(numero, modulo) {
    do {
        numero = numero % modulo;
    } while(numero > modulo)

    const limites = [
        numero - modulo,
        numero,
        numero + modulo
    ];

    return menorDentreAbsolutos(limites);
}

export function potenciacaoModular(base, expoente, modulo) {
    if (expoente == 0) return 1;

    const resultados = [];
    resultados[0] = congruenciaModular(base, modulo);
    let anterior = resultados[0];

    for (let index = 1; index < expoente; index++) {
        const atual = congruenciaModular(resultados[0] * anterior, modulo);
        if (atual === 0) return 0;

        resultados.push(atual);
        anterior = atual;
    }

    return resultados[expoente - 1];
}

function inversoModular(numero, modulo) {
    const {mdc, beta} = euclidianoEstendido(modulo, numero);

    if (mdc === 1) {
        if (beta < 0) return beta + modulo;
        else return beta;
    } else {
        return 0;
    }
}

export default inversoModular;