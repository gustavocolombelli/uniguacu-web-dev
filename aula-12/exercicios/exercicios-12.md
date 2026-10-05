# Exercícios — Aula 12

[Desenvolvimento Web](../../README.md) > [Aula 12](../aula-12.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 12](../aula-12.md): o que é uma Promise, como criá-la com `new Promise`, como consumi-la com `.then`/`.catch` e com `async`/`await`, e como fazer várias requisições em paralelo com `Promise.all` e `Promise.allSettled`.

Em vários exercícios, considere as duas funções da aula:

```js
const API = "https://pokeapi.co/api/v2/pokemon/";

async function buscarPokemon(nome) {
  const resposta = await fetch(API + nome);

  if (!resposta.ok) {
    throw new Error("Pokémon \"" + nome + "\" não encontrado (status " + resposta.status + ").");
  }

  const pokemon = await resposta.json();
  return pokemon;
}

function esperar(milissegundos) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Esperei " + milissegundos + " ms");
    }, milissegundos);
  });
}
```

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

A função `devolverDepois` espera um tempo e depois devolve um texto:

```js
function devolverDepois(milissegundos, texto) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(texto);
    }, milissegundos);
  });
}

const inicio = performance.now();

const resultado = await Promise.all([
  devolverDepois(300, "A"),
  devolverDepois(100, "B"),
  devolverDepois(200, "C")
]);

console.log(resultado, Math.round(performance.now() - inicio) + " ms");
```

O que aparece no console, aproximadamente?

- **A.** `["A", "B", "C"]` e cerca de `600 ms`, porque o `Promise.all` espera uma Promise terminar para começar a próxima.
- **B.** `["B", "C", "A"]` e cerca de `300 ms`, porque os valores entram no array na ordem em que as Promises terminam.
- **C.** `["A", "B", "C"]` e cerca de `300 ms`.
- **D.** `["B"]` e cerca de `100 ms`, porque o `Promise.all` devolve a primeira Promise que terminar.

<details>
<summary>Resposta</summary>

Alternativa **C**.

- **Tempo:** as três Promises foram criadas (e os três `setTimeout` disparados) **antes** do `Promise.all` começar a esperar, então as esperas se sobrepõem. O total é a espera mais longa, cerca de 300 ms, e não a soma (600 ms) como na alternativa A. Somar os tempos seria o comportamento de um `await` dentro de um `for` (seção 2.5 da aula).
- **Ordem:** a ordem de término é B, C, A, mas o `Promise.all` monta o array **na ordem em que as Promises foram passadas**, não na ordem de chegada (seção 2.6). Por isso a alternativa B está errada. É o mesmo motivo que faz os cards do exemplo da aula saírem na ordem da lista.
- A alternativa D descreve o `Promise.race`, que devolve só a primeira a terminar. O `Promise.all` espera **todas**.

</details>

---

**1.** Para cada situação, diga em que estado a Promise está: **pendente**, **cumprida** ou **rejeitada**.

| Situação | Estado |
|---|---|
| `const p = fetch(API + "pikachu");`, logo na linha seguinte | ? |
| `fetch(API + "pikachu")`, depois que a resposta `200` chegou | ? |
| `fetch(API + "pikachuu")`, depois que a resposta `404` chegou | ? |
| `fetch(API + "pikachu")` com o computador sem internet | ? |
| `tentarCapturar("Eevee")` (seção 2.2), depois que o sorteio chamou `reject(...)` | ? |

<details>
<summary>Sugestão de solução</summary>

| Situação | Estado |
|---|---|
| `const p = fetch(API + "pikachu");`, logo na linha seguinte | **Pendente** |
| `fetch(API + "pikachu")`, depois que a resposta `200` chegou | **Cumprida** |
| `fetch(API + "pikachuu")`, depois que a resposta `404` chegou | **Cumprida** |
| `fetch(API + "pikachu")` com o computador sem internet | **Rejeitada** |
| `tentarCapturar("Eevee")`, depois que o sorteio chamou `reject(...)` | **Rejeitada** |

A terceira linha é a que mais engana: para o `fetch`, um `404` **é uma resposta**, e a Promise cumpre com ela (com `resposta.ok` igual a `false`). O `fetch` só rejeita quando não há resposta nenhuma, como numa falha de rede (Aula 10, seção 2.7). É por isso que `buscarPokemon` confere `resposta.ok` e lança o erro por conta própria.

</details>

---

**2.** Sem rodar, escreva a ordem em que as mensagens aparecem no console.

```js
console.log("1 - pedindo o pikachu");

fetch(API + "pikachu").then(function (resposta) {
  console.log("3 - chegou a resposta");
});

console.log("2 - pedido feito");
```

<details>
<summary>Sugestão de solução</summary>

```
1 - pedindo o pikachu
2 - pedido feito
3 - chegou a resposta
```

O `.then` só **registra** a função que vai rodar quando a Promise cumprir, sem esperar. O programa segue para a linha seguinte na hora, e a função do `.then` só entra na fila do *event loop* quando a resposta chega, depois que o código atual já terminou.

</details>

---

**3.** (Parsons) As linhas abaixo formam a função `carregarTime`, que busca **em paralelo** os pokémons do array `nomes` e depois exibe o time. Reordene-as (a indentação foi removida de propósito).

```js
const pokemons = await Promise.all(promessas);
async function carregarTime(nomes) {
}
promessas.push(buscarPokemon(nomes[i]));
exibirTime(pokemons);
}
const promessas = [];
for (let i = 0; i < nomes.length; i++) {
```

<details>
<summary>Sugestão de solução</summary>

```js
async function carregarTime(nomes) {
  const promessas = [];

  for (let i = 0; i < nomes.length; i++) {
    promessas.push(buscarPokemon(nomes[i]));
  }

  const pokemons = await Promise.all(promessas);
  exibirTime(pokemons);
}
```

O `await Promise.all` precisa vir **depois** do `for`, e não dentro dele: primeiro todas as requisições são disparadas, depois o código espera por todas. Se o `await` entrar no laço, o resultado é a versão em sequência.

</details>

---

**4.** (Parsons) Reordene os trechos abaixo para formar uma cadeia de `.then`/`.catch` que busca o `snorlax` e mostra no console a altura dele em metros (a PokeAPI informa a altura em decímetros).

```js
.catch(function (erro) {
  console.log("Erro: " + erro.message);
});
fetch(API + "snorlax")
.then(function (pokemon) {
  console.log(pokemon.name + " mede " + pokemon.height / 10 + " m");
})
.then(function (resposta) {
  return resposta.json();
})
```

<details>
<summary>Sugestão de solução</summary>

```js
fetch(API + "snorlax")
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (pokemon) {
    console.log(pokemon.name + " mede " + pokemon.height / 10 + " m");
  })
  .catch(function (erro) {
    console.log("Erro: " + erro.message);
  });
```

O primeiro `.then` recebe a **resposta** e devolve `resposta.json()`, que é outra Promise. O segundo `.then` só roda quando ela cumprir e recebe o **objeto** já convertido. O `.catch` fica no fim para recolher uma falha em qualquer ponto da cadeia.

</details>

---

**5.** Reescreva o código do exercício 4 usando `async`/`await` e `try`/`catch`, dentro de uma função chamada `mostrarAltura`.

<details>
<summary>Sugestão de solução</summary>

```js
async function mostrarAltura() {
  try {
    const resposta = await fetch(API + "snorlax");
    const pokemon = await resposta.json();
    console.log(pokemon.name + " mede " + pokemon.height / 10 + " m");
  } catch (erro) {
    console.log("Erro: " + erro.message);
  }
}

mostrarAltura();
```

Cada `.then` virou um `await` e o `.catch` virou o `catch` do `try`. O comportamento é o mesmo (seção 2.4 da aula).

</details>

---

**6.** O código abaixo deveria mostrar `pikachu tem 6 kg`, mas mostra `undefined tem NaN kg`. Não aparece nenhum erro no console. Encontre e corrija o problema.

```js
async function mostrarPeso() {
  const pokemon = buscarPokemon("pikachu");
  console.log(pokemon.name + " tem " + pokemon.weight / 10 + " kg");
}
```

<details>
<summary>Sugestão de solução</summary>

```js
async function mostrarPeso() {
  const pokemon = await buscarPokemon("pikachu");
  console.log(pokemon.name + " tem " + pokemon.weight / 10 + " kg");
}
```

Faltava o `await`. `buscarPokemon` é `async`, então devolve uma **Promise**, e não o pokémon. Sem o `await`, a variável `pokemon` guarda a Promise; `pokemon.name` e `pokemon.weight` não existem nela e viram `undefined` (e `undefined / 10` é `NaN`). É o erro do alerta da seção 2.4 da aula.

</details>

---

**7.** A função abaixo busca os três pokémons iniciais **em sequência**. Modifique-a para buscar os três **em paralelo**, mantendo o mesmo resultado.

```js
async function buscarIniciais() {
  const bulbasaur = await buscarPokemon("bulbasaur");
  const charmander = await buscarPokemon("charmander");
  const squirtle = await buscarPokemon("squirtle");

  return [bulbasaur, charmander, squirtle];
}
```

<details>
<summary>Sugestão de solução</summary>

```js
async function buscarIniciais() {
  const iniciais = await Promise.all([
    buscarPokemon("bulbasaur"),
    buscarPokemon("charmander"),
    buscarPokemon("squirtle")
  ]);

  return iniciais;
}
```

As três chamadas acontecem ao montar o array, sem `await` em nenhuma delas, então as três requisições saem juntas. O `Promise.all` devolve o array na mesma ordem (bulbasaur, charmander, squirtle), então o resultado é idêntico ao da versão original, só que mais rápido.

</details>

---

**8.** Para cada situação, diga se você usaria **`Promise.all`** ou **`Promise.allSettled`** e explique em uma frase.

| Situação |
|---|
| a) Uma tela que compara **dois** pokémons lado a lado (peso, altura, tipos) |
| b) A página de listagem da Pokédex, com 20 cards |
| c) Carregar os favoritos de um treinador para exibir na tela dele |
| d) Calcular a **soma dos pesos** de um time de 6 pokémons |

<details>
<summary>Sugestão de solução</summary>

| Situação | Escolha | Por quê |
|---|---|---|
| a) Comparação lado a lado | `Promise.all` | Comparar um pokémon com "nada" não faz sentido: se um falhar, é melhor mostrar uma mensagem de erro |
| b) Listagem com 20 cards | `Promise.allSettled` | Um card com problema não deve esconder os outros 19 |
| c) Favoritos do treinador | `Promise.allSettled` | É melhor mostrar os favoritos que carregaram e avisar sobre os que falharam |
| d) Soma dos pesos | `Promise.all` | Uma soma com um item faltando dá um número errado, que parece certo. É melhor falhar e avisar |

Não existe resposta "certa" universal: a pergunta a fazer é sempre a do diagrama 3.4 da aula, **se o resultado parcial serve para alguma coisa**. Se você justificou uma escolha diferente com um bom argumento, ela também vale.

</details>

---

**9.** Sem rodar, diga o que o código abaixo mostra no console. Considere que `pikachu` e `snorlax` existem e `pikachuu` não existe.

```js
const resultados = await Promise.allSettled([
  buscarPokemon("pikachu"),
  buscarPokemon("pikachuu"),
  buscarPokemon("snorlax")
]);

for (let i = 0; i < resultados.length; i++) {
  if (resultados[i].status === "fulfilled") {
    console.log("OK: " + resultados[i].value.name);
  } else {
    console.log("Falhou: " + resultados[i].reason.message);
  }
}
```

<details>
<summary>Sugestão de solução</summary>

```
OK: pikachu
Falhou: Pokémon "pikachuu" não encontrado (status 404).
OK: snorlax
```

O `Promise.allSettled` nunca rejeita: o `for` sempre roda, com um item por Promise, na mesma ordem da entrada. Itens cumpridos trazem o pokémon em `value`; itens rejeitados trazem, em `reason`, o `Error` lançado por `buscarPokemon`, que tem a mensagem em `.message`.

</details>

---

**10.** A função abaixo mostra `Carregando...` enquanto busca o time, mas o texto de carregamento nunca some quando dá erro. Modifique-a com `finally` para que o elemento `carregando` seja escondido **sempre**, com sucesso ou com erro.

```js
async function carregar(nomes) {
  const carregando = document.getElementById("carregando");
  carregando.hidden = false;

  try {
    const promessas = [];
    for (let i = 0; i < nomes.length; i++) {
      promessas.push(buscarPokemon(nomes[i]));
    }
    const pokemons = await Promise.all(promessas);
    exibirTime(pokemons);
    carregando.hidden = true;
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  }
}
```

<details>
<summary>Sugestão de solução</summary>

```js
async function carregar(nomes) {
  const carregando = document.getElementById("carregando");
  carregando.hidden = false;

  try {
    const promessas = [];
    for (let i = 0; i < nomes.length; i++) {
      promessas.push(buscarPokemon(nomes[i]));
    }
    const pokemons = await Promise.all(promessas);
    exibirTime(pokemons);
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  } finally {
    carregando.hidden = true;
  }
}
```

No original, `carregando.hidden = true` estava no fim do `try`. Quando o `Promise.all` rejeita, o `await` lança o erro e o código pula direto para o `catch`, sem passar por essa linha. O bloco `finally` roda nos dois caminhos, então é o lugar certo para a "limpeza".

</details>

---

**11.** Crie a função `capturarComChance(pokemon, chance)`, que devolve uma Promise que, depois de 800 ms:

- **cumpre** com o texto `"<pokemon> foi capturado!"` se `Math.random()` for menor que `chance` (um número entre 0 e 1);
- **rejeita** com um `Error` de mensagem `"<pokemon> escapou!"`, caso contrário.

Depois, escreva uma função `async` chamada `tentar` que chama `capturarComChance("Mewtwo", 0.2)` e mostra no console a mensagem de sucesso ou a de erro.

<details>
<summary>Sugestão de solução</summary>

```js
function capturarComChance(pokemon, chance) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (Math.random() < chance) {
        resolve(pokemon + " foi capturado!");
      } else {
        reject(new Error(pokemon + " escapou!"));
      }
    }, 800);
  });
}

async function tentar() {
  try {
    const mensagem = await capturarComChance("Mewtwo", 0.2);
    console.log(mensagem);
  } catch (erro) {
    console.log(erro.message);
  }
}

tentar();
```

Rode `tentar()` várias vezes: na maioria delas o Mewtwo escapa (só 20% de chance), e o `catch` recebe o erro que o `reject` criou. Rejeitar com `new Error(...)`, e não com um texto solto, mantém o padrão de `erro.message` usado em todo o resto do código.

</details>

---

**12.** Crie uma página de **duelo**: dois campos de texto para nomes de pokémons e um botão **Comparar**. Ao clicar, busque os dois **em paralelo** e mostre qual deles é mais pesado (ou se empatam). Se qualquer um dos dois não existir, mostre apenas a mensagem de erro.

<details>
<summary>Sugestão de solução</summary>

```html
<input type="text" id="primeiro" placeholder="Primeiro pokémon">
<input type="text" id="segundo" placeholder="Segundo pokémon">
<button id="btnComparar">Comparar</button>
<p id="saida"></p>

<script src="app.js"></script>
```

```js
const API = "https://pokeapi.co/api/v2/pokemon/";
const saida = document.getElementById("saida");

async function buscarPokemon(nome) {
  const resposta = await fetch(API + nome.trim().toLowerCase());

  if (!resposta.ok) {
    throw new Error("Pokémon \"" + nome + "\" não encontrado (status " + resposta.status + ").");
  }

  const pokemon = await resposta.json();
  return pokemon;
}

async function comparar() {
  const nome1 = document.getElementById("primeiro").value;
  const nome2 = document.getElementById("segundo").value;
  saida.textContent = "Comparando...";

  try {
    const duelo = await Promise.all([buscarPokemon(nome1), buscarPokemon(nome2)]);
    const a = duelo[0];
    const b = duelo[1];

    if (a.weight > b.weight) {
      saida.textContent = a.name + " (" + a.weight / 10 + " kg) é mais pesado que " + b.name + " (" + b.weight / 10 + " kg).";
    } else if (b.weight > a.weight) {
      saida.textContent = b.name + " (" + b.weight / 10 + " kg) é mais pesado que " + a.name + " (" + a.weight / 10 + " kg).";
    } else {
      saida.textContent = a.name + " e " + b.name + " têm o mesmo peso: " + a.weight / 10 + " kg.";
    }
  } catch (erro) {
    saida.textContent = "Erro: " + erro.message;
  }
}

document.getElementById("btnComparar").addEventListener("click", comparar);
```

`Promise.all` é a escolha certa aqui: sem um dos dois pokémons não existe duelo (exercício 8a). E como o array volta na ordem de entrada, `duelo[0]` é sempre o do primeiro campo, mesmo que a resposta dele chegue por último.

</details>

---

**13.** Crie a função `buscarVarios(nomes)`, que recebe um array de nomes, busca todos em paralelo e devolve (por meio de uma Promise, já que ela é `async`) um objeto com dois arrays:

```js
{
  encontrados: [ /* objetos dos pokémons que deram certo */ ],
  falhas: [ /* mensagens de erro dos que falharam */ ]
}
```

A função **nunca** deve rejeitar por causa de um nome inválido. Teste com `buscarVarios(["eevee", "eeve", "vaporeon", "jolteon"])`.

<details>
<summary>Sugestão de solução</summary>

```js
async function buscarVarios(nomes) {
  const promessas = [];
  for (let i = 0; i < nomes.length; i++) {
    promessas.push(buscarPokemon(nomes[i]));
  }

  const resultados = await Promise.allSettled(promessas);

  const encontrados = [];
  const falhas = [];

  for (let i = 0; i < resultados.length; i++) {
    if (resultados[i].status === "fulfilled") {
      encontrados.push(resultados[i].value);
    } else {
      falhas.push(resultados[i].reason.message);
    }
  }

  return { encontrados: encontrados, falhas: falhas };
}

async function testar() {
  const resultado = await buscarVarios(["eevee", "eeve", "vaporeon", "jolteon"]);
  console.log(resultado.encontrados.length + " encontrados");  // 3 encontrados
  console.log(resultado.falhas);                               // ['Pokémon "eeve" não encontrado (status 404).']
}

testar();
```

`Promise.allSettled` garante que a função não rejeita por causa de um nome ruim: ela sempre termina e entrega o que conseguiu. Separar o resultado em `encontrados` e `falhas` já dentro da função evita que todo código que a usa tenha que conhecer o formato `status`/`value`/`reason`.

</details>

---

**14.** Usando a API da Pokédex da Aula 11, crie uma função `mostrarFavoritos(guid)` que:

1. busca os favoritos do treinador com `GET /FavoritosByGuidPerson?GuidPerson=...` (a resposta é um **array** com o número de cada pokémon favorito);
2. em seguida, busca os detalhes de **todos** os favoritos na PokeAPI **em paralelo**;
3. exibe um card para cada favorito encontrado e informa quantos falharam.

Pense antes de escrever: quais requisições podem ir em paralelo e qual **precisa** terminar primeiro?

<details>
<summary>Sugestão de solução</summary>

```js
const API_POKEDEX = "https://personal-tp6a9zfc.outsystemscloud.com/Pokedex/rest/Pokede";

async function mostrarFavoritos(guid) {
  mostrar("Carregando favoritos...");

  try {
    // Etapa 1: a lista de favoritos (precisa terminar antes: as próximas dependem dela)
    const resposta = await fetch(API_POKEDEX + "/FavoritosByGuidPerson?GuidPerson=" + guid);

    if (!resposta.ok) {
      throw new Error("Não foi possível listar os favoritos (status " + resposta.status + ").");
    }

    const favoritos = await resposta.json();

    // Etapa 2: os detalhes de cada favorito, todos em paralelo
    const promessas = [];
    for (let i = 0; i < favoritos.length; i++) {
      promessas.push(buscarPokemon(favoritos[i]));
    }

    const resultados = await Promise.allSettled(promessas);

    // Etapa 3: separar o que deu certo e exibir
    const encontrados = [];
    for (let i = 0; i < resultados.length; i++) {
      if (resultados[i].status === "fulfilled") {
        encontrados.push(resultados[i].value);
      }
    }

    exibirTime(encontrados);
    const falhas = resultados.length - encontrados.length;
    mostrar(encontrados.length + " favorito(s) carregado(s), " + falhas + " com falha.");
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  }
}
```

A etapa 1 **tem** que usar `await` antes de seguir: sem a lista, não há como saber quais pokémons buscar. Já as requisições da etapa 2 são independentes entre si e podem ir juntas. Uma aplicação real costuma misturar os dois padrões assim.

`buscarPokemon` aceita tanto o nome quanto o número, porque a PokeAPI responde a `/pokemon/25` e a `/pokemon/pikachu`. Se a sua função `exibirTime` for a da aula, os favoritos já aparecem com imagem e número.

</details>
