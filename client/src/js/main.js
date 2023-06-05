import * as bootstrap from 'bootstrap';

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

const criptButton = document.getElementById('criptografar');
const descriptButton = document.getElementById('descriptografar');
const form = document.getElementById('form');
const inputArquivo = document.getElementById('arquivo');
const inputTamanho = document.getElementById('tamanho-alfabeto');
const inputN = document.getElementById('valor-n');
const resultado = document.getElementById('resultado');
const URL_BASE = 'http://localhost:3000';

inputArquivo.addEventListener('change', () => {
    const arquivo = inputArquivo.files[0];
    
    if (arquivo){
        criptButton.disabled = false;
        descriptButton.disabled = false;
    } else {
        criptButton.disabled = true;
        descriptButton.disabled = true;
    }
});

criptButton.addEventListener('click', async e => {
    const arquivo = inputArquivo.files[0];
    const tamanho = inputTamanho.value;
    const n = inputN.value;
    if (!arquivo) return;

    const data = new FormData(form);
    data.append('arquivo', arquivo);

    if (tamanho) data.append('tamanhoAlfabeto', tamanho);
    if (n) data.append('valorDoN', n);
 
    const response = await fetch(`${URL_BASE}/criptografar`, {
        method: "POST",
        body: data,
    });

    const result = await response.text();
    resultado.innerText = result;
});

descriptButton.addEventListener('click', async e => {
    const arquivo = inputArquivo.files[0];
    const tamanho = inputTamanho.value;
    const n = inputN.value;
    if (!arquivo) return;

    const data = new FormData(form);
    data.append('arquivo', arquivo);

    if (tamanho) data.append('tamanhoAlfabeto', tamanho);
    if (n) data.append('valorDoN', n);

    const response = await fetch(`${URL_BASE}/descriptografar`, {
        method: "POST",
        body: data,
    });

    const result = await response.text();
    resultado.innerText = result;
});

form.addEventListener('submit', e => {
    e.preventDefault();
    return;
});
