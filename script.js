// Lista de nomes para o sorteio
const nomes = ["Time A", "Time B", "Time C", "Time D"];

// Função para sortear e associar o nome
function sortearNome() {
    const nomeDigitado = document.getElementById("nome").value;
    const selectNomes = document.getElementById("nomesList");
    const nomeSelecionado = selectNomes.value;

    if (nomeDigitado === "") {
        alert("Digite um nome antes de sortear.");
        return;
    }

    document.getElementById("nomeSorteado").textContent = `${nomeDigitado} foi associado a ${nomeSelecionado}.`;
}

// Chama a função para gerar as opções da lista de nomes ao carregar a página
gerarOpcoesNomes();
