// Endereço base da API. Todas as rotas começam por aqui.

//1. Fazer um post para /Person em que cria o 
//usuário e armazena no localstorage o GUID
//https://personal-tp6a9zfc.outsystemscloud.com/Pokedex/rest/Pokede/#/Pokede/GuidByUsername








const API = "https://personal-tp6a9zfc.outsystemscloud.com/Pokedex/rest/Pokede";

const campoGuid = document.getElementById("guid");
const saida = document.getElementById("saida");

function mostrar(mensagem) {
  saida.textContent = mensagem;
}

// POST — cria um treinador. Os dados vão no CORPO da requisição, em JSON.
async function criarTreinador(evento) {
  evento.preventDefault();

  const treinador = {
    Name: document.getElementById("nome").value,
    Surename: document.getElementById("sobrenome").value,
    Username: document.getElementById("username").value,
    Birthday: document.getElementById("nascimento").value
  };

  mostrar("Criando...");
fetch
  try {
    const resposta = await fetch(API + "/Person", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(treinador)

    });
    if (!resposta.ok) {
      throw new Error("A API recusou o cadastro (status " + resposta.status + ").");
    }

    const guid = await resposta.text(); // esta rota devolve texto puro, não JSON
    campoGuid.value = guid;
    mostrar("Treinador criado! Guid: " + guid);
    localStorage.setItem("user-guid", guid)
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  }
}

// GET — lê um treinador. Os dados vão na URL, como query string.
async function buscarTreinador() {
  const guid = campoGuid.value;
  mostrar("Buscando...");

  try {
    const resposta = await fetch(API + "/PersonByGuid?Guid=" + guid);

    if (!resposta.ok) {
      throw new Error("A busca falhou (status " + resposta.status + ").");
    }

    const treinador = await resposta.json();

    if (!treinador.Username) {
      throw new Error("Nenhum treinador encontrado com esse Guid.");
    }

    mostrar(
      "Nome: " + treinador.Name + " " + treinador.Surename +
      " | Username: " + treinador.Username +
      " | Nascimento: " + treinador.Birthday
    );
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  }
}

// PATCH — altera UM campo do treinador; o resto continua como está.
async function renomearTreinador() {
  const guid = campoGuid.value;
  const novoNome = document.getElementById("novoNome").value;

  mostrar("Alterando...");

  try {
    const resposta = await fetch(API + "/PersonFirstName?Name=" + novoNome + "&Guid=" + guid, {
      method: "PATCH"
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível alterar o nome (status " + resposta.status + ").");
    }

    mostrar("Primeiro nome alterado para " + novoNome + ". Use o GET para conferir.");
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  }
}

// DELETE — remove o treinador identificado pelo Guid.
async function excluirTreinador() {
  const guid = campoGuid.value;

  mostrar("Excluindo...");

  try {
    const resposta = await fetch(API + "/Person?Guid=" + guid, {
      method: "DELETE"
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível excluir (status " + resposta.status + ").");
    }

    campoGuid.value = "";
    mostrar("Treinador excluído.");
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  }
}

document.getElementById("formCriar").addEventListener("submit", criarTreinador);
document.getElementById("btnBuscar").addEventListener("click", buscarTreinador);
document.getElementById("btnRenomear").addEventListener("click", renomearTreinador);
document.getElementById("btnExcluir").addEventListener("click", excluirTreinador);
