import { useState } from "react";
import { Container, Title, Input, Button, Feedback } from "./styles.js";

export function Home() {// Cria variáveis de estado para controlar os dados do jogo
  const [name, setName] = useState(""); // Nome do jogador
  const [started, setStarted] = useState(false); // Se o jogo começou
  const [guess, setGuess] = useState(""); // Palpite atual do jogador
  const [feedback, setFeedback] = useState(""); // Mensagem de retorno (dica ou erro)
  const [gameOver, setGameOver] = useState(false); // Indica se o jogador acertou o número
  const [attempts, setAttempts] = useState(0); // Contador de tentativas
  const [results, setResults] = useState([]); // Lista com o ranking de jogadores
  const [showResults, setShowResults] = useState(false); // Controla exibição do ranking

  const startGame = () => {// Função chamada ao clicar em (Começar Jogo)
    if (name.trim() !== "") {
      setStarted(true);// Só começa se o nome não estiver vazio
    }
  };

  const guessNumber = async () => {// Função chamada quando o jogador envia um palpite
    if (!guess) return;// Se o palpite estiver vazio não faz nada

    const numericGuess = Number(guess);// Converte o palpite para número

    // Valida se o número está dentro do intervalo permitido
    if (isNaN(numericGuess) || numericGuess < 1 || numericGuess > 100) {
      setFeedback("⚠️ O número deve estar entre 1 e 100.");
      return;
    }

    try { // Envia o palpite para o servidor via requisição HTTP POST
      const response = await fetch("http://localhost:3001/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess: numericGuess }),
      });

      const data = await response.json(); // Vai ler a resposta do servidor

      if (!response.ok) {
        setFeedback(`⚠️ ${data.message || "Erro desconhecido."}`);
        return;
      }

      const nextAttempt = attempts + 1;

      // Verifica o resultado retornado pelo servidor.
      if (data.result === "correct") {
        setFeedback("🎉 Acertou!");
        setGameOver(true);// Finaliza o jogo

        setResults((prev) => [...prev, { name, attempts: nextAttempt }]);// Salva o resultado no ranking local
      } else if (data.result === "higher") {
        setFeedback("🔼 O número é maior!");
      } else {
        setFeedback("🔽 O número é menor!");
      }

      setGuess("");// Limpa o campo de palpite
      setAttempts(nextAttempt);// Atualiza o contador de tentativas
    } catch (error) {
      console.error("Erro ao tentar adivinhar:", error);
    }
  };

  // Vai reiniciar o jogo mantendo o mesmo jogador
  const restartGame = () => {
    setFeedback("");
    setGameOver(false);
    setGuess("");
    setAttempts(0);
  };

  // Vai reiniciar o jogo e volta para a tela de entrada de nome
  const newPlayer = () => {
    setName("");
    setStarted(false);
    setFeedback("");
    setGameOver(false);
    setGuess("");
    setAttempts(0);
  };

  // Mostra ou esconde o ranking
  const showRanking = () => {
    setShowResults((prev) => !prev);
  };

  return (
    <Container>
      <Title>Jogo de Adivinhação</Title>

      {started && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 20,
            color: "white",
            fontWeight: "bold",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          Jogador: {name} | Tentativas: {attempts}
        </div>
      )}

      {!started ? (
        <>
          <Input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={startGame}>Começar Jogo</Button>
        </>
      ) : (
        <>
          {!gameOver && (
            <>
              <Input
                type="number"
                placeholder="Digite um número entre 1 e 100"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && guessNumber()}
              />
              <Button onClick={guessNumber}>Chutar</Button>
              <Feedback>Tentativas: {attempts}</Feedback>
            </>
          )}

          <Feedback>{feedback}</Feedback>

          {gameOver && (
            <>
              <Button onClick={restartGame}>Novo Jogo</Button>
              <Button onClick={newPlayer}>Novo Jogador</Button>
              <Button onClick={showRanking}>
                {showResults ? "Ocultar Ranking" : "Ver Ranking"}
              </Button>

              {showResults && (
  <>
    <h2 style={{ color: "white" }}>🏆 Ranking</h2>
    {results.length > 0 ? (
      // Ordena por tentativas
      [...results]
        .sort((a, b) => a.attempts - b.attempts)
        .map((entry, index) => (
          <p key={index} style={{ color: "white" }}>
            {index + 1}° {entry.name} - {entry.attempts} tentativa(s)
          </p>
        ))
    ) : (
      <p style={{ color: "white" }}>
        Nenhum resultado registrado ainda.
      </p>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
}
