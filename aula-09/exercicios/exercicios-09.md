# Exercícios — Aula 09

[Desenvolvimento Web](../../README.md) > [Aula 09](../aula-09.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 09](../aula-09.md): objetos literais, atributos, métodos e `this`.

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

Uma pessoa escreve o seguinte código e não entende por que a última linha imprime `undefined` em vez do nome:

```js
let pessoa = {
  nome: "Ana",
  idade: 25
};

console.log(pessoa.getNome);
```

O que está acontecendo?

- **A.** `pessoa` não tem nenhum método chamado `getNome`, então `pessoa.getNome` não existe — o resultado correto seria mesmo `undefined`.
- **B.** Falta colocar `()` depois de `getNome` para o JavaScript conseguir encontrar a propriedade.
- **C.** `nome` deveria se chamar `getNome` para essa linha funcionar.
- **D.** O objeto está com erro de sintaxe e nem deveria rodar.

<details>
<summary>Resposta</summary>

Alternativa **A**. O objeto `pessoa` só tem dois atributos: `nome` e `idade`. Não existe nenhuma propriedade chamada `getNome` — nem como atributo, nem como método. `pessoa.getNome` tenta acessar uma propriedade que não foi definida, e o JavaScript devolve `undefined` para qualquer propriedade inexistente (o mesmo aconteceria com `pessoa.qualquerCoisa`). Colocar `()` (alternativa B) não resolveria nada, porque não há função nenhuma ali para ser chamada — o problema não é a chamada, é a propriedade não existir.

> [!IMPORTANT]
> `undefined` ao acessar uma propriedade quase sempre significa "essa propriedade não existe nesse objeto" — geralmente por erro de digitação no nome, ou porque ela nunca foi criada.

</details>

---

**1.** Dado o objeto abaixo, escreva a linha de código que imprime o valor de `idade` no console.

```js
let aluno = {
  nome: "Carlos",
  idade: 20
};
```

<details>
<summary>Sugestão de solução</summary>

```js
console.log(aluno.idade);
```

Notação de ponto: `objeto.propriedade`, sem parênteses, porque `idade` é um atributo, não um método.

</details>

---

**2.** Dado o mesmo objeto `aluno` do exercício 1, escreva a linha de código que altera `idade` para `21`.

<details>
<summary>Sugestão de solução</summary>

```js
aluno.idade = 21;
```

Igual a atribuir um novo valor a uma variável comum — só que aqui o "nome" é `aluno.idade`.

</details>

---

**3.** O código abaixo não imprime o que a pessoa esperava. Identifique o erro e corrija.

```js
let produto = {
  nome: "Caderno",
  preco: 15,
  getPreco() {
    return this.preco;
  }
};

console.log(produto.getPreco);
```

<details>
<summary>Sugestão de solução</summary>

```js
console.log(produto.getPreco());
```

Faltam os parênteses `()` na chamada. Sem eles, `produto.getPreco` é só uma referência ao método (o "molde" da função), e o `console.log` imprime a definição da função em vez do valor `15` que ela devolveria se fosse chamada.

</details>

---

**4.** Complete o método `getNome` abaixo para que ele devolva o valor do atributo `nome` do próprio objeto, usando `this` (não digite `"Beatriz"` direto no `return`).

```js
let pessoa = {
  nome: "Beatriz",
  idade: 30,
  getNome() {
    // complete aqui
  }
};
```

<details>
<summary>Sugestão de solução</summary>

```js
let pessoa = {
  nome: "Beatriz",
  idade: 30,
  getNome() {
    return this.nome;
  }
};
```

Usando `this.nome` em vez de `"Beatriz"` fixo, o método continua correto mesmo que `pessoa.nome` seja alterado depois.

</details>

---

**5.** Classifique cada linha abaixo como **atributo** ou **método**, considerando o objeto `pessoa` da Aula 09 (com `nome`, `idade`, `getNome()` e `getIdade()`):

```js
a) pessoa.nome
b) pessoa.getIdade()
c) pessoa.idade
d) pessoa.getNome()
```

<details>
<summary>Sugestão de solução</summary>

- **a)** `pessoa.nome` — atributo (sem parênteses, é um dado).
- **b)** `pessoa.getIdade()` — método (tem parênteses, executa uma ação).
- **c)** `pessoa.idade` — atributo.
- **d)** `pessoa.getNome()` — método.

A regra prática: parênteses `()` no final indicam um método sendo chamado.

</details>

---

**6.** Crie, do zero, um objeto `livro` com os atributos `titulo` (texto) e `paginas` (número), e um método `getResumo()` que devolve um texto no formato `"Título tem X páginas"` — usando `this` para ler os dois atributos (não digite os valores fixos dentro do método).

<details>
<summary>Sugestão de solução</summary>

```js
let livro = {
  titulo: "O Hobbit",
  paginas: 310,
  getResumo() {
    return this.titulo + " tem " + this.paginas + " páginas";
  }
};

console.log(livro.getResumo()); // "O Hobbit tem 310 páginas"
```

</details>

---

**7.** O código abaixo tenta usar `this` fora de um método, e não funciona como a pessoa esperava. Explique, em uma frase, por que isso acontece (dica: releia a seção 2.5 da Aula 09).

```js
let pessoa = {
  nome: "Ana"
};

console.log(this.nome);
```

<details>
<summary>Sugestão de solução</summary>

`this` só é resolvido para o objeto que está chamando um método *quando usado dentro de um método daquele objeto*. Fora de qualquer método — como no `console.log(this.nome)` do exemplo, que está solto no código, não dentro de nenhuma função de `pessoa` — `this` não aponta para `pessoa`, então `this.nome` não devolve `"Ana"`. Para ler `nome` de fora do objeto, o correto é `pessoa.nome`, não `this.nome`.

</details>

---

**8.** Dado o objeto abaixo, qual é o valor impresso em cada `console.log`? Responda antes de rodar o código.

```js
let conta = {
  saldo: 100,
  getSaldo() {
    return this.saldo;
  }
};

console.log(conta.getSaldo());
conta.saldo = 250;
console.log(conta.getSaldo());
```

<details>
<summary>Sugestão de solução</summary>

```
100
250
```

O primeiro `conta.getSaldo()` lê `this.saldo` quando ele ainda vale `100`. Depois de `conta.saldo = 250;` alterar o atributo, o segundo `conta.getSaldo()` lê `this.saldo` de novo — e como o método não guarda nenhuma cópia antiga, o novo valor (`250`) é o que aparece.

</details>

---

## Desafios

**9.** Crie um objeto `produto` com os atributos `nome`, `preco` e `quantidadeEmEstoque`, e dois métodos:

- `getValorTotalEstoque()` — devolve `preco` multiplicado por `quantidadeEmEstoque`.
- `getDescricao()` — devolve um texto no formato `"Nome: R$ Preco"` (ex.: `"Caderno: R$ 15"`).

Chame os dois métodos e confira os resultados no console.

<details>
<summary>Sugestão de solução</summary>

```js
let produto = {
  nome: "Caderno",
  preco: 15,
  quantidadeEmEstoque: 40,
  getValorTotalEstoque() {
    return this.preco * this.quantidadeEmEstoque;
  },
  getDescricao() {
    return this.nome + ": R$ " + this.preco;
  }
};

console.log(produto.getValorTotalEstoque()); // 600
console.log(produto.getDescricao());         // "Caderno: R$ 15"
```

</details>

---

**10.** Crie dois objetos independentes, `pessoa1` e `pessoa2`, cada um com `nome`, `idade` e um método `getApresentacao()` que devolve um texto no formato `"Oi, eu sou Nome e tenho Idade anos"`. Chame `getApresentacao()` nos dois objetos e confirme que cada um imprime seus próprios dados, sem misturar um com o outro.

<details>
<summary>Sugestão de solução</summary>

```js
let pessoa1 = {
  nome: "Ana",
  idade: 25,
  getApresentacao() {
    return "Oi, eu sou " + this.nome + " e tenho " + this.idade + " anos";
  }
};

let pessoa2 = {
  nome: "Bruno",
  idade: 30,
  getApresentacao() {
    return "Oi, eu sou " + this.nome + " e tenho " + this.idade + " anos";
  }
};

console.log(pessoa1.getApresentacao()); // "Oi, eu sou Ana e tenho 25 anos"
console.log(pessoa2.getApresentacao()); // "Oi, eu sou Bruno e tenho 30 anos"
```

Mesmo os dois métodos sendo escritos com o código idêntico, `this` dentro de cada um aponta para o objeto que fez a chamada — `this` em `pessoa1.getApresentacao()` é `pessoa1`; em `pessoa2.getApresentacao()` é `pessoa2`. É por isso que os dois não se misturam.

</details>

