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
        // if (atual === 1) {

        // }

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

/*[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(i => console.log(`base: 10 - mod: 7 - i: ${i} = ${potenciacaoModular(10, i, 7)}`));
console.log('\n\n');
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(i => console.log(`base: 2 - mod: 6 - i: ${i} = ${potenciacaoModular(2, i, 6)}`));
console.log('\n\n');
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(i => console.log(`base: 2 - mod: 8 - i: ${i} = ${potenciacaoModular(2, i, 8)}`));*/


/*[1, 2, 3, 4].forEach(i => console.log(`modulo: 4 - numero: ${i} - inverso: ${inversoModular(i, 4)}`));
console.log('\n\n');
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(i => console.log(`modulo: 11 - numero: ${i} - inverso: ${inversoModular(i, 11)}`));
console.log('\n\n');
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].forEach(i => console.log(`modulo: 15 - numero: ${i} - inverso: ${inversoModular(i, 15)}`));*/

export default inversoModular;