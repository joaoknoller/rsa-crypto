function algarismoParaCaractere(algarismo) { return algarismo.toString() }
function caractereParaAlgarismo(caractere) { return Number(caractere) }
function numeroParaTexto(numero) { return numero.toString() }
function textoParaNumero(texto) { return Number(texto) }
export function caractereParaCodigo(caractere) { return caractere.charCodeAt(0) + 100 }
export function codigoParaCaractere(codigo) { return String.fromCharCode(codigo - 100) }
