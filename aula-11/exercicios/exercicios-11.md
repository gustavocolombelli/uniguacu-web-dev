# Exercícios — Aula 11

[Desenvolvimento Web](../../README.md) > [Aula 11](../aula-11.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 11](../aula-11.md): métodos HTTP (`GET`, `POST`, `PATCH`, `DELETE`) com `fetch()`, envio de dados pela URL e pelo corpo, leitura da resposta e tratamento de erros.

Em todos os exercícios, considere:

```js
const API = "https://personal-tp6a9zfc.outsystemscloud.com/Pokedex/rest/Pokede";
```

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

Uma pessoa tenta cadastrar um treinador com o código abaixo e recebe status `400` da API.

```js
const resposta = await fetch(API + "/Person", {
  method: "POST",
  body: {
    Name: "Ash",
    Surename: "Ketchum",
    Username: "ash_k",
    Birthday: "2000-05-22"
  }
});
```

Por que a API recusa esse cadastro?

- **A.** Porque `POST` não aceita corpo: os dados deveriam ir na URL, como no `GET`.
- **B.** Porque o corpo de uma requisição é sempre **texto**: falta `JSON.stringify(...)` no `body` e o cabeçalho `Content-Type: application/json`. Do jeito que está, o objeto vira a string `"[object Object]"`.
- **C.** Porque falta `await` antes de `fetch`.
- **D.** Porque o método para criar um registro é `PATCH`, não `POST`.

<details>
<summary>Resposta</summary>

Alternativa **B**. Como a Aula 11 mostra (seção 2.4), o corpo de uma requisição HTTP trafega como texto. Quando você passa um objeto direto para `body`, o navegador o converte para string do jeito mais simples possível — o resultado é literalmente `"[object Object]"`, que não é JSON válido. O servidor recebe algo que não consegue interpretar e responde `400`.

A forma correta:

```js
const resposta = await fetch(API + "/Person", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(treinador)
});
```

A alternativa A está errada porque `POST` **é** o método que leva dados no corpo; a D inverte os papéis: `PATCH` altera algo que já existe, `POST` cria.

> [!IMPORTANT]
> `headers` e `JSON.stringify` andam juntos: o primeiro avisa ao servidor *em que formato* o corpo está, o segundo garante que ele esteja mesmo nesse formato.

</details>

---

**1.** Relacione cada operação do cadastro ao método HTTP correspondente.

| Operação | Método |
|---|---|
| Consultar os dados de um treinador | ? |
| Cadastrar um treinador novo | ? |
| Corrigir só o primeiro nome | ? |
| Remover o treinador do sistema | ? |

<details>
<summary>Sugestão de solução</summary>

| Operação | Método |
|---|---|
| Consultar os dados de um treinador | `GET` |
| Cadastrar um treinador novo | `POST` |
| Corrigir só o primeiro nome | `PATCH` |
| Remover o treinador do sistema | `DELETE` |

A URL diz *sobre qual recurso* você está falando; o método diz *o que fazer* com ele (seção 2.1).

</details>

---

**2.** Escreva a linha de `fetch()` que busca o treinador de `Guid` guardado na variável `guid`, usando a rota `/PersonByGuid`.

<details>
<summary>Sugestão de solução</summary>

```js
const resposta = await fetch(API + "/PersonByGuid?Guid=" + guid);
```

Não é preciso informar `method`: `GET` é o padrão do `fetch()` (seção 2.3). Os dados vão na URL, depois do `?`, no formato `chave=valor`.

</details>

---

**3.** Complete as três opções que faltam para que este `POST` funcione.

```js
const treinador = {
  Name: "Misty",
  Surename: "Williams",
  Username: "misty_w",
  Birthday: "2001-03-14"
};

const resposta = await fetch(API + "/Person", {
  _______: "POST",
  _______: { "Content-Type": "application/json" },
  _______: JSON.stringify(treinador)
});
```

<details>
<summary>Sugestão de solução</summary>

```js
const resposta = await fetch(API + "/Person", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(treinador)
});
```

- `method` — o método da requisição;
- `headers` — avisa que o corpo está em JSON;
- `body` — o corpo em si, convertido para texto por `JSON.stringify`.

</details>

---

**4.** O código abaixo cadastra o treinador corretamente, mas estoura um erro na hora de ler a resposta. Identifique o problema e corrija.

```js
const resposta = await fetch(API + "/Person", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(treinador)
});

const guid = await resposta.json();
```

<details>
<summary>Sugestão de solução</summary>

```js
const guid = await resposta.text();
```

A rota `POST /Person` devolve o `Guid` como **texto puro**, não como JSON (seção 2.4). `resposta.json()` tenta interpretar esse texto como JSON e falha. A regra: `.json()` para respostas em JSON, `.text()` para texto simples.

</details>

---

**5.** Escreva a requisição que **exclui** o treinador cujo `Guid` está na variável `guid`.

<details>
<summary>Sugestão de solução</summary>

```js
const resposta = await fetch(API + "/Person?Guid=" + guid, {
  method: "DELETE"
});
```

O objeto de opções tem só o `method`: não existe corpo a enviar, e o registro é identificado pelo `Guid` na URL (seção 2.6). A resposta vem vazia — o que confirma o sucesso é o `resposta.ok`.

</details>

---

**6.** Monte a URL completa de um `PATCH` que altera o primeiro nome para `Brock`, sendo o `Guid` igual a `abc-123`. Depois escreva a chamada de `fetch()` correspondente.

<details>
<summary>Sugestão de solução</summary>

URL:

```
https://personal-tp6a9zfc.outsystemscloud.com/Pokedex/rest/Pokede/PersonFirstName?Name=Brock&Guid=abc-123
```

Código:

```js
const resposta = await fetch(API + "/PersonFirstName?Name=Brock&Guid=abc-123", {
  method: "PATCH"
});
```

O primeiro parâmetro vem depois de `?` e os seguintes depois de `&` (seção 2.3).

</details>

---

**7.** Para cada situação da Pokédex, diga qual método HTTP você usaria:

1. Exibir na tela a lista de pokémons favoritos de um treinador.
2. Marcar um pokémon como favorito.
3. Tirar um pokémon dos favoritos.
4. Trocar o primeiro nome do treinador, mantendo o resto do cadastro.
5. Encerrar a conta do treinador.

<details>
<summary>Sugestão de solução</summary>

| Situação | Método | Rota da API |
|---|---|---|
| 1. Listar favoritos | `GET` | `/FavoritosByGuidPerson?GuidPerson=...` |
| 2. Favoritar | `POST` | `/FavoritarPokemon?GuidPerson=...&PokemonGuid=...` |
| 3. Desfavoritar | `DELETE` | `/DesfavoritarPokemon?GuidPerson=...&PokemonGuid=...` |
| 4. Trocar o primeiro nome | `PATCH` | `/PersonFirstName?Name=...&Guid=...` |
| 5. Encerrar a conta | `DELETE` | `/Person?Guid=...` |

Repare no padrão: **criar** (mesmo uma ligação entre dois registros, como um favorito) é `POST`; **desfazer** é `DELETE`; **consultar** é `GET`.

</details>

---

**8.** O código abaixo busca um `Guid` que não existe. A API responde com status `200` e corpo `{}`. O que é exibido na tela, e como corrigir para que o usuário receba um aviso claro?

```js
const resposta = await fetch(API + "/PersonByGuid?Guid=" + guid);

if (!resposta.ok) {
  throw new Error("A busca falhou.");
}

const treinador = await resposta.json();
mostrar("Nome: " + treinador.Name);
```

<details>
<summary>Sugestão de solução</summary>

Aparece `Nome: undefined`: como o status é `200`, `resposta.ok` é `true` e o `throw` nunca acontece; o objeto recebido é `{}`, então `treinador.Name` é `undefined`.

Correção — verificar também o **conteúdo**, não só o status:

```js
const treinador = await resposta.json();

if (!treinador.Username) {
  throw new Error("Nenhum treinador encontrado com esse Guid.");
}

mostrar("Nome: " + treinador.Name);
```

É o mesmo tipo de erro escondido da ViaCEP na Aula 10: status de sucesso não garante que os dados existem (seção 2.7).

</details>

---

## Desafios

**9.** Crie uma função `criarTreinador(treinador)` que receba um objeto com `Name`, `Surename`, `Username` e `Birthday`, faça o `POST` na API e **devolva** (com `return`) o `Guid` recebido. Se a API responder com um status de erro, a função deve lançar um erro com `throw new Error(...)`, sem devolver nada.

<details>
<summary>Sugestão de solução</summary>

```js
async function criarTreinador(treinador) {
  const resposta = await fetch(API + "/Person", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(treinador)
  });

  if (!resposta.ok) {
    throw new Error("A API recusou o cadastro (status " + resposta.status + ").");
  }

  return await resposta.text();
}

// uso:
try {
  const guid = await criarTreinador({
    Name: "Ash",
    Surename: "Ketchum",
    Username: "ash_k",
    Birthday: "2000-05-22"
  });

  console.log("Guid do treinador:", guid);
} catch (erro) {
  console.log("Erro:", erro.message);
}
```

Quem **lança** o erro é a função; quem **captura** é o código que a chama — assim a mesma função serve para qualquer tela, cada uma tratando a falha do seu jeito.

</details>

---

**10.** Partindo da página do exemplo da aula ([`exemplo/`](../exemplo/)), acrescente a área de favoritos, com um campo para o número do pokémon e três botões:

- **Favoritar** — `POST /FavoritarPokemon?GuidPerson=...&PokemonGuid=...`
- **Desfavoritar** — `DELETE /DesfavoritarPokemon?GuidPerson=...&PokemonGuid=...`
- **Listar favoritos** — `GET /FavoritosByGuidPerson?GuidPerson=...`, que devolve um **array** de textos; exiba cada item numa `<ul>`.

Todas as três devem usar o `Guid` já preenchido na tela e tratar erros com `try`/`catch`.

<details>
<summary>Sugestão de solução</summary>

HTML a acrescentar:

```html
<section>
  <h2>Favoritos</h2>
  <input type="text" id="pokemon" placeholder="Número do pokémon">
  <button id="btnFavoritar">Favoritar</button>
  <button id="btnDesfavoritar" class="perigo">Desfavoritar</button>
  <button id="btnListar">Listar favoritos</button>
  <ul id="listaFavoritos"></ul>
</section>
```

JavaScript:

```js
const listaFavoritos = document.getElementById("listaFavoritos");

async function favoritar() {
  const guid = campoGuid.value;
  const pokemon = document.getElementById("pokemon").value;

  try {
    const resposta = await fetch(
      API + "/FavoritarPokemon?GuidPerson=" + guid + "&PokemonGuid=" + pokemon,
      { method: "POST" }
    );

    if (!resposta.ok) {
      throw new Error("Não foi possível favoritar (status " + resposta.status + ").");
    }

    mostrar("Pokémon " + pokemon + " favoritado.");
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  }
}

async function desfavoritar() {
  const guid = campoGuid.value;
  const pokemon = document.getElementById("pokemon").value;

  try {
    const resposta = await fetch(
      API + "/DesfavoritarPokemon?GuidPerson=" + guid + "&PokemonGuid=" + pokemon,
      { method: "DELETE" }
    );

    if (!resposta.ok) {
      throw new Error("Não foi possível desfavoritar (status " + resposta.status + ").");
    }

    mostrar("Pokémon " + pokemon + " removido dos favoritos.");
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  }
}

async function listarFavoritos() {
  const guid = campoGuid.value;

  try {
    const resposta = await fetch(API + "/FavoritosByGuidPerson?GuidPerson=" + guid);

    if (!resposta.ok) {
      throw new Error("Não foi possível listar (status " + resposta.status + ").");
    }

    const favoritos = await resposta.json(); // array de textos
    listaFavoritos.textContent = "";

    for (let i = 0; i < favoritos.length; i++) {
      const item = document.createElement("li");
      item.textContent = "Pokémon " + favoritos[i];
      listaFavoritos.appendChild(item);
    }

    mostrar(favoritos.length + " favorito(s) encontrado(s).");
  } catch (erro) {
    mostrar("Erro: " + erro.message);
  }
}

document.getElementById("btnFavoritar").addEventListener("click", favoritar);
document.getElementById("btnDesfavoritar").addEventListener("click", desfavoritar);
document.getElementById("btnListar").addEventListener("click", listarFavoritos);
```

Repare que as três funções seguem exatamente a mesma estrutura das quatro do exemplo da aula: monta a URL, chama `fetch` com o método certo, confere `resposta.ok`, lê (ou não) o corpo e trata a falha no `catch`.

> [!NOTE]
> Se o `POST` de favoritar responder `411 (Length Required)`, acrescente `headers: { "Content-Type": "application/json" }` e `body: ""` às opções — alguns servidores exigem que todo `POST` declare o tamanho do corpo, mesmo quando ele está vazio.

</details>
