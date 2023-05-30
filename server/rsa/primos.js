export function primosAte(numero) {
    if (numero % 2 === 0) numero--;
    const numeros = new Array(((numero + 1) / 2) - 1).fill(1);
    let p = 3;
    let t;

    while (Math.pow(p, 2) < numero) {
        const indice = (p - 1) / 2 - 1;
        if (numeros[indice] == 0) {
            p = p + 2;
        } else {
            t = Math.pow(p, 2);
            do {
                const i = (t - 1) / 2 - 1;
                numeros[i] = 0;
                t = t + (2 * p);
            } while (t <= numero)
            p = p + 2;
        }
    }
    
    const primos = [];
    numeros.forEach((num, index) => num == 1 ? primos.push(2 * (index + 1) + 1) : null)
    primos.unshift(2);
    return primos;
}

// console.log(primosAte(100));