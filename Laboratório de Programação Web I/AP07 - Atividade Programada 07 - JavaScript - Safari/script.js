// Principal

function jogar() {
    var qtdeJogadores = definirQtdeJogadores();
    var jogadores = introduzirJogadores(qtdeJogadores);
    var jogadorVencedor = desenvolverPartida(jogadores);
    finalizarPartida(jogadorVencedor);
}

// Objetos

function criarEfeito(tipoDoEfeito, valor) {
    var efeito = {
        "TipoDoEfeito": tipoDoEfeito,
        "valor": valor,
    }
    return efeito;
}

function criarCasa(numero, tipoDoEfeito, valor) {
    var casa = {
        "numero": numero,
        "efeito": criarEfeito(tipoDoEfeito, valor),
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

function introduzirJogadores(qtdeJogadores) {
    var jogadores = [];

    for (let index = 0; index < qtdeJogadores; index++) {
        
        nome = prompt(`Informe o nome do ${index + 1}° jogador:`);
        if (nome == "") {
            nome = `jogador ${index + 1}`;
        }

        cor = prompt(`Informe a cor do seu pião, ${nome}:`);

        var jogador = criarJogador(nome, cor);

        jogadores.push(jogador)

    };

    return jogadores;
}

function desenvolverPartida(jogadores) {
    var jogadorVencedor;
    var terminarPartida = false;

    while (!terminarPartida) {
        jogadores.forEach(jogador => {
            
            if(jogador.rodasSemJogar == 0) {
                prompt(`${jogador.cor} (${jogador.nome}), é sua vez!\n(Aperte Enter para continuar)`);
                vezDoJogador(jogador);
            } else if(terminarPartida != true) {
                prompt(`${jogador.cor} (${jogador.nome}), essa roda você não jogar, por causa do efeito!\n(Aperte Enter para continuar)`);
                jogador.rodasSemJogar--;
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

function vezDoJogador(jogador) {
    var valorDoDado = jogarDado();
    prompt(`Dados Jogados! ${jogador.nome}, vai andar ${valorDoDado} casas!`);

    var casaDestino = jogador.casaAtual + valorDoDado;
    verificarCasa(casaDestino, jogador);

    mostrarJogador(jogador);

}

function verificarCasa(numeroDaCasa, jogador) {
    var efeito = efeitos.Nenhum;
    var valor = 0;
    var casaDestino = numeroDaCasa

    casasComEfeito.forEach(casaComEfeito => {
        if (casaComEfeito.numeroDaCasa == numeroDaCasa) {
            efeito = casaComEfeito.efeito; 
            valor = casaComEfeito.valor;
        } 
    });

    if(efeito != efeitos.Nenhum) {
        var efeitoString = "";
        
        if(efeito == efeitos.Avancar || efeito == efeitos.Voltar) {
            efeitoString = `${efeito} até a casa ${valor}!`;
            casaDestino = valor;
        } else if (efeito == efeitos.JogarDeNovo || efeito == efeitos.Semjogar) {
            efeitoString = `${efeito} ${valor} vez(es)!`;
        }

        log(`${jogador.nome} você caiu numa casa com efeito!\n`+
        `A casa é: ${numeroDaCasa}.\n` +
        `O efeito é: ${efeitoString}.`);

        if(efeito == efeitos.JogarDeNovo) {
            vezDoJogador(jogador);
        } else if(efeito == efeitos.Semjogar) {
            jogador.rodasSemJogar++;
        }
    }

    if(numeroDaCasa <= 35) {
        jogador.casaAtual = casaDestino;
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

function mostrarTabuleiro() {
    var tabuleiro = criarTabuleiro();
    tabuleiro.forEach(casa => {
        log(`casa: ${casa.numero}\nefeito: ${casa.efeito.TipoDoEfeito} ${casa.efeito.valor}`);
    });
}

function mostrarJogador(jogador) {
    log(`O peão ${jogador.cor} (${jogador.nome}) está na casa ${jogador.casaAtual}`);
}

// Utilidades

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function log(texto) {
    console.log(texto);
}