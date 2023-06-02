const criptButton = document.getElementById('criptografar');
const descriptButton = document.getElementById('descriptografar');
const form = document.getElementById('form');
const input = document.getElementById("arquivo");
const resultado = document.getElementById('resultado');
const URL_BASE = 'http://localhost:3000';

input.addEventListener('change', () => {
    const arquivo = input.files[0];
    
    if (arquivo){
        criptButton.disabled = false;
        descriptButton.disabled = false;
    } else {
        criptButton.disabled = true;
        descriptButton.disabled = true;
    }
})

criptButton.addEventListener('click', async e => {
    const arquivo = input.files[0];
    if (!arquivo) return;

    const data = new FormData(form);
    data.append('arquivo', arquivo);

    const response = await fetch(`${URL_BASE}/criptografar`, {
        method: "POST",
        body: data,
    });

    const result = await response.text();
    resultado.innerText = result;
})

descriptButton.addEventListener('click', async e => {
    const arquivo = input.files[0];
    if (!arquivo) return;

    const data = new FormData(form);
    data.append('arquivo', arquivo);

    const response = await fetch(`${URL_BASE}/descriptografar`, {
        method: "POST",
        body: data,
    });

    const result = await response.text();
    resultado.innerText = result;
})

form.addEventListener('submit', e => {
    e.preventDefault();
    return;
})