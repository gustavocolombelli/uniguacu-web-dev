# Exercícios — Aula 02

[Desenvolvimento Web](../../README.md) > [Aula 02](../aula-02.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 02](../aula-02.md): estruturas condicionais (`if`/`else if`/`else`), operadores lógicos, laços de repetição (`for` e `while`) e funções básicas.

Tente resolver cada exercício sozinho, no console do navegador, antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

Qual será o resultado exibido no console após a execução do trecho abaixo?

```js
let idade = 16;
let temAutorizacaoDosPais = true;

if (idade >= 18 || temAutorizacaoDosPais) {
  console.log("Pode entrar no passeio");
} else {
  console.log("Não pode entrar no passeio");
}
```

- **A.** `"Não pode entrar no passeio"`, pois `idade` não é maior ou igual a 18.
- **B.** `"Pode entrar no passeio"`, pois o operador `||` exige que **pelo menos uma** das duas condições seja verdadeira.
- **C.** Um erro de sintaxe, pois não é permitido combinar duas condições diferentes com `||`.
- **D.** `"Pode entrar no passeio"`, pois o operador `||` exige que **as duas** condições sejam verdadeiras.

<details>
<summary>Resposta</summary>

Alternativa **B**. O operador `||` (OU) resulta em `true` quando **pelo menos uma** das condições é verdadeira. Como `temAutorizacaoDosPais` é `true`, a condição inteira é `true`, mesmo `idade >= 18` sendo `false`.

> [!IMPORTANT]
> A alternativa D descreve o comportamento do `&&` (E), não do `||` (OU) — essa troca é um dos erros conceituais mais comuns ao começar a combinar condições.

</details>

---

**1.** As linhas abaixo estão embaralhadas. Reordene-as para formar um programa que declara a idade de uma pessoa e exibe se ela já pode tirar carteira de motorista (a partir de 18 anos).

```js
} else {
let idade = 18;
console.log("Ainda não pode tirar carteira");
if (idade >= 18) {
console.log("Já pode tirar carteira");
}
}
```

<details>
<summary>Sugestão de solução</summary>

```js
let idade = 18;

if (idade >= 18) {
  console.log("Já pode tirar carteira");
} else {
  console.log("Ainda não pode tirar carteira");
}
```

A declaração de `idade` vem primeiro, pois o `if` depende dela para testar a condição. O `else` só pode vir depois do bloco `if` que ele complementa, nunca antes.

</details>

---

**2.** As linhas abaixo estão embaralhadas. Reordene-as para formar um programa que simula a contagem regressiva de um lançamento de foguete, de 5 até 1, exibindo "Lançamento!" ao final.

```js
console.log("Lançamento!");
contador--;
let contador = 5;
console.log(contador);
while (contador > 0) {
}
```

<details>
<summary>Sugestão de solução</summary>

```js
let contador = 5;

while (contador > 0) {
  console.log(contador);
  contador--;
}

console.log("Lançamento!");
```

A variável `contador` precisa existir antes do `while` testar sua condição. Dentro do laço, `console.log(contador)` vem antes de `contador--` para exibir `5, 4, 3, 2, 1` (e não `4, 3, 2, 1, 0`). A mensagem final fica fora das chaves do `while`, por isso só aparece depois que o laço termina.

</details>

---

**3.** O código abaixo imprime os dias de uma semana, de "Dia 1" a "Dia 7". Modifique-o para que ele imprima apenas de "Dia 3" a "Dia 7".

```js
for (let dia = 1; dia <= 7; dia++) {
  console.log("Dia " + dia);
}
```

<details>
<summary>Sugestão de solução</summary>

```js
for (let dia = 3; dia <= 7; dia++) {
  console.log("Dia " + dia);
}
```

Basta alterar o valor inicial do contador, na parte de inicialização do `for` — a condição (`dia <= 7`) e o incremento (`dia++`) continuam os mesmos, já que só o ponto de partida da contagem mudou.

</details>

---

**4.** Sem executar o código, escreva no papel (ou em um comentário) o que será exibido no console:

```js
let tentativas = 0;

while (tentativas < 3) {
  console.log("Tentativa " + (tentativas + 1));
  tentativas++;
}
```

<details>
<summary>Sugestão de solução</summary>

```
Tentativa 1
Tentativa 2
Tentativa 3
```

`tentativas` começa em `0` e a condição `tentativas < 3` é testada antes de cada volta. O `console.log` roda antes do `tentativas++` em cada repetição, por isso a mensagem usa `tentativas + 1` para exibir "Tentativa 1", "Tentativa 2" e "Tentativa 3", mesmo `tentativas` valendo `0`, `1` e `2` internamente.

</details>

---

**5.** Leia a função abaixo e responda: qual texto ela retorna quando chamada com `classificarTemperatura(15)`?

```js
function classificarTemperatura(graus) {
  if (graus <= 10) {
    return "Frio";
  } else if (graus <= 25) {
    return "Ameno";
  } else {
    return "Quente";
  }
}
```

<details>
<summary>Sugestão de solução</summary>

`"Ameno"`.

As condições são testadas em ordem: `graus <= 10` é `false` para `15`, então o JavaScript passa para o `else if`. `graus <= 25` é `true` para `15`, então a função retorna `"Ameno"` e para por ali — o `else` final nem chega a ser avaliado.

</details>

---

**6.** Sem executar o código, responda: o que será exibido no console?

```js
let idade = 20;
let temIngressoVip = false;
let convidadoEspecial = true;

if ((idade >= 18 && temIngressoVip) || convidadoEspecial) {
  console.log("Acesso liberado à área VIP");
} else {
  console.log("Acesso negado");
}
```

<details>
<summary>Sugestão de solução</summary>

`"Acesso liberado à área VIP"`.

A parte `(idade >= 18 && temIngressoVip)` é `false`, pois `temIngressoVip` é `false` — e o `&&` exige que as duas condições sejam verdadeiras. Mas o `||` que vem depois só precisa de **uma** das duas partes ser verdadeira, e `convidadoEspecial` é `true`. Por isso o acesso é liberado, mesmo sem o ingresso VIP.

</details>

---

**7.** Sem executar o código, escreva quais números serão exibidos no console:

```js
for (let dia = 1; dia <= 10; dia++) {
  if (dia % 3 === 0) {
    console.log("Promoção relâmpago no dia " + dia);
  }
}
```

<details>
<summary>Sugestão de solução</summary>

```
Promoção relâmpago no dia 3
Promoção relâmpago no dia 6
Promoção relâmpago no dia 9
```

O operador `%` devolve o resto da divisão. `dia % 3 === 0` só é verdadeiro quando `dia` é múltiplo de 3 — ou seja, quando a divisão por 3 não deixa resto. Entre 1 e 10, isso acontece em 3, 6 e 9.

</details>

---

**8.** A função abaixo calcula o valor do frete de uma compra, mas ainda não tem frete grátis para compras a partir de R$ 200. Modifique-a para que, quando `valorCompra` for maior ou igual a 200, o frete retornado seja `0`.

```js
function calcularFrete(valorCompra) {
  if (valorCompra >= 100) {
    return 15;
  } else {
    return 25;
  }
}
```

<details>
<summary>Sugestão de solução</summary>

```js
function calcularFrete(valorCompra) {
  if (valorCompra >= 200) {
    return 0;
  } else if (valorCompra >= 100) {
    return 15;
  } else {
    return 25;
  }
}
```

A nova condição precisa ser testada **antes** das outras duas: como as condições são avaliadas de cima para baixo e a primeira verdadeira "vence", colocá-la depois faria `valorCompra >= 100` capturar compras de 200 ou mais antes de chegar à condição de frete grátis.

</details>

---

**9.** A função abaixo classifica a faixa etária de uma pessoa, mas ainda não diferencia adolescentes de adultos. Modifique-a para que idades de 13 a 17 (incluindo os dois extremos) retornem `"Adolescente"`.

```js
function classificarFaixaEtaria(idade) {
  if (idade < 13) {
    return "Criança";
  } else {
    return "Adulto";
  }
}
```

<details>
<summary>Sugestão de solução</summary>

```js
function classificarFaixaEtaria(idade) {
  if (idade < 13) {
    return "Criança";
  } else if (idade <= 17) {
    return "Adolescente";
  } else {
    return "Adulto";
  }
}
```

Como a primeira condição (`idade < 13`) já cobre as crianças, o `else if (idade <= 17)` só precisa verificar o limite superior da adolescência — quem chegou até aqui já tem 13 anos ou mais.

</details>

---

**10.** Crie uma função chamada `temFreteGratis` que recebe o valor de uma compra (`valorCompra`) e retorna `true` se o valor for maior ou igual a R$ 200, ou `false` caso contrário.

<details>
<summary>Sugestão de solução</summary>

```js
function temFreteGratis(valorCompra) {
  if (valorCompra >= 200) {
    return true;
  } else {
    return false;
  }
}

console.log(temFreteGratis(250)); // true
console.log(temFreteGratis(80));  // false
```

</details>

---

**11.** Escreva um `for` que exiba uma contagem regressiva de 10 até 1 no console e, ao final do laço (fora dele), exiba a mensagem `"Feliz Ano Novo!"`.

<details>
<summary>Sugestão de solução</summary>

```js
for (let contador = 10; contador >= 1; contador--) {
  console.log(contador);
}

console.log("Feliz Ano Novo!");
```

O contador começa em `10` e diminui a cada volta (`contador--`), continuando enquanto `contador >= 1`. A mensagem final fica fora das chaves do `for`, por isso só executa uma vez, depois que o laço termina.

</details>

---

**12.** Simule um sistema de tentativas de login: declare uma variável `tentativas = 0` e, usando `while`, incremente `tentativas` até chegar a `3`, exibindo no console uma mensagem diferente a cada tentativa (ex.: `"Tentativa 1 de 3"`). Ao final do laço, exiba `"Número máximo de tentativas atingido"`.

<details>
<summary>Sugestão de solução</summary>

```js
let tentativas = 0;

while (tentativas < 3) {
  tentativas++;
  console.log("Tentativa " + tentativas + " de 3");
}

console.log("Número máximo de tentativas atingido");
```

Aqui `tentativas++` roda antes do `console.log`, para que a mensagem já exiba `1`, `2` e `3` diretamente. Sem incrementar `tentativas` dentro do laço, a condição `tentativas < 3` nunca se tornaria falsa, e o `while` rodaria para sempre (loop infinito).

</details>

---

**13.** Crie uma função chamada `podeParticiparMaratona` que recebe dois parâmetros, `idade` e `fezExameMedico` (um booleano), e retorna `true` somente se a idade for maior ou igual a 16 **e** `fezExameMedico` for `true`. Em qualquer outro caso, deve retornar `false`.

<details>
<summary>Sugestão de solução</summary>

```js
function podeParticiparMaratona(idade, fezExameMedico) {
  if (idade >= 16 && fezExameMedico) {
    return true;
  } else {
    return false;
  }
}

console.log(podeParticiparMaratona(20, true));  // true
console.log(podeParticiparMaratona(20, false)); // false
console.log(podeParticiparMaratona(14, true));  // false
```

O `&&` garante que as duas exigências precisam ser verdadeiras ao mesmo tempo — basta uma delas falhar (idade insuficiente ou exame não feito) para a função retornar `false`.

</details>
