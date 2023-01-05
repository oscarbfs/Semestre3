var naipes = ["espadas", "ouros", "paus", "copas"];
var valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cartasEmJogo = [];

// jogo
function pegarCarta() {
    var carta = {
        "naipe": null,
        "valor": null,
        "restantes": 2,
    };

    carta.naipe = naipes[numeroAleatorio(0, 3)];
    carta.valor = valores[numeroAleatorio(0, 12)];

    return carta;
}

function cartaJaEmJogo(carta) {
    cartasEmJogo.forEach(cartaEmJogo => {
        if (carta.naipe == cartaEmJogo.naipe && carta.valor == cartaEmJogo.valor && carta.restantes == 0) {
            return true;
        }
    });
    carta.restantes--;
    return false;
}

function contemJogador(jogadores, jogador) {
    log("CONFERINDO");
    jogadores.forEach(jogadorArray => {
        if (jogador.nome == jogadorArray.nome && jogador.cartas == jogadorArray.cartas) {
            log("VERDADE");
            return true;
        }
    });
    return false;
}

function colocarCartaEmJogo() {
    var carta = pegarCarta();

    while (cartaJaEmJogo(carta)) {
        carta = pegarCarta();
    }

    cartasEmJogo.push(carta);

    return carta;
}

function criarJogador() {
    var jogador = {
        "nome": null,
        "cartas": [],
        "mediaDePontos": 0,
        "taxaVitoria": 0,
        "historico": "",
    };

    return jogador;
}

function distribuirCartasIniciais(jogador) {
    var cartasIniciais = [colocarCartaEmJogo(), colocarCartaEmJogo()];
    jogador.cartas = cartasIniciais;
}

function introduzirJogadores(qtdeJogadores, jogoIniciado) {
    var jogadores = [];

    if (qtdeJogadores == 0 && !jogoIniciado) {
        // Introduzir Computador
        var computador = criarJogador();
        computador.nome = "Computador";
        jogadores.push(computador);

        // Introduzir Jogador
        var jogador = criarJogador();
        jogador.nome = prompt(`Insira seu nome de jogador`);
        if (jogador.nome == "") {
            jogador.nome = `jogador ${index + 1}`;
        }
        jogadores.push(jogador)
    } else {
        for (let index = 0; index < qtdeJogadores; index++) {
            var jogador = criarJogador();

            jogador.nome = prompt(`Insira o nome do ${index + 1}° jogador`);
            if (jogador.nome == "") {
                jogador.nome = `jogador ${index + 1}`;
            }

            jogadores.push(jogador)

        };
    }

    return jogadores;
}

function darCartaAoJogador(jogador) {
    var carta = colocarCartaEmJogo();
    log(`A carta adquirida foi:\n${mostrarCarta(carta)}`);
    jogador.cartas.push(carta);
    return somaDasCartas(jogador.cartas);
}

function desenvolverVezDoJogador(jogador, jogadoresVencedores) {
    var nome = jogador.nome;
    var somaDesseJogador = somaDasCartas(jogador.cartas);
    var somaJogadorVencedor = jogadoresVencedores.length == 0
        ? 0
        : somaDasCartas(jogadoresVencedores[0].cartas);

    log(`É a vez do(a) ${nome}`);

    var continuar = "s";

    while (continuar == "s" || continuar == "sim") {
        log(mostrarMaoDoJogador(jogador));

        if (jogador.nome == "Computador") {
            continuar = "n";
            
            var chances = numeroAleatorio(1, 21);

            if (chances <= (21 - somaDasCartas(jogador.cartas))) {
                continuar = "s"; 
            }
        } else {
            continuar = prompt(`${nome}, deseja pedir uma carta?\nSe sim, digite "s" ou "sim", se não, só clique enter!`);
        }


        if (continuar == "s" || continuar == "sim") {
            somaDesseJogador = darCartaAoJogador(jogador);

            if (somaDesseJogador > 21) {
                continuar = "n";
                log(`A soma das suas cartas utrapassaram 21.\n${nome}, você perdeu!`);
                var index = jogadoresVencedores.indexOf(jogador);
                if (index >= 0) {
                    jogadoresVencedores.splice(index, 1);
                }
                log(mostrarMaoDoJogador(jogador));
                break;
            };

            // log(mostrarMaoDoJogador(jogador));
        }

        if (((jogadoresVencedores.length == 0) || (somaDesseJogador == somaJogadorVencedor)) && somaDesseJogador <= 21) {
            jogadoresVencedores.push(jogador);
        } else if (somaDesseJogador > somaJogadorVencedor && somaDesseJogador <= 21) {
            jogadoresVencedores[0] = jogador;
        };
    }
}

function jogadoresPersistentes(jogadores) {
    var jogadoresExcluidos = [];

    jogadores.forEach(jogador => {
        var resposta = "";
        
        if(jogador.nome == "Computador") {
            resposta = "s";
        } else {
            resposta = prompt(`${jogador.nome}, quer continuar no jogo para a proxima rodada?` +
            "\n (Enter) - Confirmar" +
            "\n ('n' ou 'nao') - Cancelar");
        }

        if (resposta == "n" || resposta == "nao") {
            jogadoresExcluidos.push(jogador);
        }
    });

    jogadoresExcluidos.forEach(jogadorExcluido => {
        var index = jogadores.indexOf(jogadorExcluido);

        if (index >= 0) {
            jogadores.splice(index, 1);
        }
    });
}

function desenvolverRodada(jogadores) {
    var jogadoresVencedores = [];

    jogadores.forEach(jogador => {
        distribuirCartasIniciais(jogador);
        log(mostrarMaoDoJogador(jogador));
    });

    jogadores.forEach(jogador => {
        var estaComBj = maoComBalckJack(jogador.cartas);
        if (estaComBj) {
            log(`${jogador.nome}, você está com um black jack na mão.\nEstá com 21 pontos!`)
            jogadoresVencedores.push(jogador);
        } else {
            desenvolverVezDoJogador(jogador, jogadoresVencedores);
        }
    });


    return jogadoresVencedores;
}

function finalizarRodada(jogadoresVencedores, todosJogadores) {

    if (jogadoresVencedores.length == 0) {
        logFinal = "Nenhum jogador ganhou!"
    } else {
        var logFinal = `Fim da rodada.\nO(s) vencedor(es) é(são):`;
        jogadoresVencedores.forEach(jogador => {
            logFinal += `\n${jogador.nome}! Com as cartas e a soma de:\n`;
            logFinal += mostrarMaoDoJogador(jogador);
        });
    }

    log(logFinal);

    todosJogadores.forEach(jogadores => {
        jogadores.cartas = [];
    });
    cartasEmJogo = [];
}

function definirQtdeJogadores() {
    var pergunta = "Bem vindo ao jogo Black Jack!\n" +
        "Para começarmos, informe quem vai jogar:\n" +
        "1 - Contra o Computador\n" +
        "2 - Sozinho\n" +
        "3 - Com mais de uma pessoa\n" +
        "(Digite o numero de uma das opções acima)";
    var resposta = prompt(pergunta);

    if (resposta == 1) {
        return 0;
    } else if (resposta == 2) {
        return 1;
    } else if (resposta == 3) {
        var qtdeJogadores = prompt("Informe a quantidade de pessoas que irão jogar");
        return qtdeJogadores;
    }
}

function addNovosJogadores(jogadores) {
    var resposta = prompt(
        "Deseja Adicionar novos jogadores?" +
        "\n ('s' ou 'sim') - Confirmar" +
        "\n (Enter) - Cancelar");

    if (resposta == "s" || resposta == "sim") {
        var qtdeJogadores = prompt("Informe a quantidade de pessoas que serão adicionadas");
        var novosJogadores = introduzirJogadores(qtdeJogadores, true);
        novosJogadores.forEach(novoJogador => {
            jogadores.push(novoJogador);
        });
    }
}

function definirTaxaEMediaDosJoadores(jogadores, jogadoresVencedores, rodada) {
    jogadores.forEach(jogador => {
        var index = jogadoresVencedores.indexOf(jogador);
        var taxaVitoriaAntiga = jogador.taxaVitoria;
        var rodadasGanhas = ((taxaVitoriaAntiga / 100) * (rodada - 1));
        var statusPartida = "-D";

        if (index >= 0) {
            rodadasGanhas++;
            statusPartida = "-V"
        }

        jogador.taxaVitoria = Math.round((rodadasGanhas / rodada) * 100);

        var somaJogador = somaDasCartas(jogador.cartas);
        jogador.mediaDePontos = Math.round((((jogador.mediaDePontos) * (rodada - 1)) + somaJogador) / rodada);

        jogador.historico += statusPartida;

        log(mostrarTaxaMediaHistoricoDoJogador(jogador));
    });
}

function oUnicoJogadorEOComputador(jogadores) {
    if(jogadores.length == 1) {
        if(jogadores[0].nome == "Computador") {
            return true;
        }
    } 
    return false;
}

function jogar() {
    var rodada = 1;

    var qtdeJogadores = definirQtdeJogadores();

    var irParaProximaRodada = true;
    var jogadores = [];

    while (irParaProximaRodada) {

        if (rodada == 1) {
            jogadores = introduzirJogadores(qtdeJogadores, false);
        } else {
            // if(!oUnicoJogadorEOComputador(jogadores)) {
                addNovosJogadores(jogadores);
            // }
        }

        if (jogadores.length == 0 || oUnicoJogadorEOComputador(jogadores)) {
            irParaProximaRodada = false;
            break;
        }

        log(`------------------------\nRodada ${rodada}\n------------------------`);

        var jogadoresVencedores = desenvolverRodada(jogadores);

        definirTaxaEMediaDosJoadores(jogadores, jogadoresVencedores, rodada);

        finalizarRodada(jogadoresVencedores, jogadores);

        jogadoresPersistentes(jogadores);


        rodada++;
    }

}


// prints
function mostrarCartasEmJogo() {
    cartasEmJogo.forEach(cartaEmJogo => {
        log(`${cartaEmJogo.valor} de ${cartaEmJogo.naipe}`);
    });
}

function mostrarMaoDoJogador(jogador) {
    var nome = jogador.nome;
    var cartas = jogador.cartas;
    var maoString = ``;

    maoString += `As cartas de ${nome} são:`;

    cartas.forEach(carta => {
        maoString += `\n${mostrarCarta(carta)}`;
    });

    var soma = somaDasCartas(cartas);

    maoString += `\nA soma da mão de ${nome} é ${soma}`;
    return maoString;
}

function mostrarTaxaMediaHistoricoDoJogador(jogador) {
    var nome = jogador.nome;
    var mediaDePontos = jogador.mediaDePontos;
    var taxaVitoria = jogador.taxaVitoria;
    var historico = jogador.historico;

    var dadosDoJOgador = `O jogador ${nome} tem:` +
        `\nUma média de pontos de ${mediaDePontos};` +
        `\nUma taxa de vitoria de ${taxaVitoria}%` +
        `\nHistorico: [${historico}-]`;

    return dadosDoJOgador;
}

function mostrarCarta(carta) {
    return `${carta.valor} de ${carta.naipe}`;
}

// suporte
function somaDasCartas(cartas) {
    var soma = 0;

    cartas.forEach(carta => {
        var valor = carta.valor;

        if (valor == "A") {
            soma += 1;
        } else if (valor == "J" || valor == "Q" || valor == "K") {
            soma += 10;
        } else {
            soma += parseInt(valor, 10);
        }
    });

    return soma;
}

function maoComBalckJack(cartas) {
    if (((cartas[0].valor == "A") &&
        (cartas[1].valor == 10 ||
            cartas[1].valor == "J" ||
            cartas[1].valor == "Q" ||
            cartas[1].valor == "K"))
        ||
        ((cartas[1].valor == "A") &&
            (cartas[0].valor == 10 ||
                cartas[0].valor == "J" ||
                cartas[0].valor == "Q" ||
                cartas[0].valor == "K"))) {
        return true;
    } else {
        return false;
    };
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function log(texto) {
    console.log(texto);
}