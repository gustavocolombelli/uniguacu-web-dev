# Exercícios de Reforço — Aula 01

Lista complementar de exercícios práticos, baseada inteiramente no conteúdo da [Aula 01](aula-01.md): fundamentos da web (internet, cliente-servidor, URL) e os primeiros passos em JavaScript (variáveis, tipos de dados e operadores).

Tente resolver cada exercício sozinho, no console do navegador, antes de abrir a sugestão de solução.

---

## Exercícios fáceis

**1.** Declare uma variável `cidade` do tipo string com o nome da sua cidade e exiba-a no console.
<details>
<summary>Sugestão de solução</summary>

```js
let cidade = "Curitiba";
console.log(cidade);
```

</details>

---

**2.** Declare uma variável `anoAtual` do tipo number com o ano atual e exiba-a no console.
<details>
<summary>Sugestão de solução</summary>

```js
let anoAtual = 2026;
console.log(anoAtual);
```

</details>

---

**3.** Declare uma variável `chovendo` do tipo boolean e exiba-a no console.
<details>
<summary>Sugestão de solução</summary>

```js
let chovendo = false;
console.log(chovendo);
```

</details>

---

**4.** Antes de rodar, escreva no papel o que você acha que `typeof` vai devolver para cada linha abaixo. Depois rode e confira.

```js
let a = "10";
let b = 10;
let c = true;

console.log(typeof a);
console.log(typeof b);
console.log(typeof c);
```
<details>
<summary>Sugestão de solução</summary>

```
string
number
boolean
```

`typeof` sempre devolve o tipo do valor como texto, independentemente do que está guardado na variável.

</details>

---

**5.** Declare duas variáveis numéricas e exiba a soma delas usando o operador `+`.
<details>
<summary>Sugestão de solução</summary>

```js
let numero1 = 8;
let numero2 = 15;

console.log(numero1 + numero2);
```

</details>

---

**6.** Declare uma variável `idade` com o valor `17` e exiba no console o resultado de `idade >= 18`.
<details>
<summary>Sugestão de solução</summary>

```js
let idade = 17;
console.log(idade >= 18);
```

O resultado é `false`, pois `17` não é maior nem igual a `18`.

</details>

---

**7.** Declare duas variáveis string, `nome` e `sobrenome`, e exiba o nome completo concatenando as duas com um espaço entre elas.
<details>
<summary>Sugestão de solução</summary>

```js
let nome = "Ana";
let sobrenome = "Silva";

console.log(nome + " " + sobrenome);
```

</details>

---

**8.** As linhas abaixo estão embaralhadas. Reordene-as para formar um programa que declara o título de um livro e a quantidade de páginas, e exibe a quantidade de páginas no console.

```js
console.log(paginas);
let titulo = "Duna";
let paginas = 412;
```
<details>
<summary>Sugestão de solução</summary>

```js
let titulo = "Duna";
let paginas = 412;
console.log(paginas);
```

As duas declarações podem vir em qualquer ordem entre si (nenhuma depende da outra), mas o `console.log` precisa vir por último, já que ele exibe um valor que já precisa existir.

</details>

---

**9.** Observe a URL abaixo e identifique o protocolo, o domínio, o caminho e a query string.

```
https://www.loja-exemplo.com.br/produtos/eletronicos?ordenar=preco
```
<details>
<summary>Sugestão de solução</summary>

- **Protocolo:** `https://`
- **Domínio:** `www.loja-exemplo.com.br`
- **Caminho:** `/produtos/eletronicos`
- **Query string:** `?ordenar=preco`

</details>

---

**10.** No modelo cliente-servidor, explique com suas palavras: quem "pede" e quem "responde"? Dê um exemplo do dia a dia.
<details>
<summary>Sugestão de solução</summary>

O **cliente** (geralmente o navegador) é quem pede — ele envia uma requisição para um servidor. O **servidor** é quem responde — ele recebe o pedido e devolve o conteúdo solicitado (HTML, CSS, JS, imagens, dados etc.).

Exemplo: ao digitar o endereço de um site de notícias e apertar Enter, o navegador (cliente) envia uma requisição ao servidor do site, que responde com a página pedida.

</details>

---

**11.** Crie três variáveis para descrever um produto (`nomeProduto`, `preco` e `emEstoque`), calcule o preço com 15% de desconto usando um operador aritmético, e exiba tudo no console.
<details>
<summary>Sugestão de solução</summary>

```js
let nomeProduto = "Fone de ouvido";
let preco = 120;
let emEstoque = true;

let precoComDesconto = preco - (preco * 0.15);

console.log(nomeProduto);
console.log(precoComDesconto);
console.log(emEstoque);
```

</details>

---

**12.** Troque os valores de duas variáveis, `valorA` e `valorB`, usando uma terceira variável auxiliar, e exiba os dois valores trocados no console.
<details>
<summary>Sugestão de solução</summary>

```js
let valorA = "primeiro";
let valorB = "segundo";

let auxiliar = valorA;
valorA = valorB;
valorB = auxiliar;

console.log(valorA);
console.log(valorB);
```

A variável `auxiliar` guarda temporariamente o valor de `valorA` antes dele ser sobrescrito, para que esse valor não se perca na hora da troca.

</details>

---

**13.** Declare `dominio`, `caminho` e `parametro` como variáveis string, e monte a URL completa concatenando-as com `"https://"` na frente, exibindo o resultado final no console.
<details>
<summary>Sugestão de solução</summary>

```js
let dominio = "www.receitasfaceis.com.br";
let caminho = "/categorias";
let parametro = "?tipo=sobremesas";

let urlCompleta = "https://" + dominio + caminho + parametro;

console.log(urlCompleta);
```

</details>

---

**14.** Crie as variáveis `base` e `altura` de um retângulo, calcule a área (`base * altura`) e o perímetro (`2 * (base + altura)`), e exiba os dois resultados com frases explicativas (ex.: `"A área é: 20"`).
<details>
<summary>Sugestão de solução</summary>

```js
let base = 5;
let altura = 4;

let area = base * altura;
let perimetro = 2 * (base + altura);

console.log("A área é: " + area);
console.log("O perímetro é: " + perimetro);
```

</details>

---

**15.** Declare três variáveis de idade (`idade1`, `idade2`, `idade3`) com valores diferentes e, para cada uma, crie uma variável booleana indicando se ela é maior de idade (`>= 18`). Exiba as três variáveis booleanas no console.
<details>
<summary>Sugestão de solução</summary>

```js
let idade1 = 15;
let idade2 = 18;
let idade3 = 42;

let maiorDeIdade1 = idade1 >= 18;
let maiorDeIdade2 = idade2 >= 18;
let maiorDeIdade3 = idade3 >= 18;

console.log(maiorDeIdade1);
console.log(maiorDeIdade2);
console.log(maiorDeIdade3);
```

</details>

---

## Desafio

**16.** Monte um "cartão de visita digital" em JavaScript: declare variáveis para `nome`, `profissao`, `email` (strings) e `anosExperiencia` (number). Calcule uma variável `anosParaAposentadoria`, considerando aposentadoria aos 35 anos de experiência (`35 - anosExperiencia`). Depois, monte uma única string `cartao`, concatenando todas as informações em um formato legível (ex.: `"Ana Silva - Desenvolvedora - irineu@email.com"`), e exiba tanto o `cartao` quanto o `anosParaAposentadoria` no console. Por fim, use `typeof` para confirmar o tipo de cada uma das quatro primeiras variáveis.
<details>
<summary>Sugestão de solução</summary>

```js
// Etapa 1: declarar os dados do cartão
let nome = "Irineu Silva";
let profissao = "Desenvolvedora";
let email = "irineu@email.com";
let anosExperiencia = 6;

// Etapa 2: calcular quanto falta para a aposentadoria
let anosParaAposentadoria = 35 - anosExperiencia;

// Etapa 3: montar o cartão como uma única string
let cartao = nome + " - " + profissao + " - " + email;

// Etapa 4: exibir os resultados
console.log(cartao);
console.log(anosParaAposentadoria);

// Etapa 5: conferir os tipos de cada variável original
console.log(typeof nome);
console.log(typeof profissao);
console.log(typeof email);
console.log(typeof anosExperiencia);
```

</details>
