# Exercícios — Aula 06

[Desenvolvimento Web](../../README.md) > [Aula 06](../aula-06.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 06](../aula-06.md): ativação do Flexbox, eixo principal e transversal, `justify-content`, `align-items`/`align-self`, `flex-wrap`, `gap` e as propriedades de crescimento (`flex-grow`, `flex-shrink`, `flex-basis`).

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

Um flex container tem `flex-direction: column`. Dentro dele, os itens devem ficar centralizados **horizontalmente**, um embaixo do outro.

Qual propriedade faz isso?

- **A.** `justify-content: center`, porque ela sempre controla o alinhamento horizontal dos itens, independente do `flex-direction`.
- **B.** `align-items: center`, porque com `flex-direction: column` o eixo transversal passa a ser o horizontal, e é `align-items` quem atua nesse eixo.
- **C.** `text-align: center`, porque centralização horizontal é sempre uma propriedade de texto, não do Flexbox.
- **D.** Nenhuma das duas isoladamente resolve — é preciso combinar `justify-content: center` e `align-items: center` ao mesmo tempo.

<details>
<summary>Resposta</summary>

Alternativa **B**. Com `flex-direction: column`, o eixo principal passa a ser o vertical e o eixo transversal passa a ser o horizontal — por isso `align-items`, que sempre atua no eixo transversal, é quem controla a posição horizontal nesse caso. `justify-content` continuaria controlando o espaçamento vertical entre os itens.

> [!IMPORTANT]
> A alternativa A é o erro conceitual mais comum: memorizar "`justify-content` é sempre horizontal" em vez de entender que ela é sempre relativa ao **eixo principal**, que muda de direção conforme `flex-direction`.

</details>

---

**1.** As linhas abaixo estão embaralhadas. Reordene-as para formar um flex container em linha (`row`), com os itens espalhados nas duas pontas e centralizados verticalmente — o mesmo padrão da navbar da aula.

```css
}
align-items: center;
.barra-topo {
justify-content: space-between;
display: flex;
```

<details>
<summary>Sugestão de solução</summary>

```css
.barra-topo {
display: flex;
justify-content: space-between;
align-items: center;
}
```

`display: flex` precisa vir primeiro para que `.barra-topo` vire um flex container — só depois disso `justify-content` e `align-items` têm efeito algum sobre os filhos.

</details>

---

**2.** As linhas abaixo estão embaralhadas. Reordene-as para formar uma grade de cards que quebra de linha quando necessário, com espaço fixo de `1rem` entre eles e cada card começando com `200px` de largura.

```css
gap: 1rem;
}
.grade-produtos .item {
.grade-produtos {
flex-wrap: wrap;
flex: 1 1 200px;
display: flex;
}
```

<details>
<summary>Sugestão de solução</summary>

```css
.grade-produtos {
display: flex;
flex-wrap: wrap;
gap: 1rem;
}
.grade-produtos .item {
flex: 1 1 200px;
}
```

`display: flex` e `flex-wrap: wrap` pertencem ao container (`.grade-produtos`), enquanto `flex: 1 1 200px` pertence a cada item (`.item`) — são duas regras separadas, cada uma com seu próprio seletor e bloco de chaves.

</details>

---

**3.** Um `<footer>` tem `display: flex` mas nenhuma outra propriedade de Flexbox declarada. Ele contém três `<p>`: "© 2026 LojaTech", "Termos de uso" e "Privacidade". Sem testar no navegador, descreva como esses três parágrafos vão aparecer.

<details>
<summary>Sugestão de solução</summary>

Lado a lado, em uma única linha, colados na borda esquerda do `<footer>` — porque `flex-direction` assume o valor padrão `row` e `justify-content` assume o valor padrão `flex-start`. Sem `flex-wrap: wrap`, eles também não quebrariam de linha, mesmo que não coubessem todos na largura disponível.

</details>

---

**4.** O grupo de botões abaixo deveria ficar alinhado à direita do container, mas está aparecendo colado à esquerda. Corrija adicionando uma única propriedade.

```css
.barra-acoes {
  display: flex;
  gap: 0.5rem;
}
```

<details>
<summary>Sugestão de solução</summary>

```css
.barra-acoes {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
```

`justify-content: flex-end` empurra todos os itens para o final do eixo principal — como `flex-direction` está no padrão `row`, isso significa a borda direita do container.

</details>

---

**5.** Um card de perfil (`.card-perfil`) tem `display: flex` com `flex-direction: column`, contendo uma foto, um nome e um cargo. Todos os itens devem ficar centralizados horizontalmente. Escreva a propriedade que falta.

<details>
<summary>Sugestão de solução</summary>

```css
.card-perfil {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Com `flex-direction: column`, o eixo transversal é o horizontal — por isso `align-items: center`, e não `justify-content: center`, é quem centraliza os itens nessa direção.

</details>

---

**6.** Três cards de preço (`.card-preco`) estão espremidos numa única linha em telas estreitas, com o texto cortando de forma ilegível. O CSS do container só tem `display: flex` e `gap: 1rem`. Adicione a propriedade que falta para que os cards quebrem para a linha seguinte quando não couberem mais.

<details>
<summary>Sugestão de solução</summary>

```css
.grade-precos {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
```

Sem `flex-wrap: wrap`, o valor padrão (`nowrap`) força todos os itens a caberem numa linha só, encolhendo cada um até o limite — `flex-wrap: wrap` permite que os que não cabem mais passem para a linha de baixo.

</details>

---

**7.** Uma barra de navegação (`display: flex`, `align-items: center`) tem quatro links alinhados verticalmente ao centro. Um quinto item, um botão de "Entrar" com altura maior que os links, precisa ficar colado na base da barra, sem alterar o alinhamento dos outros quatro. Escreva a regra CSS para esse botão.

<details>
<summary>Sugestão de solução</summary>

```css
.navbar .botao-entrar {
  align-self: flex-end;
}
```

`align-self` sobrescreve `align-items` só para o item em que é aplicado — os quatro links continuam centralizados pelo `align-items: center` do container, e só o botão desce até a base.

</details>

---

**8.** Três cartões de estatística (`.card-stat`) precisam ter exatamente a mesma largura entre si, dividindo igualmente o espaço do container, sem nenhum `width` fixo declarado. Escreva a propriedade que garante isso em cada `.card-stat`.

<details>
<summary>Sugestão de solução</summary>

```css
.card-stat {
  flex-grow: 1;
}
```

Com `flex-grow: 1` em todos os itens, cada um recebe uma fração igual do espaço restante do container depois de ocupar seu tamanho natural — como os três têm o mesmo `flex-grow`, o resultado é largura idêntica entre eles.

</details>

---

**9.** Um menu lateral (`.menu-lateral`) precisa organizar seus itens um embaixo do outro, mas o CSS atual usa `flex-direction: row` por engano, fazendo os itens aparecerem lado a lado. Corrija.

<details>
<summary>Sugestão de solução</summary>

```css
.menu-lateral {
  display: flex;
  flex-direction: column;
}
```

`flex-direction: column` muda o eixo principal para o vertical, organizando os itens um abaixo do outro em vez de lado a lado.

</details>

---

## Desafios

**10.** Crie um `<footer>` com três blocos de texto — "© 2026 LojaTech", um link "Termos de uso" e um link "Privacidade" — organizados lado a lado, com o primeiro bloco na ponta esquerda e os dois links agrupados na ponta direita, todos alinhados verticalmente ao centro do footer.

<details>
<summary>Sugestão de solução</summary>

```html
<footer class="rodape">
  <p>© 2026 LojaTech</p>
  <div class="links-rodape">
    <a href="#">Termos de uso</a>
    <a href="#">Privacidade</a>
  </div>
</footer>
```

```css
.rodape {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.links-rodape {
  display: flex;
  gap: 1rem;
}
```

Agrupar os dois links dentro de um `<div>` próprio, também com `display: flex`, evita que `justify-content: space-between` do `.rodape` os separe um do outro — o `space-between` do rodapé só enxerga dois filhos diretos: o `<p>` e o `<div>`.

</details>

---

**11.** Crie uma fileira de três cards de plano (Básico, Pro, Premium), cada um começando com `240px` de largura, crescendo para dividir o espaço restante igualmente, e quebrando para a linha seguinte em telas estreitas, com `1.5rem` de espaço entre eles.

<details>
<summary>Sugestão de solução</summary>

```html
<section class="grade-planos">
  <article class="card-plano">Básico</article>
  <article class="card-plano">Pro</article>
  <article class="card-plano">Premium</article>
</section>
```

```css
.grade-planos {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card-plano {
  flex: 1 1 240px;
  padding: 1.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
}
```

`flex: 1 1 240px` combina os três comportamentos pedidos: `240px` como largura inicial (`flex-basis`), crescimento igual entre os cards (`flex-grow: 1`) e permissão para encolher em telas menores (`flex-shrink: 1`), enquanto `flex-wrap: wrap` no container permite a quebra de linha.

</details>

---

**12.** Crie uma barra de ferramentas (`.barra-ferramentas`) com quatro ícones de ação alinhados à direita e um único ícone de "ajuda" fixo na ponta esquerda, sem usar `margin` em nenhum dos itens.

<details>
<summary>Sugestão de solução</summary>

```html
<div class="barra-ferramentas">
  <button class="ajuda">?</button>
  <div class="acoes">
    <button>Copiar</button>
    <button>Colar</button>
    <button>Recortar</button>
    <button>Excluir</button>
  </div>
</div>
```

```css
.barra-ferramentas {
  display: flex;
  justify-content: space-between;
}

.acoes {
  display: flex;
  gap: 0.5rem;
}
```

O mesmo padrão do exercício 10: agrupar os quatro botões de ação num container flex próprio evita que `space-between` da barra externa os separe entre si — a barra externa só distribui espaço entre dois filhos diretos, o botão de ajuda e o grupo de ações.

</details>

---

**13.** Crie um cartão de perfil de usuário com foto, nome e cargo empilhados verticalmente e centralizados horizontalmente, e explique em uma frase por que `align-items`, e não `justify-content`, é a propriedade certa para centralizar nesse caso.

<details>
<summary>Sugestão de solução</summary>

```html
<div class="card-perfil">
  <img src="foto.jpg" alt="Foto de perfil">
  <h3>Ana Beatriz</h3>
  <p>Desenvolvedora Front-end</p>
</div>
```

```css
.card-perfil {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
}
```

Com `flex-direction: column`, o eixo principal é o vertical (onde foto, nome e cargo se empilham em sequência) e o eixo transversal é o horizontal — como a centralização pedida é horizontal, ela precisa de `align-items`, a propriedade que sempre atua no eixo transversal, não no principal.

</details>
