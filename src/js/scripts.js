const TIMES = [
  { team: "timeA", members: 0, tank: "", healer: "", DPS: 0, assignedTanks: [], assignedHealers: [] },
  { team: "timeB", members: 0, tank: "", healer: "", DPS: 0, assignedTanks: [], assignedHealers: [] },
  { team: "timeC", members: 0, tank: "", healer: "", DPS: 0, assignedTanks: [], assignedHealers: [] },
  { team: "timeD", members: 0, tank: "", healer: "", DPS: 0, assignedTanks: [], assignedHealers: [] }
];

function randomTeam() {
  let availableTeams = TIMES.filter(time => time.members < 5);

  if (availableTeams.length === 0) {
    alert("Todos os times estão completos, não é possível sortear.");
    return null; // Não há mais times disponíveis
  }

  while (true) {
    const randomIndex = Math.floor(Math.random() * availableTeams.length);
    const selectedTeam = availableTeams[randomIndex];

    if (selectedTeam.members < 5) {
      return selectedTeam.team; // Retorna o nome do time selecionado
    } else {
      const fullTeamIndex = TIMES.findIndex(time => time.team === selectedTeam.team);
      TIMES[fullTeamIndex].members = 5; // Atualiza a contagem de membros do time para 5
      availableTeams = availableTeams.filter(time => time.team !== selectedTeam.team); // Remove o time cheio do array de times disponíveis
    }
  }
}


function checkIfValueIsEmpty(textValue) {
  return textValue.trim() === "";
}

function returnTextAreaLinesQty(textAreaName) {
  const textarea = document.getElementById(textAreaName);
  const conteudo = textarea.value;
  const linhas = conteudo.split("\n");
  const quantidadeLinhas = linhas.length;
  console.log(`Integrantes: ${quantidadeLinhas}`);
  return quantidadeLinhas;
}

function addTextToTeam(teamTextArea, playerName, playerRole) {
  try {
    const textarea = document.getElementById(teamTextArea);
    const conteudoAtual = textarea.value;

    if (returnTextAreaLinesQty(teamTextArea) === 1 && checkIfValueIsEmpty(conteudoAtual)) {
      textarea.value = playerRole.toUpperCase() + ": " + playerName;
    } else {
      textarea.value = conteudoAtual + "\n" + playerRole.toUpperCase() + ": " + playerName;
    }
  } catch (err) {
    console.log("Ocorreu um erro: ", err);
  }
}

function obterClasseSelecionada() {
  const selectElement = document.getElementById("selectClass");
  return selectElement.value;
}

function assignMemberToTeam(playerName, role) {
  const assignedTeamName = randomTeam();

  if (assignedTeamName) {
    const roleKey = role.toLowerCase();
    const assignedTeamIndex = TIMES.findIndex(time => time.team === assignedTeamName);

    // Verifica se o time já possui um jogador com o mesmo papel
    if ((roleKey === "tank" && TIMES[assignedTeamIndex].assignedTanks.includes(playerName)) ||
        (roleKey === "healer" && TIMES[assignedTeamIndex].assignedHealers.includes(playerName))) {
      return false; // O jogador já foi designado para o mesmo papel neste time
    }

    if (roleKey === "dps" && TIMES[assignedTeamIndex].DPS === 3) {
      return false; // O time já possui 3 DPSs, não é possível adicionar mais
    }

    if (TIMES[assignedTeamIndex][roleKey] === "" || (TIMES[assignedTeamIndex].DPS < 3 && roleKey === "dps")) {
      TIMES[assignedTeamIndex].members += 1;
      TIMES[assignedTeamIndex][roleKey] = playerName;

      // Atualiza a lista de jogadores designados para o papel
      if (roleKey === "tank") {
        TIMES[assignedTeamIndex].assignedTanks.push(playerName);
      } else if (roleKey === "healer") {
        TIMES[assignedTeamIndex].assignedHealers.push(playerName);
      } else if (roleKey === "dps") {
        TIMES[assignedTeamIndex].DPS += 1; // Incrementa o contador de DPSs
      }

      addTextToTeam(assignedTeamName, playerName, role);
      return true;
    }
  }

  return false;
}

function sortearPlayer() {
  const playerName = document.getElementById("nomeCachaceiro").value.trim();
  const playerClass = obterClasseSelecionada();

  if (checkIfValueIsEmpty(playerName)) {
    alert("Digite um nome antes de sortear.");
    return;
  }

  let success = false;
  console.log("Selected Class: " + playerClass);
  try{
  if (playerClass?.toLowerCase() === "tank" || playerClass?.toLowerCase() === "healer" || playerClass?.toLowerCase() === "dps") {
    success = assignMemberToTeam(playerName, playerClass);
  } else {
    alert("Opção inválida");
    return;
  }
  }catch(err){
    console.log("error: " + err);
  }

  if (!success) {
    console.log("assignMemberToTeam: Todos os times estão completos, não é possível sortear.");
  }
}


function CheckPlayerName(playerName) {
  const playerList = ['Thrain', 'Flöka', 'Vekterius', 'Momonosukke'];

  if (checkIfValueIsEmpty(playerName)) {
    alert('O nome do jogador não pode estar vazio.');
    return;
  }

  if (playerList.includes(playerName)) {
    banPlayerFromGame();
  }
}

function banPlayerFromGame() {
  alert('Vesh!');
}
