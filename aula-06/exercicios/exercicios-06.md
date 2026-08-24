# Exercícios — Aula 06

[Desenvolvimento Web](../../README.md) > [Aula 06](../aula-06.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 06](../aula-06.md): Parte A cobre Flexbox (ativação, eixo principal e transversal, `justify-content`, `align-items`/`align-self`, `flex-wrap`, `gap`, crescimento); Parte B cobre CSS Grid (ativação, `grid-template-columns`/`grid-template-rows`, `fr`, `repeat()`, linhas numeradas, posicionamento manual, grades responsivas com `auto-fit`/`minmax()` e media queries mobile-first).

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Parte A — Flexbox

### Questão para discussão em sala

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

### Desafios — Flexbox

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

---

## Parte B — CSS Grid

### Questão para discussão em sala

Um grid container tem `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`. A tela está larga o suficiente para caber 4 colunas de 200px, mas o container só tem 2 itens dentro dele.

O que acontece com a largura desses 2 itens?

- **A.** Cada item fica travado em `200px`, e o restante do espaço da linha fica vazio à direita — porque `minmax()` define `200px` como uma largura fixa.
- **B.** Os 2 itens dividem igualmente todo o espaço disponível da linha, esticando além de `200px` — porque `auto-fit` colapsa as colunas vazias e redistribui esse espaço entre os itens que existem.
- **C.** O navegador cria as 4 colunas de qualquer forma, deixando 2 delas visivelmente vazias — porque `repeat()` sempre gera o número máximo de colunas que cabem no espaço disponível.
- **D.** Nada muda em relação a `auto-fill`: a diferença entre os dois só aparece quando o número de itens é maior do que o número de colunas que cabem.

<details>
<summary>Resposta</summary>

Alternativa **B**. `auto-fit` calcula quantas colunas cabem, mas colapsa as colunas que ficariam vazias e deixa o `1fr` de `minmax(200px, 1fr)` esticar os itens existentes para ocupar o espaço que sobrou.

> [!IMPORTANT]
> A alternativa C descreve o comportamento de `auto-fill`, não de `auto-fit` — é o erro conceitual mais comum entre os dois: `auto-fill` mantém as colunas vazias reservadas (mesmo sem conteúdo), enquanto `auto-fit` as remove e redistribui o espaço. A alternativa A ignora que `minmax(200px, 1fr)` tem um segundo valor (`1fr`) que permite crescer além do mínimo.

</details>

---

**14.** As linhas abaixo estão embaralhadas. Reordene-as para formar um layout de duas colunas — uma barra lateral fixa de `250px` e uma área de conteúdo que ocupa o restante do espaço — com `1.5rem` de espaço entre elas.

```css
grid-template-columns: 250px 1fr;
}
gap: 1.5rem;
.layout-com-barra {
display: grid;
```

<details>
<summary>Sugestão de solução</summary>

```css
.layout-com-barra {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1.5rem;
}
```

`display: grid` precisa vir antes das demais propriedades para que `grid-template-columns` e `gap` tenham efeito — sem ele, `.layout-com-barra` continuaria no modo de exibição padrão (`block`), que ignora essas propriedades.

</details>

---

**15.** As linhas abaixo estão embaralhadas. Reordene-as para formar a página de um evento (`.pagina-evento`, com duas colunas: `200px` e o restante do espaço) em que o `.topo` atravessa as duas colunas, ficando com a largura toda.

```css
grid-column: 1 / 3;
}
.topo {
grid-template-columns: 200px 1fr;
display: grid;
.pagina-evento {
}
```

<details>
<summary>Sugestão de solução</summary>

```css
.pagina-evento {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.topo {
  grid-column: 1 / 3;
}
```

Com duas colunas, a grade tem três linhas verticais (`1`, `2` e `3`) — `grid-column: 1 / 3` faz `.topo` ir da primeira até a última, atravessando as duas colunas. O menu e o conteúdo não precisam de nenhuma regra própria: como `.topo` ocupa a linha inteira, eles caem automaticamente na coluna `1` e na coluna `2` da linha seguinte, na ordem em que aparecerem no HTML.

</details>

---

**16.** O catálogo de uma livraria online usa `grid-template-columns: repeat(4, 1fr);` para exibir os livros em quatro colunas fixas. O dono da livraria pediu que a grade sempre mostre exatamente três colunas, nunca mais, nunca menos. Corrija a única linha necessária.

<details>
<summary>Sugestão de solução</summary>

```css
.catalogo-livros {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

`repeat(3, 1fr)` gera sempre três colunas de largura igual, independente da largura da tela — diferente de `repeat(auto-fit, minmax(...))`, que varia o número de colunas conforme o espaço disponível.

</details>

---

**17.** Um álbum de fotos de um evento usa a regra abaixo. Quando há poucas fotos (2 ou 3), elas ficam pequenas e coladas à esquerda, com um espaço vazio grande sobrando à direita, em vez de crescerem para preencher a linha toda.

```css
.album-fotos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
```

Corrija a propriedade responsável por esse comportamento.

<details>
<summary>Sugestão de solução</summary>

```css
.album-fotos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
```

`auto-fill` mantém reservado o espaço das colunas vazias que caberiam na linha, mesmo sem fotos para preenchê-las — por isso as fotos existentes não crescem além de `180px`. Trocando para `auto-fit`, essas colunas vazias colapsam e o `1fr` de `minmax()` distribui o espaço sobrando entre as fotos que realmente existem.

</details>

---

**18.** Um site de receitas culinárias declara o CSS abaixo. O elemento `.titulo-receita` deveria atravessar as duas colunas da grade (`250px` e o restante do espaço), mas está aparecendo comprimido só dentro da primeira coluna, deixando um vão vazio ao lado.

```css
.pagina-receita {
  display: grid;
  grid-template-columns: 250px 1fr;
}

.titulo-receita {
  grid-column: 1 / 2;
}
```

Qual é o erro, e como corrigi-lo?

<details>
<summary>Sugestão de solução</summary>

```css
.titulo-receita {
  grid-column: 1 / 3;
}
```

Com duas colunas, a grade tem três linhas verticais (`1`, `2` e `3`) — a coluna `250px` fica entre as linhas `1` e `2`, e a coluna `1fr` fica entre as linhas `2` e `3`. `grid-column: 1 / 2` vai só até a linha `2`, ou seja, cobre apenas a primeira coluna; para atravessar as duas colunas até a borda direita, é preciso ir até a última linha, `3`.

</details>

---

**19.** O menu abaixo foi escrito no estilo desktop-first: o layout de 4 colunas é o padrão, e a versão de celular (1 coluna) só aparece dentro de um `max-width`. Reescreva seguindo a abordagem mobile-first (estilo base pensado para celular, media query com `min-width`), mantendo o mesmo resultado visual final.

```css
.menu-principal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 767px) {
  .menu-principal {
    grid-template-columns: 1fr;
  }
}
```

<details>
<summary>Sugestão de solução</summary>

```css
.menu-principal {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .menu-principal {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

O estilo base passa a ser a versão de uma coluna (celular), e o `@media (min-width: 768px)` adiciona o layout de 4 colunas só a partir dali — o ponto de quebra vira `768px` (em vez de `767px`) porque agora ele marca onde o layout maior **começa** a valer, não onde o menor **termina**.

</details>

---

**20.** A página de um portfólio usa `grid-template-columns: 220px 1fr;` sem nenhuma media query, então a barra lateral de `220px` aparece sempre — inclusive em telas de celular, onde ela deixa a área de conteúdo espremida. Corrija para que a página fique em uma coluna só até `768px`, e só a partir daí ganhe a barra lateral fixa.

<details>
<summary>Sugestão de solução</summary>

```css
.pagina-portfolio {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .pagina-portfolio {
    grid-template-columns: 220px 1fr;
  }
}
```

O valor `220px 1fr` sai do estilo base e passa a existir só dentro do media query — abaixo de `768px`, `.pagina-portfolio` usa o valor do estilo base (`1fr`, uma coluna só).

</details>

---

**21.** O portal de notícias abaixo tem cabeçalho, menu, conteúdo e rodapé — só o cabeçalho e o rodapé usam `grid-column` (o menu e o conteúdo se posicionam sozinhos, na coluna `1` e na coluna `2`). Adicione uma nova seção, `.assinatura` (um convite para assinar a newsletter), ocupando a largura toda, entre o conteúdo e o rodapé.

```html
<div class="portal-noticias">
  <header class="cabecalho">...</header>
  <nav class="menu">...</nav>
  <main class="conteudo">...</main>
  <footer class="rodape">...</footer>
</div>
```

```css
.portal-noticias {
  display: grid;
  grid-template-columns: 220px 1fr;
}

.cabecalho { grid-column: 1 / 3; }
.rodape    { grid-column: 1 / 3; }
```

<details>
<summary>Sugestão de solução</summary>

```html
<div class="portal-noticias">
  <header class="cabecalho">...</header>
  <nav class="menu">...</nav>
  <main class="conteudo">...</main>
  <div class="assinatura">Assine nossa newsletter</div>
  <footer class="rodape">...</footer>
</div>
```

```css
.assinatura {
  grid-column: 1 / 3;
}
```

Duas mudanças são necessárias, e as duas importam: no HTML, `.assinatura` precisa ficar entre `.conteudo` e `.rodape` — é a ordem no HTML que decide em que linha da grade cada item posicionado automaticamente cai. No CSS, `grid-column: 1 / 3` faz `.assinatura` atravessar as duas colunas, do mesmo jeito que `.cabecalho` e `.rodape` já faziam, criando uma nova linha de largura total entre o conteúdo e o rodapé.

</details>

---

**22.** Uma grade tem `grid-template-columns: 1fr 1fr 1fr 1fr;` (quatro colunas). Um item recebe `grid-column: 2 / 4;`. Sem testar no navegador, explique quantas colunas esse item vai ocupar e quais, contando pelas linhas numeradas da grade. Responda em até duas frases, sem escrever código.

<details>
<summary>Sugestão de solução</summary>

O item ocupa duas colunas: a segunda e a terceira. Com quatro colunas, a grade tem cinco linhas verticais (`1` a `5`); `grid-column: 2 / 4` vai da linha `2` até a linha `4`, cobrindo exatamente o intervalo entre elas — que corresponde à segunda coluna (entre as linhas `2` e `3`) e à terceira (entre as linhas `3` e `4`), deixando a primeira e a quarta coluna de fora.

</details>

---

### Desafios — CSS Grid

**23.** Crie a galeria de fotos de um fotógrafo, em que cada foto tenha no mínimo `160px` de largura e cresça para preencher o espaço disponível, com `0.75rem` de espaço entre elas — sem usar nenhuma media query.

<details>
<summary>Sugestão de solução</summary>

```html
<section class="galeria-fotos">
  <img src="foto1.jpg" alt="Foto do evento 1">
  <img src="foto2.jpg" alt="Foto do evento 2">
  <img src="foto3.jpg" alt="Foto do evento 3">
</section>
```

```css
.galeria-fotos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}
```

`repeat(auto-fit, minmax(160px, 1fr))` resolve os dois requisitos ao mesmo tempo: `minmax(160px, 1fr)` garante a largura mínima e permite crescer, e `auto-fit` calcula sozinho quantas colunas cabem em cada largura de tela, sem precisar de um breakpoint fixo.

</details>

---

**24.** Crie o layout completo de um blog pessoal — cabeçalho, menu de categorias, área de posts e rodapé — que fica empilhado em uma coluna só em telas estreitas e passa a ter o menu de categorias como uma coluna lateral fixa de `200px` a partir de `768px` de largura.

<details>
<summary>Sugestão de solução</summary>

```html
<div class="pagina-blog">
  <header class="cabecalho">Blog da Ana</header>
  <nav class="categorias">Viagem · Culinária · Tecnologia</nav>
  <main class="posts">Últimos posts...</main>
  <footer class="rodape">© 2026 Blog da Ana</footer>
</div>
```

```css
.pagina-blog {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .pagina-blog {
    grid-template-columns: 200px 1fr;
  }

  .cabecalho { grid-column: 1 / 3; }
  .rodape    { grid-column: 1 / 3; }
}
```

Abaixo de `768px`, `.pagina-blog` tem uma coluna só e nenhum item precisa de `grid-column` — os quatro filhos seguem a ordem natural do HTML, um embaixo do outro. A partir de `768px`, a segunda coluna aparece e `.cabecalho`/`.rodape` passam a atravessar as duas (`1 / 3`); `.categorias` e `.posts` continuam sem nenhuma regra própria, porque o posicionamento automático já os encaixa na coluna `1` e na coluna `2` assim que essa segunda coluna existe.

</details>

---

**25.** Crie um painel administrativo com quatro cartões de indicador (KPI) no topo — em 2 colunas em telas estreitas e em 4 colunas a partir de `1024px` — seguidos de uma área de gráfico ocupando a largura toda logo abaixo. Decida você mesmo a estrutura de `grid-template-columns` necessária.

<details>
<summary>Sugestão de solução</summary>

```html
<div class="dashboard">
  <div class="kpis">
    <div class="kpi">Vendas do mês</div>
    <div class="kpi">Novos clientes</div>
    <div class="kpi">Ticket médio</div>
    <div class="kpi">Taxa de conversão</div>
  </div>
  <div class="grafico">Gráfico de vendas ao longo do tempo</div>
</div>
```

```css
.kpis {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.grafico {
  margin-top: 1rem;
  padding: 1.5rem;
  border: 1px solid #D1D5DB;
}

@media (min-width: 1024px) {
  .kpis {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

Como os KPIs (2 → 4 colunas) e o gráfico (sempre largura toda, sempre abaixo dos KPIs) têm comportamentos diferentes, cada um vira seu próprio grid container em vez de tentar controlar os dois com um só `grid-template-columns` e `grid-column` — `.grafico` nem precisa ser um item de grid, porque ele já ocupa a largura toda naturalmente fora de qualquer grid.

</details>

---

**26.** Crie uma tabela de planos (Básico, Pro, Premium) que aparece empilhada verticalmente em telas de celular e como três colunas lado a lado a partir de `768px`.

<details>
<summary>Sugestão de solução</summary>

```html
<section class="planos">
  <article class="plano">Básico</article>
  <article class="plano">Pro</article>
  <article class="plano">Premium</article>
</section>
```

```css
.planos {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .planos {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

`repeat(3, 1fr)` é suficiente aqui: os três planos não têm papéis fixos diferentes entre si (como cabeçalho, barra lateral e rodapé têm) — são três itens intercambiáveis do mesmo tipo, então nenhum deles precisa de `grid-column` próprio, o posicionamento automático já os encaixa lado a lado na ordem do HTML.

</details>
