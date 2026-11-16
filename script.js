const palavras = [
  { palavra: "javascript",  dica: "Linguagem da Web" },
  { palavra: "html",        dica: "Estrutura das páginas" },
  { palavra: "css",         dica: "Estilo das páginas" },
  { palavra: "internet",    dica: "Rede mundial de computadores" },
  { palavra: "navegador",   dica: "Programa para acessar sites" },
  { palavra: "programacao", dica: "Arte de escrever código" },
  { palavra: "computador",  dica: "Máquina que processa dados" },
  { palavra: "teclado",     dica: "Dispositivo de entrada" },
  { palavra: "monitor",     dica: "Tela do computador" },
  { palavra: "algoritmo",   dica: "Sequência de passos" }
];

let palavraSecreta = "";
let dicaSecreta = "";
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoEncerrado = false;

const elementoPalavra       = document.getElementById("palavra");
const elementoDica          = document.getElementById("dica");
const elementoTentativas    = document.getElementById("tentativas");
const inputLetra            = document.getElementById("letra");
const mensagem              = document.getElementById("mensagem");
const elementoLetrasUsadas  = document.getElementById("letras-usadas");
const botaoTentar           = document.getElementById("btn-tentar");
const botaoReiniciar        = document.getElementById("btn-reiniciar");

function iniciarJogo() {
  const indice = Math.floor(Math.random() * palavras.length);
  palavraSecreta = palavras[indice].palavra;
  dicaSecreta    = palavras[indice].dica;

  tentativas     = 6;
  letrasCorretas = [];
  letrasUsadas   = [];
  jogoEncerrado  = false;

  elementoDica.textContent       = "Dica: " + dicaSecreta;
  elementoTentativas.textContent = tentativas;
  elementoLetrasUsadas.textContent = "—";
  mensagem.textContent = "";
  mensagem.className   = "mensagem";
  inputLetra.value = "";
  inputLetra.focus();

  atualizarPalavra();
}
function atualizarPalavra() {
  let exibicao = "";
  for (let i = 0; i < palavraSecreta.length; i++) {
    const letra = palavraSecreta[i];
    if (letrasCorretas.includes(letra)) {
      exibicao += letra + " ";
    } else {
      exibicao += "_ ";
    }
  }
  elementoPalavra.textContent = exibicao.trim();
}

function venceu() {
  for (let i = 0; i < palavraSecreta.length; i++) {
    const letra = palavraSecreta[i];
    if (!letrasCorretas.includes(letra)) {
      return false;
    }
  }
  return true;
}

function verificarLetra() {
  if (jogoEncerrado) return;

  const letra = inputLetra.value.toLowerCase().trim();

  
  if (letra === "") {
    mensagem.textContent = "Digite uma letra.";
    mensagem.className   = "mensagem erro";
    return;
  }


  if (!/^[a-záàâãéèêíïóôõöúçñ]$/.test(letra)) {
    mensagem.textContent = "Digite apenas letras.";
    mensagem.className   = "mensagem erro";
    inputLetra.value = "";
    return;
  }

  
  if (letrasUsadas.includes(letra)) {
    mensagem.textContent = "Letra já utilizada.";
    mensagem.className   = "mensagem erro";
    inputLetra.value = "";
    return;
  }

  letrasUsadas.push(letra);

  
  if (palavraSecreta.includes(letra)) {
    letrasCorretas.push(letra);
    mensagem.textContent = "Você acertou!";
    mensagem.className   = "mensagem acerto";
  } else {
    tentativas--;
    mensagem.textContent = "Você errou!";
    mensagem.className   = "mensagem erro";
  }

  
  atualizarPalavra();
  elementoTentativas.textContent    = tentativas;
  elementoLetrasUsadas.textContent  = letrasUsadas.join(", ");
  inputLetra.value = "";
  inputLetra.focus();

  
  if (venceu()) {
    mensagem.textContent = "🎉 Parabéns! Você venceu!";
    mensagem.className   = "mensagem acerto";
    jogoEncerrado = true;
    return;
  }

  if (tentativas === 0) {
    mensagem.textContent = "💀 Você perdeu! A palavra era: " + palavraSecreta;
    mensagem.className   = "mensagem erro";
    elementoPalavra.textContent = palavraSecreta.split("").join(" ");
    jogoEncerrado = true;
  }
}


botaoTentar.addEventListener("click", verificarLetra);
botaoReiniciar.addEventListener("click", iniciarJogo);


inputLetra.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    verificarLetra();
  }
});

iniciarJogo();