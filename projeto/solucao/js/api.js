// Camada de acesso às duas APIs usadas pela aplicação.
// - PokeAPI: dados dos pokémons (somente leitura).
// - API Pokedex (OutSystems): usuários e seus favoritos.

const URL_POKEAPI = 'https://pokeapi.co/api/v2';
const URL_API_POKEDEX = 'https://personal-tp6a9zfc.outsystemscloud.com/Pokedex/rest/Pokede';
const URL_SPRITES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
const POKEMONS_POR_PAGINA = 20;

class ErroApi extends Error {
  constructor(mensagem, status) {
    super(mensagem);
    this.status = status;
  }
}

async function requisitar(url, opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(url, opcoes);
  } catch (erroDeRede) {
    throw new ErroApi('Não foi possível conectar ao servidor. Verifique sua conexão.', 0);
  }
  if (!resposta.ok) {
    throw new ErroApi(`O servidor respondeu com erro (HTTP ${resposta.status}).`, resposta.status);
  }
  return resposta;
}

function montarUrl(base, caminho, parametros = {}) {
  const url = new URL(base + caminho);
  Object.entries(parametros).forEach(([chave, valor]) => url.searchParams.set(chave, valor));
  return url.toString();
}

// A API Pokedex devolve alguns textos puros; removemos espaços e aspas por segurança.
function limparTexto(texto) {
  return texto.trim().replace(/^"|"$/g, '');
}

// ---------- PokeAPI ----------

function extrairIdDaUrl(urlRecurso) {
  const partes = urlRecurso.split('/').filter(Boolean);
  return Number(partes[partes.length - 1]);
}

function montarUrlSprite(idPokemon) {
  return `${URL_SPRITES}/${idPokemon}.png`;
}

// A listagem da PokeAPI não traz imagem; montamos a URL do sprite a partir do ID
// para evitar uma requisição extra por pokémon.
async function buscarPaginaPokemons(urlPagina) {
  const url = urlPagina || montarUrl(URL_POKEAPI, '/pokemon', { limit: POKEMONS_POR_PAGINA, offset: 0 });
  const resposta = await requisitar(url);
  const pagina = await resposta.json();

  return {
    total: pagina.count,
    urlProxima: pagina.next,
    urlAnterior: pagina.previous,
    offset: Number(new URL(url).searchParams.get('offset')) || 0,
    pokemons: pagina.results.map((resumo) => {
      const id = extrairIdDaUrl(resumo.url);
      return { id, nome: resumo.name, imagem: montarUrlSprite(id) };
    }),
  };
}

async function buscarDetalhesPokemon(nomeOuId) {
  const identificador = String(nomeOuId).trim().toLowerCase();
  const resposta = await requisitar(`${URL_POKEAPI}/pokemon/${encodeURIComponent(identificador)}`);
  const dados = await resposta.json();

  return {
    id: dados.id,
    nome: dados.name,
    imagem: dados.sprites.front_default || montarUrlSprite(dados.id),
    tipos: dados.types.map((item) => item.type.name),
    alturaEmMetros: dados.height / 10,
    pesoEmKg: dados.weight / 10,
  };
}

// ---------- API Pokedex (usuários e favoritos) ----------

async function criarUsuario({ nome, sobrenome, username, nascimento }) {
  const resposta = await requisitar(montarUrl(URL_API_POKEDEX, '/Person'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Name: nome, Surename: sobrenome, Username: username, Birthday: nascimento }),
  });
  return limparTexto(await resposta.text());
}

// Retorna o GUID do usuário ou string vazia quando o username não existe.
async function buscarGuidPorUsername(username) {
  const resposta = await requisitar(montarUrl(URL_API_POKEDEX, '/GuidByUsername', { Username: username }));
  return limparTexto(await resposta.text());
}

// Retorna null quando o GUID não corresponde a nenhum usuário (a API devolve {}).
async function buscarUsuarioPorGuid(guid) {
  const resposta = await requisitar(montarUrl(URL_API_POKEDEX, '/PersonByGuid', { Guid: guid }));
  const dados = await resposta.json();
  if (!dados.Username) return null;

  return {
    guid,
    nome: dados.Name,
    sobrenome: dados.Surename,
    username: dados.Username,
    nascimento: dados.Birthday,
  };
}

async function atualizarPrimeiroNome(guid, novoNome) {
  await requisitar(montarUrl(URL_API_POKEDEX, '/PersonFirstName', { Name: novoNome, Guid: guid }), {
    method: 'PATCH',
  });
}

async function listarIdsFavoritos(guid) {
  const resposta = await requisitar(montarUrl(URL_API_POKEDEX, '/FavoritosByGuidPerson', { GuidPerson: guid }));
  const ids = await resposta.json();
  return ids.map(String);
}

async function favoritarPokemon(guid, idPokemon) {
  await requisitar(montarUrl(URL_API_POKEDEX, '/FavoritarPokemon', { GuidPerson: guid, PokemonGuid: idPokemon }), {
    method: 'POST',
  });
}

async function desfavoritarPokemon(guid, idPokemon) {
  await requisitar(montarUrl(URL_API_POKEDEX, '/DesfavoritarPokemon', { GuidPerson: guid, PokemonGuid: idPokemon }), {
    method: 'DELETE',
  });
}
