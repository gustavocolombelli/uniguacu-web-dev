# Exercícios — Aula 10

[Desenvolvimento Web](../../README.md) > [Aula 10](../aula-10.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 10](../aula-10.md): JSON, `JSON.parse`/`JSON.stringify`, requisições HTTP com `fetch()`, `async`/`await` e tratamento de exceções com `try`/`catch`.

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

Uma pessoa escreve o código abaixo para consultar um CEP, testa com um CEP de 8 números que não existe (ex.: `99999999`), e o `catch` nunca é executado — mesmo a API não encontrando o endereço.

```js
try {
  const resposta = await fetch("https://viacep.com.br/ws/99999999/json/");

  if (!resposta.ok) {
    throw new Error("CEP inválido.");
  }

  const dados = await resposta.json();
  console.log(dados);
} catch (erro) {
  console.log("Erro:", erro.message);
}
```

Por que o `catch` não é acionado, mesmo o CEP não existindo?

- **A.** Porque a ViaCEP nunca devolve erro para nenhum CEP.
- **B.** Porque `resposta.ok` é `true` (a ViaCEP devolve status `200` mesmo para um CEP formatado corretamente mas inexistente), e o código nunca verifica `dados.erro`.
- **C.** Porque falta `await` antes de `resposta.json()`.
- **D.** Porque `throw new Error` só funciona dentro de um `if`, e o `if` desse código está errado.

<details>
<summary>Resposta</summary>

Alternativa **B**. Como a Aula 10 (seção 2.8) mostra, a ViaCEP devolve status `200` — e portanto `resposta.ok` igual a `true` — mesmo quando o CEP tem 8 dígitos válidos mas não corresponde a nenhum endereço real; nesse caso, o corpo da resposta vem como `{"erro": true}`. O código do exercício só verifica `resposta.ok`, então nunca detecta esse tipo de erro. Faltaria um segundo `if (dados.erro) { throw new Error(...) }`, depois de ler `dados`. A alternativa C está errada porque o `await` já está presente antes de `resposta.json()`.

> [!IMPORTANT]
> Status HTTP de sucesso (`resposta.ok` verdadeiro) não é garantia de que os dados recebidos são o que você esperava — sempre vale checar o conteúdo também.

</details>

---

**1.** Dado o texto JSON abaixo, escreva a linha de código que o converte num objeto JavaScript chamado `produto`.

```js
let textoJSON = '{"nome": "Caderno", "preco": 15}';
```

<details>
<summary>Sugestão de solução</summary>

```js
let produto = JSON.parse(textoJSON);
```

`JSON.parse` converte o texto (string) em objeto — depois disso, `produto.nome` e `produto.preco` já podem ser acessados com notação de ponto.

</details>

---

**2.** Dado o objeto abaixo, escreva a linha de código que o converte para texto JSON.

```js
let aluno = {
  nome: "Carlos",
  idade: 20
};
```

<details>
<summary>Sugestão de solução</summary>

```js
JSON.stringify(aluno);
```

Devolve o texto `'{"nome":"Carlos","idade":20}'`.

</details>

---

**3.** O JSON abaixo tem dois erros de sintaxe que o impedem de ser interpretado corretamente por `JSON.parse`. Identifique e corrija os dois.

```json
{
  nome: 'Ana',
  idade: 25,
}
```

<details>
<summary>Sugestão de solução</summary>

```json
{
  "nome": "Ana",
  "idade": 25
}
```

- `nome` precisa de aspas duplas ao redor da chave: `"nome"`.
- `'Ana'` precisa trocar aspas simples por aspas duplas: `"Ana"`.
- A vírgula depois de `25` (antes do `}`) precisa ser removida — JSON não aceita vírgula sobrando no final.

</details>

---

**4.** Complete a função abaixo para que ela busque os dados de `https://viacep.com.br/ws/01310930/json/` e imprima o campo `localidade` no console, usando `async`/`await`.

```js
async function buscarCidade() {
  // complete aqui
}
```

<details>
<summary>Sugestão de solução</summary>

```js
async function buscarCidade() {
  const resposta = await fetch("https://viacep.com.br/ws/01310930/json/");
  const dados = await resposta.json();
  console.log(dados.localidade);
}
```

`await fetch(...)` espera a requisição terminar; `await resposta.json()` espera o corpo ser lido e já convertido de JSON para objeto.

</details>

---

**5.** O código abaixo não trata nenhum tipo de erro. Reescreva-o adicionando `try`/`catch`, de forma que, se `resposta.ok` for falso, um erro seja lançado com a mensagem `"Falha na requisição"` e capturado, imprimindo essa mensagem no console.

```js
async function buscarCep(cep) {
  const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
  const dados = await resposta.json();
  console.log(dados);
}
```

<details>
<summary>Sugestão de solução</summary>

```js
async function buscarCep(cep) {
  try {
    const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");

    if (!resposta.ok) {
      throw new Error("Falha na requisição");
    }

    const dados = await resposta.json();
    console.log(dados);
  } catch (erro) {
    console.log(erro.message);
  }
}
```

</details>

---

**6.** Classifique cada situação abaixo como algo que é pego por `!resposta.ok`, por uma checagem de `dados.erro`, ou por nenhuma das duas (nesse caso, explique por quê):

```
a) CEP com letras, ex.: "abc12345"
b) CEP com 8 números, mas que não corresponde a nenhum endereço real
c) CEP com 8 números, correto e existente
d) Sem conexão com a internet no momento da busca
```

<details>
<summary>Sugestão de solução</summary>

- **a)** `!resposta.ok` — a ViaCEP devolve status `400` para CEP mal formatado.
- **b)** checagem de `dados.erro` — a ViaCEP devolve status `200` (então `resposta.ok` é `true`), mas o corpo vem como `{"erro": true}`.
- **c)** nenhuma das duas — é o caminho de sucesso, sem erro nenhum a tratar.
- **d)** nenhuma das duas diretamente — uma falha de rede faz a própria Promise do `fetch` ser rejeitada, o que cai direto no `catch`, sem nunca chegar a ter uma `resposta` para checar `.ok`.

</details>

---

**7.** O código abaixo lança um erro sempre, mesmo quando a busca dá certo. Identifique o problema.

```js
async function buscarCep(cep) {
  try {
    const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    const dados = await resposta.json();

    if (dados.logradouro) {
      throw new Error("CEP não encontrado.");
    }

    console.log(dados);
  } catch (erro) {
    console.log(erro.message);
  }
}
```

<details>
<summary>Sugestão de solução</summary>

A condição está invertida: `if (dados.logradouro)` lança o erro justamente quando a busca **deu certo** (quando existe um `logradouro` nos dados). O correto é verificar `if (dados.erro)` — o campo que a ViaCEP usa para sinalizar que o CEP não foi encontrado (seção 2.9 da Aula 10), não `dados.logradouro`.

```js
if (dados.erro) {
  throw new Error("CEP não encontrado.");
}
```

</details>

---

**8.** Dado o HTML abaixo, complete o script para que, ao clicar no botão, o texto do parágrafo `#saida` seja atualizado para `"Carregando..."` antes da busca, e para o resultado (ou uma mensagem de erro) depois.

```html
<button id="botaoBuscar">Buscar CEP 01310930</button>
<p id="saida"></p>

<script>
  const botao = document.getElementById("botaoBuscar");
  const saida = document.getElementById("saida");

  botao.addEventListener("click", async function () {
    // complete aqui
  });
</script>
```

<details>
<summary>Sugestão de solução</summary>

```js
botao.addEventListener("click", async function () {
  saida.textContent = "Carregando...";

  try {
    const resposta = await fetch("https://viacep.com.br/ws/01310930/json/");

    if (!resposta.ok) {
      throw new Error("CEP inválido.");
    }

    const dados = await resposta.json();

    if (dados.erro) {
      throw new Error("CEP não encontrado.");
    }

    saida.textContent = dados.logradouro + " - " + dados.localidade + "/" + dados.uf;
  } catch (erro) {
    saida.textContent = "Erro: " + erro.message;
  }
});
```

</details>

---

## Desafios

**9.** Crie uma função `buscarEnderecoCompleto(cep)` que busca um CEP na ViaCEP e devolve (com `return`) um objeto só com os campos `rua`, `bairro`, `cidade` e `estado`, remapeados a partir de `logradouro`, `bairro`, `localidade` e `uf`. A função deve tratar os dois cenários de erro da Aula 10 (CEP mal formatado e CEP inexistente) lançando um erro com `throw new Error(...)` em cada caso, sem tentar montar o objeto quando a busca falhar.

<details>
<summary>Sugestão de solução</summary>

```js
async function buscarEnderecoCompleto(cep) {
  const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");

  if (!resposta.ok) {
    throw new Error("CEP inválido.");
  }

  const dados = await resposta.json();

  if (dados.erro) {
    throw new Error("CEP não encontrado.");
  }

  return {
    rua: dados.logradouro,
    bairro: dados.bairro,
    cidade: dados.localidade,
    estado: dados.uf
  };
}

// uso:
try {
  const endereco = await buscarEnderecoCompleto("01310930");
  console.log(endereco);
} catch (erro) {
  console.log(erro.message);
}
```

Repare que quem lança os erros é `buscarEnderecoCompleto`, mas quem captura (`try`/`catch`) é o código que a chama — a função só lança, sem precisar de um `try`/`catch` interno próprio para isso.

</details>

---

**10.** Construa, do zero, um formulário HTML com um campo de texto e um botão, que consulte a ViaCEP para o CEP digitado e exiba na tela, separadamente:

- Um parágrafo com o endereço formatado (`logradouro, bairro - cidade/UF`), visível só em caso de sucesso.
- Um parágrafo com uma mensagem de erro amigável, visível só em caso de falha — cobrindo tanto CEP mal formatado quanto CEP inexistente.

Dica: use `try`/`catch` para decidir qual dos dois parágrafos preencher, e lembre de limpar (`textContent = ""`) o parágrafo que não deve aparecer em cada tentativa.

<details>
<summary>Sugestão de solução</summary>

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Consulta de CEP</title>
</head>
<body>
  <form id="formCep">
    <input type="text" id="cep" maxlength="8" required>
    <button type="submit">Buscar</button>
  </form>

  <p id="sucesso"></p>
  <p id="erro"></p>

  <script>
    const formulario = document.getElementById("formCep");
    const paragrafoSucesso = document.getElementById("sucesso");
    const paragrafoErro = document.getElementById("erro");

    formulario.addEventListener("submit", async function (evento) {
      evento.preventDefault();

      paragrafoSucesso.textContent = "";
      paragrafoErro.textContent = "";

      const cep = document.getElementById("cep").value;

      try {
        const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");

        if (!resposta.ok) {
          throw new Error("CEP inválido. Digite 8 números.");
        }

        const dados = await resposta.json();

        if (dados.erro) {
          throw new Error("CEP não encontrado.");
        }

        paragrafoSucesso.textContent = dados.logradouro + ", " + dados.bairro + " - " + dados.localidade + "/" + dados.uf;
      } catch (erro) {
        paragrafoErro.textContent = erro.message;
      }
    });
  </script>
</body>
</html>
```

</details>

