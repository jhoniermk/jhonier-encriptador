document.getElementById('encryptBtn').addEventListener('click', function() {
    let inputText = document.getElementById('inputText').value;
    let { textoMezclado, clave } = mezclarTexto(inputText);
    document.getElementById('outputText').textContent = textoMezclado;
    document.getElementById('clave').value = JSON.stringify(clave); // Guarda la clave para desencriptar
    mostrarSalida(true);
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    let inputText = document.getElementById('outputText').textContent;
    let clave = JSON.parse(document.getElementById('clave').value); // Recupera la clave
    let outputText = desmezclarTexto(inputText, clave);
    document.getElementById('outputText').textContent = outputText;
    mostrarSalida(true);
});

function mezclarTexto(texto) {
    let arr = texto.split('');
    let clave = [];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        clave.push([i, j]);
    }
    return { textoMezclado: arr.join(''), clave: clave };
}

function desmezclarTexto(texto, clave) {
    let arr = texto.split('');
    // Deshacer los intercambios en orden inverso
    for (let k = clave.length - 1; k >= 0; k--) {
        let [i, j] = clave[k];
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function mostrarSalida(mostrar) {
    let imgMuñeco = document.querySelector('.img-muñeco');
    if (mostrar) {
        imgMuñeco.style.display = 'none';
    } else {
        imgMuñeco.style.display = 'block';
    }
}

document.getElementById('darkModeBtn').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
