// Principal

function jogar() {
    var qtdeJogadores = definirQtdeJogadores();
    var tabuleiro = criarTabuleiro();
    var jogadores = introduzirJogadores(qtdeJogadores, tabuleiro);
    var jogadorVencedor = desenvolverPartida(jogadores, tabuleiro);
    finalizarPartida(jogadorVencedor);
}

// Objetos

function criarEfeito(tipoDoEfeito, valor) {
    var efeito = {
        "tipoDoEfeito": tipoDoEfeito,
        "valor": valor,
    }
    return efeito;
}

function criarCasa(numero, tipoDoEfeito, valor) {
    var casa = {
        "numero": numero,
        "efeito": criarEfeito(tipoDoEfeito, valor),
        "jogadores": [],
    }
    return casa;
}

function criarTabuleiro() {
    var casas = [];

    for (let numeroDaCasa = 0; numeroDaCasa <= 35; numeroDaCasa++) {
        definirEfeitoDaCasa(casas, numeroDaCasa);
    }

    return casas;
}

function criarJogador(nome, cor) {
    var jogador = {
        "nome": nome,
        "cor": cor,
        "casaAtual": 0,
        "rodasSemJogar": 0,
    }

    return jogador;
}

// Suporte

const efeitos = {
    Avancar: "avancar",
    Voltar: "voltar",
    JogarDeNovo: "jogar de novo",
    Semjogar: "sem jogar",
    Nenhum: "nenhum",
}

const tipoDeCasa = {
    ComEfeito: "comEfeito",
    Normal: "normal",
    Inexistente: "inexistente",
}

casasComEfeito = [
    {"numeroDaCasa": 6, "efeito": efeitos.Avancar, "valor": 11},
    {"numeroDaCasa": 10, "efeito": efeitos.Semjogar, "valor": 1},
    {"numeroDaCasa": 13, "efeito": efeitos.Avancar, "valor": 15},
    {"numeroDaCasa": 17, "efeito": efeitos.JogarDeNovo, "valor": 1},
    {"numeroDaCasa": 24, "efeito": efeitos.Voltar, "valor": 12},
    {"numeroDaCasa": 31, "efeito": efeitos.Voltar, "valor": 16},
]

function definirQtdeJogadores() {
    var pergunta = "Bem vindo ao Safári do Benjamin e do Theodoro!\n" +
        "Para começarmos, informe a quantidade de pessoas que irão jogar:\n" +
        "(Informe um número maior que zero!)";

    var qtdeJogadores = 0;
    while (qtdeJogadores < 1) {
        qtdeJogadores = prompt(pergunta);
    }

    return qtdeJogadores;
}

function introduzirJogadores(qtdeJogadores, tabuleiro) {
    var jogadores = [];

    for (let index = 0; index < qtdeJogadores; index++) {
        
        nome = prompt(`Informe o nome do ${index + 1}° jogador:`);
        if (nome == "") {
            nome = `jogador ${index + 1}`;
        }

        cor = prompt(`Informe a cor do seu pião, ${nome}:`);

        var jogador = criarJogador(nome, cor);
        posicionarJogadorNoTabuleiro(jogador, tabuleiro);

        jogadores.push(jogador)

    };

    return jogadores;
}

function desenvolverPartida(jogadores, tabuleiro) {
    var jogadorVencedor;
    var terminarPartida = false;

    while (!terminarPartida) {
        jogadores.forEach(jogador => {
            
            if(jogador.rodasSemJogar == 0) {
                var resposta = prompt(`${jogador.cor} (${jogador.nome}), é sua vez!\nENTER- Para continuar;\nT- Para continuar e ver o tabuleiro.`);
                vezDoJogador(jogador, tabuleiro);
            } else if(terminarPartida != true) {
                var resposta = prompt(`${jogador.cor} (${jogador.nome}), essa roda você não jogar, por causa do efeito!\nENTER- Para continuar;\nT- Para continuar e ver o tabuleiro.`);
                jogador.rodasSemJogar--;
            }
            
            if(resposta == "t" || resposta == "T") {
                mostrarTabuleiro(tabuleiro);
            } else {
                mostrarJogador(jogador);
            }

            if(jogador.casaAtual == 35) {
                jogadorVencedor = jogador;
                terminarPartida=true;
            }
        });
    }

    return jogadorVencedor;
}

function finalizarPartida(jogadorVencedor) {
    log(`FIM DA PARTIDA\n` +
    `O ganhador foi o peão ${jogadorVencedor.cor} (${jogadorVencedor.nome})\n` +
    `PARABENS!!!`);
}

function vezDoJogador(jogador, tabuleiro) {
    var valorDoDado = jogarDado();
    prompt(`Dados Jogados! ${jogador.nome}, vai andar ${valorDoDado} casas!`);

    andarNoTabuleiro(jogador, valorDoDado, tabuleiro);
}

function andarNoTabuleiro(jogador, valorDoDado, tabuleiro) {
    tirarJogadorDaCasa(tabuleiro, jogador);

    var numeroDaCasaDestino = jogador.casaAtual + valorDoDado;
    
    if(numeroDaCasaDestino <= 35) {
        jogador.casaAtual = numeroDaCasaDestino;
        
        var casaDestino = tabuleiro[numeroDaCasaDestino];
        
        executarEfeito(casaDestino, jogador, tabuleiro);
        
        posicionarJogadorNoTabuleiro(jogador, tabuleiro);
    }
}

function posicionarJogadorNoTabuleiro(jogador, tabuleiro) {
    tabuleiro[jogador.casaAtual].jogadores.push(jogador);
}

function tirarJogadorDaCasa(tabuleiro,  jogador) {
    var index = tabuleiro[jogador.casaAtual].jogadores.indexOf(jogador);

    if (index >= 0) {
        tabuleiro[jogador.casaAtual].jogadores.splice(index, 1);
    }
}

function executarEfeito(casaDestino, jogador, tabuleiro) {
    var efeito = casaDestino.efeito;
    
    var tipoDoEfeito = efeito.tipoDoEfeito;
    var valor = efeito.valor;

    mostrarEfeitoDaCasaParaJogador(jogador, casaDestino);

    switch (tipoDoEfeito) {
        case efeitos.Avancar:
            jogador.casaAtual = valor;
            break;
            
        case efeitos.Voltar:
            jogador.casaAtual = valor;
            break;
            
        case efeitos.JogarDeNovo:
            vezDoJogador(jogador, tabuleiro);
            break;
            
        case efeitos.Semjogar:
            jogador.rodasSemJogar++;
            break;
    
        default:
            break;
    }
}
function mostrarEfeitoDaCasaParaJogador(jogador, casa) {
    var numero = casa.numero;
    var efeito = casa.efeito;
    
    var tipoDoEfeito = efeito.tipoDoEfeito;
    var valor = efeito.valor;

    var efeitoString = "";

    if(tipoDoEfeito == efeitos.Avancar || tipoDoEfeito == efeitos.Voltar) {
        efeitoString = `${tipoDoEfeito} até a casa ${valor}!`;
    } else if (tipoDoEfeito == efeitos.JogarDeNovo || tipoDoEfeito == efeitos.Semjogar) {
        efeitoString = `${tipoDoEfeito} ${valor} vez(es)!`;
    }

    if(tipoDoEfeito != efeitos.Nenhum) {
        log(`${jogador.nome} você caiu numa casa com efeito!\n`+
                `A casa é: ${numero}.\n` +
                `O efeito é: ${efeitoString}.`);
    }
}

function jogarDado() {
    return numeroAleatorio(1,6);
}

function definirEfeitoDaCasa(casas, numeroDaCasa) {
    var efeito = efeitos.Nenhum;
    var valor = 0;

    casasComEfeito.forEach(casaComEfeito => {
        if (casaComEfeito.numeroDaCasa == numeroDaCasa) {
            efeito = casaComEfeito.efeito; 
            valor = casaComEfeito.valor;
        } 
    });

    casas.push(
        criarCasa(numeroDaCasa, efeito, valor)
    );
}

// logs

function mostrarTabuleiro(tabuleiro) {
    tabuleiro.forEach(casa => {
        mostrarCasa(casa);
    });
}

function mostrarCasa(casa) {
    log(`Numero da Casa: ${casa.numero}\n` +
    `Efeito da Casa: ${casa.efeito.tipoDoEfeito}\n` +
    `Valor do Efeito: ${casa.efeito.valor}\n` +
    `Jogadores na Casa:\n${mostrarJogadores(casa.jogadores)}`)
}

function mostrarJogadores(jogadores) {
    var jogadoresString = "[\n";

    jogadores.forEach(jogador => {
        jogadoresString += ` ${jogadorToString(jogador)}\n`;
    });

    return jogadoresString + "]";
}

function mostrarJogador(jogador) {
    log(`O ${jogadorToString(jogador)} está na casa ${jogador.casaAtual}`);
}

function jogadorToString(jogador) {
    return `Peão ${jogador.cor} (${jogador.nome})`;
}

// Utilidades

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function log(texto) {
    console.log(texto);
}