const quantidade = (arr, val) => {
    let vezes = 0;
    arr.forEach((valor) => (val === valor) && vezes++)
    return vezes
}

export function fatoracao(numero) {
    let fator = 2;
    const fatoresPrimos = [];
    const primeiro = numero;
    while (fator <= Math.sqrt(primeiro)) {
        if (numero % fator === 0) {
            fatoresPrimos.push(fator);
            numero = numero / fator;
            fator = fator;
        } else {
            fator++;
        }
    }

    const arrayFinal = [];
    fatoresPrimos.forEach(fator => {
        if (arrayFinal.findIndex(item => item[0] === fator) == -1) {
            arrayFinal.push([fator, quantidade(fatoresPrimos, fator)])
        }
    })

    if (numero !== 1) {
        arrayFinal.push([numero, 1])
    }
    
    return arrayFinal;
}

// pt1
// console.log(fatoracao(175557))
// console.log(fatoracao(455621))
// console.log(fatoracao(731021))
// console.log(fatoracao(10))
// console.log(fatoracao(11))
// console.log(fatoracao(100))

export function fatoracaoFermat(numero) {
    let x, y, numeroEhPrimo;
    x = Math.floor(Math.sqrt(numero));

    if (numero % 2 === 0) {
        return [
            2,
            numero / 2
        ]
    }
    
    if (Math.pow(x, 2) === numero) {
        return [x, x];
    }
    
    do {
        x = x + 1;
        y = Math.sqrt((Math.pow(x, 2) - numero));
        numeroEhPrimo = x == ((numero + 1) / 2) ? true : false;
    } while(!Number.isInteger(y) && !numeroEhPrimo)
 
    return [
        x - y,
        x + y
    ];
}

// console.log(fatoracaoFermat(175557))
// console.log(fatoracaoFermat(455621))
// console.log(fatoracaoFermat(731021))
// console.log(fatoracaoFermat(625))
// console.log(fatoracaoFermat(1024))
// console.log(fatoracaoFermat(101))
// console.log(fatoracaoFermat(4294967295))