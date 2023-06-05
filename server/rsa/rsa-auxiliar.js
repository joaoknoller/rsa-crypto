function algarismoParaCaractere(algarismo) {
  return algarismo.toString();
}
function caractereParaAlgarismo(caractere) {
  return Number(caractere);
}
function numeroParaTexto(numero) {
  return numero.toString();
}
function textoParaNumero(texto) {
  return Number(texto);
}
export function caractereParaCodigo(caractere, tamanhoAlfabeto) {
  return caractere.charCodeAt(0) + 10 ** (tamanhoAlfabeto - 1);
}
export function codigoParaCaractere(codigo, tamanhoAlfabeto) {
  return String.fromCharCode(codigo - 10 ** (tamanhoAlfabeto - 1));
}
