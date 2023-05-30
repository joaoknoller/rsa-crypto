function algarismoParaCaractere(algarismo) { return algarismo.toString() }
function caractereParaAlgarismo(caractere) { return Number(caractere) }
function numeroParaTexto(numero) { return numero.toString() }
function textoParaNumero(texto) { return Number(texto) }
export function caractereParaCodigo(caractere) { return caractere.charCodeAt(0) + 100 }
export function codigoParaCaractere(codigo) { return String.fromCharCode(codigo - 100) }

/*console.log(algarismoParaCaractere(2))
console.log(caractereParaAlgarismo('3'))
console.log(numeroParaTexto(123));
console.log(textoParaNumero('321'));
console.log(caractereParaCodigo('A'));
console.log(codigoParaCaractere(165));*/

// for (let index = 0; index < 256; index++) {
//     const caractere = String.fromCharCode(index);
//     const codigo = caractereParaCodigo(caractere);
//     console.log(`${caractere} -> ${codigo} | ${codigo} -> ${codigoParaCaractere(codigo)}`);
// }