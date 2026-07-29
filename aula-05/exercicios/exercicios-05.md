# Exercícios — Aula 05

[Desenvolvimento Web](../../README.md) > [Aula 05](../aula-05.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 05](../aula-05.md): seletores CSS, especificidade, box model, cores, tipografia e unidades de medida (`px`, `%`, `rem`).

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

Um parágrafo tem `class="destaque"` e as duas regras abaixo estão na mesma folha de estilo, nessa ordem:

```css
p { color: blue; }
.destaque { color: red; }
```

Qual cor o texto desse parágrafo vai exibir, e por quê?

- **A.** Azul, porque o seletor de tipo (`p`) é mais específico que um seletor de classe.
- **B.** Vermelho, porque um seletor de classe tem especificidade maior que um seletor de tipo.
- **C.** Uma mistura entre azul e vermelho, já que o navegador combina as duas regras conflitantes.
- **D.** Vermelho, mas só porque `.destaque` foi declarada depois de `p` no arquivo — se a ordem fosse invertida, o azul venceria.

<details>
<summary>Resposta</summary>

Alternativa **B**. Um seletor de classe (especificidade 0-1-0) sempre vence um seletor de tipo (especificidade 0-0-1), independente da ordem em que as regras aparecem no arquivo.

> [!IMPORTANT]
> A alternativa D é um erro conceitual comum: a ordem no arquivo só decide o vencedor quando as regras têm a **mesma** especificidade (empate). Aqui não há empate — `.destaque` já venceria mesmo declarada antes de `p`.

</details>

---

**1.** As linhas abaixo estão embaralhadas. Reordene-as para formar uma regra CSS válida que selecione todo `<span>` dentro de um elemento com classe `.alerta`, deixando o texto vermelho e em negrito.

```css
}
color: red;
.alerta span {
font-weight: bold;
```

<details>
<summary>Sugestão de solução</summary>

```css
.alerta span {
color: red;
font-weight: bold;
}
```

O seletor com combinador descendente (`.alerta span`) sempre abre o bloco antes de qualquer declaração, e a chave de fechamento (`}`) só pode vir depois de todas elas.

</details>

---

**2.** As três regras abaixo têm exatamente a mesma especificidade (mesmo seletor de tipo `p`). Reordene-as de forma que, no final, o parágrafo apareça com a cor **verde**.

```css
p { color: green; }
p { color: red; }
p { color: blue; }
```

<details>
<summary>Sugestão de solução</summary>

```css
p { color: red; }
p { color: blue; }
p { color: green; }
```

Quando duas ou mais regras têm a mesma especificidade, vence a que foi declarada **por último** no arquivo — por isso a regra verde precisa ficar na última posição.

</details>

---

**3.** Um botão tem `style="background-color: gray;"` diretamente no HTML, e também é afetado por esta regra em um arquivo `.css` externo:

```css
#botao-principal {
  background-color: blue;
}
```

Sem testar no navegador, explique qual cor de fundo o botão vai exibir.

<details>
<summary>Sugestão de solução</summary>

Cinza. Um estilo `inline` (escrito direto no atributo `style`) tem especificidade maior que qualquer seletor de id, classe ou tipo em um arquivo `.css` — ele só perde para uma regra com `!important`.

</details>

---

**4.** Dado o CSS abaixo, sem `box-sizing: border-box`, calcule a largura total renderizada do elemento (content + padding + border, dos dois lados).

```css
.cartao {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}
```

<details>
<summary>Sugestão de solução</summary>

`200 + (20 × 2) + (5 × 2) = 250px`. Por padrão (`box-sizing: content-box`), `width` define só a área de conteúdo — padding e borda são somados por fora dela, dos dois lados.

</details>

---

**5.** O card abaixo deveria ocupar exatamente 300px de largura total, mas está "estourando" esse limite por causa do padding e da borda. Corrija sem alterar o valor de `width`.

```css
.cartao-produto {
  width: 300px;
  padding: 24px;
  border: 2px solid #D1D5DB;
}
```

<details>
<summary>Sugestão de solução</summary>

```css
.cartao-produto {
  box-sizing: border-box;
  width: 300px;
  padding: 24px;
  border: 2px solid #D1D5DB;
}
```

Com `box-sizing: border-box`, o navegador passa a encaixar o padding e a borda **dentro** dos 300px declarados, em vez de somá-los por fora.

</details>

---

**6.** Reescreva a cor `#16A34A` no formato `rgb()`, convertendo cada par hexadecimal para o decimal correspondente (`16` → `22`, `A3` → `163`, `4A` → `74`).

<details>
<summary>Sugestão de solução</summary>

```css
color: rgb(22, 163, 74);
```

`#16A34A` e `rgb(22, 163, 74)` representam exatamente a mesma cor — hexadecimal e `rgb()` são só bases numéricas diferentes para os mesmos três canais (vermelho, verde, azul).

</details>

---

**7.** Considerando que o `<html>` da página usa o `font-size` padrão do navegador (`16px`), converta os valores abaixo, hoje em `px`, para `rem`: (a) `32px`, (b) `8px`, (c) `24px`.

<details>
<summary>Sugestão de solução</summary>

(a) `32 ÷ 16 = 2rem`
(b) `8 ÷ 16 = 0.5rem`
(c) `24 ÷ 16 = 1.5rem`

`rem` sempre divide o valor desejado pelo `font-size` do elemento raiz (`<html>`) — com a base padrão de `16px`, basta dividir o valor em pixels por 16.

</details>

---

**8.** A declaração abaixo não tem nenhuma família de fonte genérica como último recurso. Corrija, adicionando uma.

```css
h1 {
  font-family: "Poppins";
}
```

<details>
<summary>Sugestão de solução</summary>

```css
h1 {
  font-family: "Poppins", sans-serif;
}
```

Se "Poppins" não estiver instalada no dispositivo do visitante, o navegador cai para a família genérica declarada por último — sem ela, o resultado fica imprevisível, dependendo da fonte padrão de cada navegador/sistema.

</details>

---

**9.** A regra abaixo usa um seletor de tipo (`input`) tão amplo que afeta **todos** os campos da página, inclusive os de um formulário de busca que já existe em outro lugar do site. Reescreva usando um seletor de classe para restringir o efeito só aos campos do formulário de cadastro.

```html
<form class="formulario-cadastro">
  <input type="text" name="nome">
</form>
```

```css
input {
  border: 1px solid #9CA3AF;
  padding: 0.5rem;
}
```

<details>
<summary>Sugestão de solução</summary>

```css
.formulario-cadastro input {
  border: 1px solid #9CA3AF;
  padding: 0.5rem;
}
```

O combinador descendente (`.formulario-cadastro input`) restringe a regra aos `input` que estejam dentro do formulário de cadastro, sem alterar nenhum campo fora dele.

</details>

---

## Desafios

**10.** Crie uma seção "Sobre mim" (`<section class="sobre-mim">`) com um título, um parágrafo de biografia curta e uma foto. Estilize com: uma cor de fundo à sua escolha, `padding` e `border-radius` para formar um cartão, `font-size` do título em `rem` e `line-height` no parágrafo para melhorar a legibilidade.

<details>
<summary>Sugestão de solução</summary>

```html
<section class="sobre-mim">
  <h2>Sobre mim</h2>
  <img src="foto-perfil.jpg" alt="Foto de perfil">
  <p>Estudante de Engenharia de Software, apaixonado por front-end e por transformar ideias em interfaces reais.</p>
</section>
```

```css
.sobre-mim {
  background-color: #F3F4F6;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 400px;
}

.sobre-mim h2 {
  font-size: 1.5rem;
}

.sobre-mim p {
  line-height: 1.6;
}
```

O container usa `padding` + `border-radius` para virar um cartão visualmente separado do resto da página, e o `line-height` maior no parágrafo evita que as linhas do texto fiquem "grudadas" umas nas outras.

</details>

---

**11.** Crie três classes de botão — `.botao-primario`, `.botao-secundario` e `.botao-perigo` — cada uma com uma cor de fundo distinta, mas todas compartilhando o mesmo box model (mesmo `padding`, `border-radius` e ausência de `border`).

<details>
<summary>Sugestão de solução</summary>

```css
.botao-primario,
.botao-secundario,
.botao-perigo {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  color: white;
}

.botao-primario {
  background-color: #2563EB;
}

.botao-secundario {
  background-color: #4B5563;
}

.botao-perigo {
  background-color: #DC2626;
}
```

O seletor de agrupamento (`.botao-primario, .botao-secundario, .botao-perigo`) evita repetir três vezes o mesmo box model — só a cor de fundo muda entre as regras específicas de cada classe.

</details>

---

**12.** Retome o formulário de inscrição estilizado na seção 4 da aula. Adicione uma regra para o `<fieldset>` de participação (visto na aula 04) com `border`, `border-radius` e `padding`, usando pelo menos uma vez cada uma das três unidades vistas hoje (`px`, `%`, `rem`) em propriedades diferentes.

<details>
<summary>Sugestão de solução</summary>

```css
.formulario-inscricao fieldset {
  width: 100%;
  padding: 1rem;
  border: 1px solid #9CA3AF;
  border-radius: 8px;
  margin-bottom: 12px;
}
```

`width: 100%` (relativo ao formulário pai) mantém o `fieldset` alinhado com os demais campos, `padding: 1rem` (relativo à raiz) acompanha o espaçamento do restante do formulário, e `margin-bottom: 12px` (absoluto) garante uma distância fixa até o próximo elemento, independente do tamanho da tela.

</details>

---

**13.** Crie uma pequena ficha de perfil (`nome`, `cargo` e `bio`) escolhendo deliberadamente uma unidade diferente para cada uma destas três propriedades — `width` do cartão, `font-size` do nome e `padding` interno —, e explique em uma frase por que escolheu cada unidade.

<details>
<summary>Sugestão de solução</summary>

```css
.ficha-perfil {
  width: 80%;       /* % — acompanha a largura do container pai em qualquer tela */
  padding: 1.25rem;  /* rem — mantém a proporção com o restante da tipografia da página */
}

.ficha-perfil .nome {
  font-size: 20px;   /* px — tamanho fixo, intencionalmente igual em qualquer contexto */
}
```

`width` em `%` porque o cartão deve se adaptar ao espaço do container onde for inserido; `padding` em `rem` porque deve crescer/encolher junto com a tipografia geral do site; `font-size` do nome em `px` porque, nesse caso, a intenção é manter um tamanho exato, sem depender do `font-size` da raiz.

</details>
