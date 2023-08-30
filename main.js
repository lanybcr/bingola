let pedraAtual = 0;
let pedras = [];
const maiorPedra = 90;
let player;

window.onload = function () {
    Inicializacao();
}


function Inicializacao() {
  PreencherColinha();
  RecuperarDoCache();
  document.getElementById("comemoracao").style.display = "none";
  player = document.getElementById("animacaoRoleta");
  player.addEventListener('loop',SortearComAnimacao); 
  player.stop();
}

function PreencherColinha() {
    var colinha = document.getElementById("colinha"); 
    var div = document.createElement("div");
    div.classList.add("linhaColinha");
    for (var i = 1; i <= maiorPedra; i++) {
        div.innerHTML += '<span id="bolinha_'  + i + '"class="bolinha">' + i + '</span>';
        if ((i%10) == 0) {
            colinha.appendChild (div);
            div = document.createElement("div");
            div.classList.add("linhaColinha");
        }
    }
}


function Sortear() {
    let sorteado = Math.floor(Math.random() * maiorPedra) + 1;
    let repetido = pedras.includes(sorteado);
    if (repetido) {
        Sortear();
    }
    else {
        pedras.push(sorteado);
        CantarPedra(sorteado);
        SalvarNoCache();
    }
}

function CantarPedra(pedra) {
    document.getElementById("labelPedraAtual").innerHTML = pedra; 
    document.getElementById("bolinha_"+pedra).classList.add("sorteada"); 
    document.getElementById("textoHistorico").innerHTML += pedra + " - ";
}

function SortearComAnimacao() {
    player.stop();
    document.getElementById("labelPedraAtual").style.display = "block";
    player.style.display = "none";
    Sortear();
}


function SimularRoleta() {
    document.getElementById("labelPedraAtual").style.display = "none";
    player.style.display = "block";
    player.play();
}


function SalvarNoCache() {
    window.localStorage["pedras"] = JSON.stringify(pedras);
}

function RecuperarDoCache() {
    var cache = localStorage['pedras'];
    console.log (cache);
    if (cache) {
        pedras = JSON.parse(cache);
        pedras.map(function(pedra) {
            CantarPedra(pedra);
        })
    }
    else {
        pedras = [];
    }
}

function Limpar() {
    window.localStorage["pedras"] = [];
    location.reload();
}

function Bingo() {
  let text = "Tem certeza que alguem bateu?!\nEssa acao nao pode ser desfeita!";
  if (confirm(text) == true) {
    document.getElementById("comemoracao").style.display = "block";
  }
}