let times = [
  { team: "timeA", members: 0 },
  { team: "timeB", members: 0 },
  { team: "timeC", members: 0 },
  { team: "timeD", members: 0 }
];

function randomTeam(array) {
  const timesDisponiveis = array.filter(time => time.members < 5);
  if (timesDisponiveis.length === 0) {
    return null; // Não há mais times disponíveis
  }

  const indiceAleatorio = Math.floor(Math.random() * timesDisponiveis.length);
  const timeSelecionado = timesDisponiveis[indiceAleatorio];
  timeSelecionado.members += 1;
  return timeSelecionado.team;
}

function checkIfValueIsEmpty(textValue) {
  return textValue.trim() === "";
}

function returnTextAreaLinesQty(textAreaName) {
  const textarea = document.getElementById(textAreaName);
  const conteudo = textarea.value;
  const linhas = conteudo.split("\n");
  const quantidadeLinhas = linhas.length;
  console.log("Integrantes: " + quantidadeLinhas);
  return quantidadeLinhas;
}

function addTextToTeam(teamTextArea, playerName) {
  const textarea = document.getElementById(teamTextArea);
  const conteudoAtual = textarea.value;

  if (returnTextAreaLinesQty(teamTextArea) === 1 && checkIfValueIsEmpty(conteudoAtual)) {
    textarea.value = playerName;
  } else {
    textarea.value = conteudoAtual + "\n" + playerName;
  }
}

function sortearPlayer() {
  const playerName = document.getElementById("nomeCachaceiro").value.trim();
  const assignedTeam = randomTeam(times);

  if (playerName === "") {
    alert("Digite um nome antes de sortear.");
    return;
  }

  if (assignedTeam === null) {
    alert("Todos os times estão completos, não é possível sortear.");
    return;
  }

  if (returnTextAreaLinesQty(assignedTeam) >= 5) {
    alert(`Time Sorteado "${assignedTeam}" já está formado, tente novamente.`);
  } else {
    addTextToTeam(assignedTeam, playerName);
  }
}

function CheckPlayerName(playerName){

  playerList = ['Thrain', 'Flöka', 'Vekterius', 'Momonosukke']

  if (playerList.includes(playerName)) {
      banPlayerFromGame();
  }
}

function banPlayerFromGame() {
  alert('Vesh!');
}
