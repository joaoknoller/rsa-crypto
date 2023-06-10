import { primosAte } from "./primos.js";
import { caractereParaCodigo, codigoParaCaractere } from "./rsa-auxiliar.js";
import { fatoracao, fatoracaoFermat } from "./fatoracao.js";
import inversoModular, {
  congruenciaModular,
  potenciacaoModular,
} from "./aritmetica-modular.js";

function textoParaCodigo(texto, tamanhoAlfabeto) {
  let textoCodificado = "";

  for (const iterator of texto) {
    textoCodificado += caractereParaCodigo(iterator, tamanhoAlfabeto);
  }

  return textoCodificado;
}

function quebrarMensagemEmBlocos(mensagem, n) {
  let blocos = [];
  let menor = "";
  let maior = "";
  
  for (let i = 0; i < mensagem.length; i++) {
      maior += mensagem[i];
      
      if (+maior > n) {
          blocos.push(+menor);
          menor = "";
          maior = "";
          i--;
      } else {
          if (mensagem[i + 2] == '0' && mensagem[i + 1] != '0') {
              blocos.push(+maior);
              menor = "";
              maior = "";
          } else {
              if (i == mensagem.length - 1)
                  blocos.push(+maior);
              menor += mensagem[i];
          }
      }
  }
  
  return blocos;
}

function calcularFi(n) {
  const [p, q] = fatoracaoFermat(n);

  return (p - 1) * (q - 1);
}

function calcularE(n) {
  const fi = calcularFi(n);
  const fatoresDeFi = fatoracao(fi).map((fator) => fator[0]);
  const primosAteN = primosAte(n);
  const e = primosAteN.filter((x) => !fatoresDeFi.includes(x))[0];

  return e;
}

function codificarBloco(bloco, n) {
  const e = calcularE(n);
  const blocoElevado = potenciacaoModular(bloco, e, n);
  const blocoModulado = congruenciaModular(blocoElevado, n);

  return blocoModulado > 0 ? blocoModulado : blocoModulado + n;
}

function decodificarBlocos(blocos, n) {
  const e = calcularE(n);
  const fi = calcularFi(n);
  const inversoE = inversoModular(e, fi);

  return blocos.map((b) => {
    const blocoDecodificado = potenciacaoModular(b, inversoE, n);
    return blocoDecodificado > 0 ? blocoDecodificado : blocoDecodificado + n;
  });
}

function cifrar(texto, n, tamanhoAlfabeto) {
  const textoCifrado = textoParaCodigo(texto, tamanhoAlfabeto);
  const textoEmBlocos = quebrarMensagemEmBlocos(textoCifrado, n);

  return new Promise((resolve, reject) => {
    resolve(textoEmBlocos.map((b) => codificarBloco(b, n)));
  });
}

function decifrar(blocos, n, tamanhoAlfabeto) {
  const blocosDecodificados = decodificarBlocos(blocos, n);
  const palavra = blocosDecodificados.join("");
  const texto = [];

  for (let i = 0; i < palavra.length; i = i + tamanhoAlfabeto) {
    let letra = '';
    for (let j = 0; j < tamanhoAlfabeto; j++) {
      const caractere = palavra[i + j];
      if (caractere !== undefined && Number.isInteger(+caractere))
        letra += `${palavra[i + j]}`;
    }
    texto.push(letra);
  }

  return new Promise((resolve, reject) => {
    resolve(texto.map((t) => codigoParaCaractere(t, tamanhoAlfabeto)).join(""));
  });
}

export { cifrar, decifrar };
