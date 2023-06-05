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
  const bloco = [];
  const mensagemCodigo = mensagem.split("");
  let blocoAtual = "";
  let perigo = false;

  mensagemCodigo.forEach((val, index) => {
    if (+val === 0 && perigo === true) {
      perigo = false;
      return (blocoAtual = "");
    }

    blocoAtual = blocoAtual + val;

    if (+(blocoAtual + mensagemCodigo[index + 1]) > n) {
      if (+mensagemCodigo[index + 1] === 0) {
        const anterior = +`${+blocoAtual % 10}0`;
        blocoAtual = Math.trunc(blocoAtual / 10);
        perigo = true;
        return bloco.push(+blocoAtual, anterior);
      }

      bloco.push(+blocoAtual);
      return (blocoAtual = "");
    }

    if (index + 1 === mensagemCodigo.length) {
      return bloco.push(+blocoAtual);
    }
  });

  return bloco;
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

  for (let i = 0; i < palavra.length; i = i + 3) {
    texto.push(`${palavra[i]}${palavra[i + 1]}${palavra[i + 2]}`);
  }

  return new Promise((resolve, reject) => {
    resolve(texto.map((t) => codigoParaCaractere(t, tamanhoAlfabeto)).join(""));
  });
}

export { cifrar, decifrar };
