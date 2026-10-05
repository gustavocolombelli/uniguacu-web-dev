// Lógica de interface da Pokédex: estado, renderização e eventos.

const CHAVE_GUID_USUARIO = 'pokedex.guidUsuario';

const estado = {
  usuario: null,
  idsFavoritos: new Set(),
  urlPaginaAtual: null,
  pokemonEmDetalhe: null,
  abaAtiva: 'lista',
  numeroRequisicaoLista: 0,
};

const elementos = {
  saudacaoUsuario: document.getElementById('saudacao-usuario'),
  botoesAba: document.querySelectorAll('.abas__botao'),
  contadorFavoritos: document.getElementById('contador-favoritos'),
  secoes: {
    lista: document.getElementById('secao-lista'),
    favoritos: document.getElementById('secao-favoritos'),
    perfil: document.getElementById('secao-perfil'),
  },

  formularioBusca: document.getElementById('formulario-busca'),
  campoBusca: document.getElementById('campo-busca'),
  botaoLimparBusca: document.getElementById('botao-limpar-busca'),
  mensagemLista: document.getElementById('mensagem-lista'),
  gradeLista: document.getElementById('grade-lista'),
  paginacao: document.getElementById('paginacao'),
  botaoAnterior: document.getElementById('botao-anterior'),
  botaoProximo: document.getElementById('botao-proximo'),
  indicadorPagina: document.getElementById('indicador-pagina'),

  mensagemFavoritos: document.getElementById('mensagem-favoritos'),
  gradeFavoritos: document.getElementById('grade-favoritos'),

  mensagemPerfil: document.getElementById('mensagem-perfil'),
  perfilDesconectado: document.getElementById('perfil-desconectado'),
  perfilConectado: document.getElementById('perfil-conectado'),
  formularioEntrar: document.getElementById('formulario-entrar'),
  formularioCriarUsuario: document.getElementById('formulario-criar-usuario'),
  formularioAtualizarNome: document.getElementById('formulario-atualizar-nome'),
  botaoSair: document.getElementById('botao-sair'),
  dadoNome: document.getElementById('dado-nome'),
  dadoSobrenome: document.getElementById('dado-sobrenome'),
  dadoUsername: document.getElementById('dado-username'),
  dadoNascimento: document.getElementById('dado-nascimento'),
  dadoTotalFavoritos: document.getElementById('dado-total-favoritos'),

  dialogoDetalhes: document.getElementById('dialogo-detalhes'),
  botaoFecharDetalhes: document.getElementById('botao-fechar-detalhes'),
  mensagemDetalhes: document.getElementById('mensagem-detalhes'),
  conteudoDetalhes: document.getElementById('conteudo-detalhes'),
  detalhesImagem: document.getElementById('detalhes-imagem'),
  detalhesNome: document.getElementById('detalhes-nome'),
  detalhesNumero: document.getElementById('detalhes-numero'),
  detalhesTipos: document.getElementById('detalhes-tipos'),
  detalhesAltura: document.getElementById('detalhes-altura'),
  detalhesPeso: document.getElementById('detalhes-peso'),
  detalhesBotaoFavorito: document.getElementById('detalhes-botao-favorito'),
};

// ---------- Utilidades de interface ----------

// tipo: 'carregando' | 'erro' | 'sucesso' | 'info'; texto vazio esconde a mensagem.
function mostrarMensagem(elemento, texto, tipo = 'info') {
  elemento.textContent = texto;
  elemento.className = texto ? `mensagem mensagem--${tipo}` : 'mensagem';
}

function formatarNomePokemon(nome) {
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function formatarNumeroPokemon(id) {
  return `#${String(id).padStart(4, '0')}`;
}

function formatarData(dataIso) {
  if (!dataIso) return '—';
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function ehFavorito(idPokemon) {
  return estado.idsFavoritos.has(String(idPokemon));
}

// ---------- Cards de pokémon ----------

function criarCardPokemon(pokemon) {
  const item = document.createElement('li');
  item.dataset.idPokemon = pokemon.id;

  const card = document.createElement('article');
  card.className = 'card-pokemon';

  const botaoAbrir = document.createElement('button');
  botaoAbrir.type = 'button';
  botaoAbrir.className = 'card-pokemon__abrir';
  botaoAbrir.addEventListener('click', () => abrirDetalhes(pokemon.id));

  const imagem = document.createElement('img');
  imagem.className = 'card-pokemon__imagem';
  imagem.src = pokemon.imagem;
  imagem.alt = `Imagem do pokémon ${formatarNomePokemon(pokemon.nome)}`;
  imagem.loading = 'lazy';
  imagem.width = 96;
  imagem.height = 96;

  const numero = document.createElement('span');
  numero.className = 'card-pokemon__numero';
  numero.textContent = formatarNumeroPokemon(pokemon.id);

  const nome = document.createElement('h3');
  nome.className = 'card-pokemon__nome';
  nome.textContent = formatarNomePokemon(pokemon.nome);

  botaoAbrir.append(imagem, numero, nome);

  const botaoFavorito = document.createElement('button');
  botaoFavorito.type = 'button';
  botaoFavorito.className = 'botao-favorito';
  botaoFavorito.dataset.idPokemon = pokemon.id;
  botaoFavorito.dataset.nomePokemon = formatarNomePokemon(pokemon.nome);
  botaoFavorito.addEventListener('click', () => alternarFavorito(pokemon.id));
  atualizarBotaoFavorito(botaoFavorito);

  card.append(botaoAbrir, botaoFavorito);
  item.append(card);
  return item;
}

function atualizarBotaoFavorito(botao) {
  const favoritado = ehFavorito(botao.dataset.idPokemon);
  botao.textContent = favoritado ? '★' : '☆';
  botao.setAttribute('aria-pressed', String(favoritado));
  botao.setAttribute('aria-label', `${favoritado ? 'Remover' : 'Adicionar'} ${botao.dataset.nomePokemon} ${favoritado ? 'dos' : 'aos'} favoritos`);
}

function renderizarGrade(grade, pokemons) {
  grade.replaceChildren(...pokemons.map(criarCardPokemon));
}

// Mantém estrelas, contadores e o diálogo coerentes com estado.idsFavoritos.
function atualizarIndicadoresFavoritos() {
  document.querySelectorAll('.botao-favorito').forEach(atualizarBotaoFavorito);
  elementos.contadorFavoritos.textContent = estado.idsFavoritos.size;
  elementos.dadoTotalFavoritos.textContent = estado.idsFavoritos.size;
  if (estado.pokemonEmDetalhe) atualizarBotaoFavoritoDetalhes();
}

// ---------- Abas ----------

function trocarAba(nomeAba) {
  estado.abaAtiva = nomeAba;
  elementos.botoesAba.forEach((botao) => {
    const ativa = botao.dataset.aba === nomeAba;
    botao.classList.toggle('abas__botao--ativa', ativa);
    if (ativa) botao.setAttribute('aria-current', 'page');
    else botao.removeAttribute('aria-current');
  });
  Object.entries(elementos.secoes).forEach(([nome, secao]) => {
    secao.hidden = nome !== nomeAba;
  });

  if (nomeAba === 'favoritos') carregarFavoritos();
}

// ---------- Listagem, paginação e busca (US01, US02, US03) ----------

async function carregarPagina(urlPagina) {
  const numeroRequisicao = ++estado.numeroRequisicaoLista;
  mostrarMensagem(elementos.mensagemLista, 'Carregando pokémons...', 'carregando');

  try {
    const pagina = await buscarPaginaPokemons(urlPagina);
    if (numeroRequisicao !== estado.numeroRequisicaoLista) return; // outra requisição mais nova assumiu

    estado.urlPaginaAtual = urlPagina;
    renderizarGrade(elementos.gradeLista, pagina.pokemons);
    mostrarMensagem(elementos.mensagemLista, '');

    const paginaAtual = Math.floor(pagina.offset / POKEMONS_POR_PAGINA) + 1;
    const totalPaginas = Math.ceil(pagina.total / POKEMONS_POR_PAGINA);
    elementos.indicadorPagina.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
    elementos.botaoAnterior.disabled = !pagina.urlAnterior;
    elementos.botaoProximo.disabled = !pagina.urlProxima;
    elementos.botaoAnterior.onclick = () => carregarPagina(pagina.urlAnterior);
    elementos.botaoProximo.onclick = () => carregarPagina(pagina.urlProxima);
  } catch (erro) {
    if (numeroRequisicao !== estado.numeroRequisicaoLista) return;
    // Os botões de paginação continuam apontando para a última página válida,
    // então o usuário pode simplesmente tentar de novo.
    mostrarMensagem(elementos.mensagemLista, `Erro ao carregar a lista. ${erro.message}`, 'erro');
  }
}

async function buscarPokemon(termo) {
  const numeroRequisicao = ++estado.numeroRequisicaoLista;
  mostrarMensagem(elementos.mensagemLista, `Buscando "${termo}"...`, 'carregando');
  elementos.paginacao.hidden = true;
  elementos.botaoLimparBusca.hidden = false;

  try {
    const pokemon = await buscarDetalhesPokemon(termo);
    if (numeroRequisicao !== estado.numeroRequisicaoLista) return;
    renderizarGrade(elementos.gradeLista, [pokemon]);
    mostrarMensagem(elementos.mensagemLista, '');
  } catch (erro) {
    if (numeroRequisicao !== estado.numeroRequisicaoLista) return;
    elementos.gradeLista.replaceChildren();
    if (erro.status === 404) {
      mostrarMensagem(elementos.mensagemLista, `Nenhum pokémon encontrado para "${termo}".`, 'info');
    } else {
      mostrarMensagem(elementos.mensagemLista, `Erro na busca. ${erro.message}`, 'erro');
    }
  }
}

function limparBusca() {
  elementos.campoBusca.value = '';
  elementos.botaoLimparBusca.hidden = true;
  elementos.paginacao.hidden = false;
  carregarPagina(estado.urlPaginaAtual);
}

// ---------- Detalhes (US04) ----------

async function abrirDetalhes(idPokemon) {
  estado.pokemonEmDetalhe = null;
  elementos.conteudoDetalhes.hidden = true;
  mostrarMensagem(elementos.mensagemDetalhes, 'Carregando detalhes...', 'carregando');
  elementos.dialogoDetalhes.showModal();

  try {
    const pokemon = await buscarDetalhesPokemon(idPokemon);
    if (!elementos.dialogoDetalhes.open) return;
    estado.pokemonEmDetalhe = pokemon;
    renderizarDetalhes(pokemon);
    mostrarMensagem(elementos.mensagemDetalhes, '');
    elementos.conteudoDetalhes.hidden = false;
  } catch (erro) {
    mostrarMensagem(elementos.mensagemDetalhes, `Erro ao carregar detalhes. ${erro.message}`, 'erro');
  }
}

function renderizarDetalhes(pokemon) {
  const nomeFormatado = formatarNomePokemon(pokemon.nome);
  elementos.detalhesImagem.src = pokemon.imagem;
  elementos.detalhesImagem.alt = `Imagem do pokémon ${nomeFormatado}`;
  elementos.detalhesNome.textContent = nomeFormatado;
  elementos.detalhesNumero.textContent = formatarNumeroPokemon(pokemon.id);
  elementos.detalhesAltura.textContent = `${pokemon.alturaEmMetros.toLocaleString('pt-BR')} m`;
  elementos.detalhesPeso.textContent = `${pokemon.pesoEmKg.toLocaleString('pt-BR')} kg`;

  elementos.detalhesTipos.replaceChildren(...pokemon.tipos.map((tipo) => {
    const item = document.createElement('li');
    item.className = `tipo tipo--${tipo}`;
    item.textContent = tipo;
    return item;
  }));

  atualizarBotaoFavoritoDetalhes();
}

function atualizarBotaoFavoritoDetalhes() {
  const favoritado = ehFavorito(estado.pokemonEmDetalhe.id);
  elementos.detalhesBotaoFavorito.textContent = favoritado ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos';
  elementos.detalhesBotaoFavorito.setAttribute('aria-pressed', String(favoritado));
}

function fecharDetalhes() {
  estado.pokemonEmDetalhe = null;
  elementos.dialogoDetalhes.close();
}

// ---------- Favoritos (US05, US06) ----------

async function alternarFavorito(idPokemon) {
  if (!estado.usuario) {
    if (elementos.dialogoDetalhes.open) fecharDetalhes();
    trocarAba('perfil');
    mostrarMensagem(elementos.mensagemPerfil, 'Entre ou crie uma conta para salvar favoritos.', 'info');
    return;
  }

  const id = String(idPokemon);
  const estavaFavoritado = ehFavorito(id);

  // Atualização otimista: a interface muda na hora e é revertida se a API falhar.
  if (estavaFavoritado) estado.idsFavoritos.delete(id);
  else estado.idsFavoritos.add(id);
  atualizarIndicadoresFavoritos();

  try {
    if (estavaFavoritado) await desfavoritarPokemon(estado.usuario.guid, id);
    else await favoritarPokemon(estado.usuario.guid, id);

    if (estavaFavoritado && estado.abaAtiva === 'favoritos') removerCardFavorito(id);
  } catch (erro) {
    if (estavaFavoritado) estado.idsFavoritos.add(id);
    else estado.idsFavoritos.delete(id);
    atualizarIndicadoresFavoritos();
    alert(`Não foi possível atualizar o favorito. ${erro.message}`);
  }
}

function removerCardFavorito(idPokemon) {
  elementos.gradeFavoritos.querySelector(`li[data-id-pokemon="${idPokemon}"]`)?.remove();
  if (estado.idsFavoritos.size === 0) {
    mostrarMensagem(elementos.mensagemFavoritos, 'Você ainda não tem favoritos. Marque a estrela ☆ de um pokémon na lista.', 'info');
  }
}

async function carregarFavoritos() {
  elementos.gradeFavoritos.replaceChildren();

  if (!estado.usuario) {
    mostrarMensagem(elementos.mensagemFavoritos, 'Entre na aba Perfil para ver seus favoritos.', 'info');
    return;
  }

  mostrarMensagem(elementos.mensagemFavoritos, 'Carregando favoritos...', 'carregando');
  try {
    const ids = await listarIdsFavoritos(estado.usuario.guid);
    estado.idsFavoritos = new Set(ids);
    atualizarIndicadoresFavoritos();

    if (ids.length === 0) {
      mostrarMensagem(elementos.mensagemFavoritos, 'Você ainda não tem favoritos. Marque a estrela ☆ de um pokémon na lista.', 'info');
      return;
    }

    // allSettled: um ID inválido salvo na API não impede a exibição dos demais.
    const resultados = await Promise.allSettled(ids.map(buscarDetalhesPokemon));
    const pokemons = resultados
      .filter((resultado) => resultado.status === 'fulfilled')
      .map((resultado) => resultado.value)
      .sort((a, b) => a.id - b.id);

    if (estado.abaAtiva !== 'favoritos') return;
    renderizarGrade(elementos.gradeFavoritos, pokemons);
    const falhas = resultados.length - pokemons.length;
    mostrarMensagem(
      elementos.mensagemFavoritos,
      falhas ? `${falhas} favorito(s) não puderam ser carregados.` : '',
      falhas ? 'erro' : 'info',
    );
  } catch (erro) {
    mostrarMensagem(elementos.mensagemFavoritos, `Erro ao carregar favoritos. ${erro.message}`, 'erro');
  }
}

// ---------- Usuário ----------

async function conectarUsuario(guid) {
  const usuario = await buscarUsuarioPorGuid(guid);
  if (!usuario) throw new ErroApi('Usuário não encontrado.', 404);

  const ids = await listarIdsFavoritos(guid);
  estado.usuario = usuario;
  estado.idsFavoritos = new Set(ids);
  try { localStorage.setItem(CHAVE_GUID_USUARIO, guid); } catch (erro) { /* navegação privada */ }
  atualizarInterfaceUsuario();
}

function desconectarUsuario() {
  estado.usuario = null;
  estado.idsFavoritos = new Set();
  try { localStorage.removeItem(CHAVE_GUID_USUARIO); } catch (erro) { /* navegação privada */ }
  atualizarInterfaceUsuario();
  mostrarMensagem(elementos.mensagemPerfil, 'Você saiu da sua conta.', 'info');
}

function atualizarInterfaceUsuario() {
  const usuario = estado.usuario;
  elementos.perfilDesconectado.hidden = Boolean(usuario);
  elementos.perfilConectado.hidden = !usuario;

  if (usuario) {
    elementos.saudacaoUsuario.textContent = `Olá, ${usuario.nome} (@${usuario.username})`;
    elementos.dadoNome.textContent = usuario.nome;
    elementos.dadoSobrenome.textContent = usuario.sobrenome;
    elementos.dadoUsername.textContent = `@${usuario.username}`;
    elementos.dadoNascimento.textContent = formatarData(usuario.nascimento);
    elementos.formularioAtualizarNome.elements['atualizar-nome'].value = usuario.nome;
  } else {
    elementos.saudacaoUsuario.textContent = 'Você não está conectado';
  }
  atualizarIndicadoresFavoritos();
}

function definirFormularioOcupado(formulario, ocupado) {
  formulario.querySelectorAll('input, button').forEach((campo) => { campo.disabled = ocupado; });
}

async function aoEnviarEntrar(evento) {
  evento.preventDefault();
  const formulario = evento.currentTarget;
  const username = document.getElementById('entrar-username').value.trim();

  definirFormularioOcupado(formulario, true);
  mostrarMensagem(elementos.mensagemPerfil, 'Procurando usuário...', 'carregando');
  try {
    const guid = await buscarGuidPorUsername(username);
    if (!guid) {
      mostrarMensagem(elementos.mensagemPerfil, `O username "${username}" não existe. Crie uma conta ao lado.`, 'erro');
      return;
    }
    await conectarUsuario(guid);
    formulario.reset();
    mostrarMensagem(elementos.mensagemPerfil, `Bem-vindo(a) de volta, ${estado.usuario.nome}!`, 'sucesso');
  } catch (erro) {
    mostrarMensagem(elementos.mensagemPerfil, `Erro ao entrar. ${erro.message}`, 'erro');
  } finally {
    definirFormularioOcupado(formulario, false);
  }
}

async function aoEnviarCriarUsuario(evento) {
  evento.preventDefault();
  const formulario = evento.currentTarget;
  const dados = {
    nome: document.getElementById('criar-nome').value.trim(),
    sobrenome: document.getElementById('criar-sobrenome').value.trim(),
    username: document.getElementById('criar-username').value.trim(),
    nascimento: document.getElementById('criar-nascimento').value,
  };

  definirFormularioOcupado(formulario, true);
  mostrarMensagem(elementos.mensagemPerfil, 'Criando conta...', 'carregando');
  try {
    // A API responde com erro genérico para username duplicado, então verificamos antes.
    if (await buscarGuidPorUsername(dados.username)) {
      mostrarMensagem(elementos.mensagemPerfil, `O username "${dados.username}" já está em uso. Escolha outro.`, 'erro');
      return;
    }
    const guid = await criarUsuario(dados);
    await conectarUsuario(guid);
    formulario.reset();
    mostrarMensagem(elementos.mensagemPerfil, `Conta criada! Olá, ${estado.usuario.nome}.`, 'sucesso');
  } catch (erro) {
    mostrarMensagem(elementos.mensagemPerfil, `Erro ao criar conta. ${erro.message}`, 'erro');
  } finally {
    definirFormularioOcupado(formulario, false);
  }
}

async function aoEnviarAtualizarNome(evento) {
  evento.preventDefault();
  const formulario = evento.currentTarget;
  const novoNome = document.getElementById('atualizar-nome').value.trim();

  definirFormularioOcupado(formulario, true);
  mostrarMensagem(elementos.mensagemPerfil, 'Salvando...', 'carregando');
  try {
    await atualizarPrimeiroNome(estado.usuario.guid, novoNome);
    // Relê o usuário da API para exibir exatamente o que foi salvo.
    await conectarUsuario(estado.usuario.guid);
    mostrarMensagem(elementos.mensagemPerfil, 'Nome atualizado com sucesso.', 'sucesso');
  } catch (erro) {
    mostrarMensagem(elementos.mensagemPerfil, `Erro ao atualizar o nome. ${erro.message}`, 'erro');
  } finally {
    definirFormularioOcupado(formulario, false);
  }
}

async function restaurarSessao() {
  let guidSalvo = null;
  try { guidSalvo = localStorage.getItem(CHAVE_GUID_USUARIO); } catch (erro) { /* navegação privada */ }
  if (!guidSalvo) return;

  elementos.saudacaoUsuario.textContent = 'Reconectando...';
  try {
    await conectarUsuario(guidSalvo);
  } catch (erro) {
    desconectarUsuario();
    mostrarMensagem(elementos.mensagemPerfil, 'Sua sessão anterior não pôde ser restaurada. Entre novamente.', 'erro');
  }
}

// ---------- Inicialização ----------

function registrarEventos() {
  elementos.botoesAba.forEach((botao) => {
    botao.addEventListener('click', () => trocarAba(botao.dataset.aba));
  });

  elementos.formularioBusca.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const termo = elementos.campoBusca.value.trim();
    if (termo) buscarPokemon(termo);
    else limparBusca();
  });
  elementos.botaoLimparBusca.addEventListener('click', limparBusca);

  elementos.botaoFecharDetalhes.addEventListener('click', fecharDetalhes);
  elementos.dialogoDetalhes.addEventListener('close', () => { estado.pokemonEmDetalhe = null; });
  elementos.detalhesBotaoFavorito.addEventListener('click', () => {
    if (estado.pokemonEmDetalhe) alternarFavorito(estado.pokemonEmDetalhe.id);
  });

  elementos.formularioEntrar.addEventListener('submit', aoEnviarEntrar);
  elementos.formularioCriarUsuario.addEventListener('submit', aoEnviarCriarUsuario);
  elementos.formularioAtualizarNome.addEventListener('submit', aoEnviarAtualizarNome);
  elementos.botaoSair.addEventListener('click', desconectarUsuario);
}

registrarEventos();
carregarPagina(null);
restaurarSessao();
