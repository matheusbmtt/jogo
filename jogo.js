const readline = require('readline'); // Importa o módulo readline para manipular entrada e saída do terminal

const rl = readline.createInterface({ // Cria uma interface para entrada de dados
    input: process.stdin, // Define a entrada padrão como o terminal
    output: process.stdout // Define a saída padrão como o terminal
});

// Função que solicita ao usuário a escolha do nível de dificuldade
const getDifficulty = () => {
    console.log("🎃 Escolha um nível de dificuldade: 🎃");
    console.log("1. Fácil (1 a 5, 5 tentativas)"); // Opção fácil
    console.log("2. Médio (1 a 10, 3 tentativas)"); // Opção média
    console.log("3. Difícil (1 a 20, 2 tentativas)"); // Opção difícil

    // Pergunta ao usuário para escolher uma das opções
    rl.question("Escolha 1, 2 ou 3: ", (choice) => {
        switch (choice) {
            case '1':
                startGame(5, 5); // Chama a função startGame com 5 como limite e 5 tentativas
                break;
            case '2':
                startGame(10, 3); // Chama a função startGame com 10 como limite e 3 tentativas
                break;
            case '3':
                startGame(20, 2); // Chama a função startGame com 20 como limite e 2 tentativas
                break;
            default:
                console.log("⚠️ Opção inválida. Tente novamente."); // Mensagem de erro para opção inválida
                getDifficulty(); // Reinicia a escolha de dificuldade
                break;
        }
    });
};

// Função que inicia o jogo
const startGame = (maxNumber, attempts) => {
    const secretNumber = Math.floor(Math.random() * maxNumber) + 1; // Gera um número aleatório entre 1 e maxNumber
    let score = 0; // Inicializa a pontuação do jogador

    console.log(`\nVocê escolheu o nível com números de 1 a ${maxNumber} e ${attempts} tentativas!`);
    
    // Função recursiva para solicitar palpites do usuário
    const askGuess = () => { 
        if (attempts > 0) { // Verifica se ainda há tentativas disponíveis
            rl.question(`Você tem ${attempts} tentativas restantes. Qual é o seu palpite? `, (answer) => {
                const guess = parseInt(answer); // Converte a resposta do usuário para um número inteiro

                // Verifica se a entrada é válida
                if (isNaN(guess) || guess < 1 || guess > maxNumber) {
                    console.log("⚠️ Por favor, insira um número válido."); // Mensagem de erro para entrada inválida
                    askGuess(); // Pergunta novamente
                } else if (guess === secretNumber) { // Se o palpite estiver correto
                    score += attempts * 10; // Aumenta a pontuação com base nas tentativas restantes
                    console.log(`🎉 Parabéns! Você adivinhou o número ${secretNumber} e ganhou ${score} pontos! 🎉
                                                
      ▄▄▀▀▀▀▀▀▀▀▀▀▄▄█▄   ▄    █
      █▀             ▀▀█▄   ▀         ▄ 
    ▄▀                 ▀██   ▄▀▀▀▄▄  ▀
  ▄█▀▄█▀▀▀▀▄      ▄▀▀█▄ ▀█▄  █▄   ▀█
 ▄█ ▄▀  ▄▄▄ █   ▄▀▄█▄  █  █▄  ▀█    █
▄█  █   ▀▀▀ █  ▄█ ▀▀▀  █   █▄  █    █
██   ▀▄   ▄█▀   ▀▄▄▄▄▄█▀   ▀█  █▄   █
██     ▀▀▀                  █ ▄█    █
██                     █    ██▀    █▄
██                     █    █       ▀▀█▄
██                    █     █       ▄▄██
 ██                  ▄▀     █       ▀▀█▄
 ▀█      █        ▄█▀       █       ▄▄██
 ▄██▄     ▀▀▀▄▄▄▄▀▀         █       ▀▀█▄
  ▀▀▀▀                      █▄▄▄▄▄▄▄▄▄██
                    `); // Mensagem de vitória
                    playAgain(); // Pergunta se o usuário deseja jogar novamente
                } else { // Se o palpite estiver incorreto
                    attempts--; // Decrementa o número de tentativas restantes
                    // Fornece dicas com base no palpite
                    if (guess < secretNumber) {
                        console.log("👻 Dica: O número é maior!"); // Dica para palpite baixo
                    } else {
                        console.log("👻 Dica: O número é menor!"); // Dica para palpite alto
                    }
                    askGuess(); // Pergunta novamente
                }
            });
        } else { // Se as tentativas acabaram
            console.log(`😱 Você não conseguiu adivinhar! O número era ${secretNumber}.
              
                 ░░░░░░░
            ░░░░░░░░░░░░░░░░░
          │░░░░░░░░░░░░░░░░░░░│
          │░░░░░░░░░░░░░░░░░░░│
         ░└┐░░░░░░░░░░░░░░░░░┌┘░
         ░░└┐░░░░░░░░░░░░░░░┌┘░░
         ░░┌┘▄▄▄▄▄░░░░░▄▄▄▄▄└┐░░
          ░│██████▌░░░▐██████│░      VOCE MORREU!!!
          ░│▐███▀▀░░▄░░▀▀███▌│░
          ─┘░░░░░░░▐█▌░░░░░░░└─
          ░░░▄▄▄▓░░▀█▀░░▓▄▄▄░░░
            ─┘██▌░░░░░░░▐██└─
            ░░▐█─┬┬┬┬┬┬┬─█▌░░
            ░░░▀┬┼┼┼┼┼┼┼┬▀░░░
             ░░░└┴┴┴┴┴┴┴┘░░░
               ░░░░░░░░░░░
            `); // Mensagem de derrota
            playAgain(); // Pergunta se deseja jogar novamente
        }
    };

    askGuess(); // Inicia o loop de palpites
};

// Função que pergunta ao usuário se ele deseja jogar novamente
const playAgain = () => {
    rl.question("Gostaria de jogar novamente? (s/n): ", (answer) => {
        if (answer.toLowerCase() === 's') { // Se a resposta for 's' ou 'S'
            getDifficulty(); // Reinicia a escolha de dificuldade
        } else {
            console.log("Obrigado por jogar! Até a próxima! 🎃"); // Mensagem de despedida
            rl.close(); // Fecha a interface de leitura, encerrando o programa
        }
    });
};

getDifficulty(); // Chama a função para iniciar o jogo, pedindo a dificuldade
