
document.getElementById("btStart").addEventListener("click", Start);


let palavraSecreta = "";
let tentativasRestantes = 6;
let letrasUsadas = [];
let palavraAtual = [];
const palavras = ["javascript", "programador", "computador", "internet", "tecnologia", "utfpr", "frontend"];


function escolherPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)];
}


function Start() {
    palavraSecreta = escolherPalavra();
    tentativasRestantes = 6;
    letrasUsadas = [];
    palavraAtual = Array(palavraSecreta.length).fill("_");
    atualizarTela();
    document.getElementById("imgF").querySelector("img").src = "figs/Forca.png";
}

function atualizarTela() {
    document.getElementById("palavra").innerText = palavraAtual.join(" ");
    document.getElementById("nTentativas").innerText = `N° de tentativas restantes: ${tentativasRestantes}`;
    document.getElementById("letraUsadas").innerText = `Letras usadas: ${letrasUsadas.join(", ")}`;
}


function verificarLetra() {
    const inputLetra = document.getElementById("chuteLetra");
    const letra = inputLetra.value.toLowerCase();
    inputLetra.value = "";

    if (letra.length !== 1 || !/[a-z]/.test(letra)) {
        alert("Digite uma única letra válida.");
        return;
    }

    if (letrasUsadas.includes(letra)) {
        alert("Você já usou essa letra.");
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letra) {
                palavraAtual[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
        document.getElementById("imgF").querySelector("img").src = `figs/Forca${6 - tentativasRestantes}.png`;
    }

    verificarFimDeJogo();
    atualizarTela();
}

function verificarPalavra() {
    const inputPalavra = document.getElementById("chutePalavra");
    const tentativaPalavra = inputPalavra.value.toLowerCase();
    inputPalavra.value = "";

    if (tentativaPalavra === palavraSecreta) {
        palavraAtual = palavraSecreta.split("");
        alert("Parabéns, você venceu!!!");
        return;
    } else {
        tentativasRestantes--;
        document.getElementById("imgF").querySelector("img").src = `figs/Forca${6 - tentativasRestantes}.png`;
    }

    verificarFimDeJogo();
    atualizarTela();
}

function verificarFimDeJogo() {
    if (!palavraAtual.includes("_")) {
        alert("Parabéns, você venceu!!!");
        return;
    }

    if (tentativasRestantes === 0) {
        alert(`Que pena, mas não foi dessa vez! A palavra era ${palavraSecreta}`);
    }
    
}

document.getElementById("EnvioLetra").addEventListener("click", verificarLetra);
document.getElementById("EnvioPalavra").addEventListener("click", verificarPalavra);
document.getElementById("btStart").addEventListener("click", Start);

Start();

