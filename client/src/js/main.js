import * as bootstrap from 'bootstrap';

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

const criptButton = document.getElementById('criptografar');
const descriptButton = document.getElementById('descriptografar');
const form = document.getElementById('form');
const inputArquivo = document.getElementById('arquivo');
const inputTamanho = document.getElementById('tamanho-alfabeto');
const inputN = document.getElementById('valor-n');
const URL_BASE = 'http://localhost:3000';

function download(text, name = 'test.txt', type = 'text/plain') {
    const a = document.createElement('a');
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

function createChunks(file, cSize = 1024 * 8) {
    let startPointer = 0;
    let endPointer = file.size;
    let chunks = [];

    while (startPointer < endPointer) {
        let newStartPointer = startPointer + cSize;
        chunks.push(file.slice(startPointer, newStartPointer));
        startPointer = newStartPointer;
    }

    return chunks;
}

function prepareName(name) {
    return name.replace(/(.txt)|(-criptografado|-descriptografado)/g, '');
}

inputArquivo.addEventListener('change', () => {
    const arquivo = inputArquivo.files[0];

    if (arquivo) {
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

    if (arquivo.size > 1024 * 9 /* 9KB */) {
        const chunks = createChunks(arquivo);

        const all = chunks.map(async chunk => {
            data.set('arquivo', chunk);

            return fetch(`${URL_BASE}/criptografar`, {
                method: "POST",
                body: data,
            }).then(r => r.text());
        });

        const responses = await Promise.all(all);
        
        const final = responses.reduce((prev, curr) => [...prev, ...eval(curr)], []);
        
        download(final, `${prepareName(arquivo.name)}-criptografado.txt`);
    } else {
        const response = await fetch(`${URL_BASE}/criptografar`, {
            method: "POST",
            body: data,
        });

        const result = await response.text();
        download(result, `${prepareName(arquivo.name)}-criptografado.txt`);
    }
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

    if (arquivo.size > 1024 * 9 /* 9KB */) {
        const chunks = createChunks(arquivo);

        const all = chunks.map(async chunk => {
            data.set('arquivo', chunk);

            return fetch(`${URL_BASE}/descriptografar`, {
                method: "POST",
                body: data,
            }).then(r => r.text());
        });

        const responses = await Promise.all(all);
        console.log(responses);
        
        const final = responses.reduce((prev, curr) => prev.concat(curr), '');
        
        download(final, `${prepareName(arquivo.name)}-descriptografado.txt`);
    } else {
        const response = await fetch(`${URL_BASE}/descriptografar`, {
            method: "POST",
            body: data,
        });
    
        const result = await response.text();
        download(result, `${prepareName(arquivo.name)}-descriptografado.txt`);
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    return;
});
