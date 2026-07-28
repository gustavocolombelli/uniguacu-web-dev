# Exercícios — Aula 03

[Desenvolvimento Web](../../README.md) > [Aula 03](../aula-03.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 03](../aula-03.md): tags semânticas do HTML5 (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`), hierarquia de headings e boas práticas de acessibilidade.

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

Você está estruturando um blog. Cada post, que poderia ser compartilhado e continuar fazendo sentido sozinho em outro lugar (como em um feed RSS), deve ficar dentro de qual tag?

- **A.** `<section>`, porque agrupa conteúdo relacionado dentro da página.
- **B.** `<article>`, porque o conteúdo faz sentido de forma independente do resto da página.
- **C.** `<div>`, porque não precisa de nenhum significado semântico.
- **D.** `<aside>`, porque é conteúdo complementar ao post principal.

<details>
<summary>Resposta</summary>

Alternativa **B**. Um post de blog continua fazendo sentido sozinho — em um feed, em outro site, compartilhado por link — que é exatamente o critério que define `article`.

> [!IMPORTANT]
> A confusão mais comum é usar `<section>` para tudo que "parece um bloco". O teste é sempre: "isso faz sentido fora do contexto desta página?" Se sim, é `article`; se só faz sentido aqui dentro, é `section`.

</details>

---

**1.** As linhas abaixo estão embaralhadas. Reordene-as para formar o esqueleto semântico de uma página simples com cabeçalho, conteúdo principal e rodapé.

```html
</body>
<footer><p>© 2026 Estúdio Criativo</p></footer>
<body>
<header><h1>Estúdio Criativo</h1></header>
</html>
<main><section><h2>Portfólio</h2></section></main>
<html lang="pt-BR">
</html>
```

<details>
<summary>Sugestão de solução</summary>

```html
<html lang="pt-BR">
<body>
<header><h1>Estúdio Criativo</h1></header>
<main><section><h2>Portfólio</h2></section></main>
<footer><p>© 2026 Estúdio Criativo</p></footer>
</body>
</html>
```

Pense na ordem de abertura de tags: primeiro a tag raiz (`<html>`), depois o `<body>`, depois o conteúdo interno na ordem visual (header → main → footer), e por último as tags de fechamento na ordem inversa da abertura.

</details>

---

**2.** As linhas abaixo estão embaralhadas. Reordene-as para formar um `<header>` com título e um `<nav>` com três links de navegação interna.

```html
</header>
<a href="#contato">Contato</a>
<nav>
<header>
<h1>Ateliê Sabor Caseiro</h1>
</nav>
<a href="#cardapio">Cardápio</a>
<a href="#sobre">Sobre</a>
```

<details>
<summary>Sugestão de solução</summary>

```html
<header>
<h1>Ateliê Sabor Caseiro</h1>
<nav>
<a href="#sobre">Sobre</a>
<a href="#cardapio">Cardápio</a>
<a href="#contato">Contato</a>
</nav>
</header>
```

O `<h1>` (identidade do site) vem antes do `<nav>` dentro do `<header>`. Os links internos podem vir em qualquer ordem entre si, desde que estejam todos dentro do `<nav>`, e o `</nav>` precisa fechar antes do `</header>`.

</details>

---

**3.** A página abaixo tem `header`, `nav`, `main` (com dois `section`), um `aside` fora do `main` e `footer`, todos diretamente dentro do `<body>`. Liste quais landmarks um leitor de tela reconheceria automaticamente, e quais elementos **não** viram landmark sozinhos.

```html
<body>
  <header><h1>Portal de Notícias</h1></header>
  <nav>...</nav>
  <main>
    <section><h2>Últimas notícias</h2></section>
    <section><h2>Mais lidas</h2></section>
  </main>
  <aside><h2>Publicidade</h2></aside>
  <footer>...</footer>
</body>
```

<details>
<summary>Sugestão de solução</summary>

Landmarks reconhecidas: `banner` (`header`), `navigation` (`nav`), `main` (`main`), `complementary` (`aside`) e `contentinfo` (`footer`).

Os dois `<section>` **não** viram landmarks sozinhos — eles só ganham a landmark `region` se tiverem um nome acessível associado (`aria-label`, por exemplo). Sem isso, são apenas agrupamentos visuais/semânticos, não pontos de navegação rápida para quem usa leitor de tela.

</details>

---

**4.** Um site de receitas tem um bloco com uma receita completa (título, ingredientes e modo de preparo), que poderia ser copiado para outro site e continuar fazendo sentido sozinho. Esse mesmo bloco tem dois agrupamentos internos, "Ingredientes" e "Modo de preparo", que só fazem sentido dentro da receita. Quais tags usar para o bloco da receita e para cada agrupamento interno?

<details>
<summary>Sugestão de solução</summary>

O bloco da receita inteira usa `<article>`, pois faz sentido sozinho fora do contexto da página (o teste de "isso pode ser compartilhado sozinho?"). Os agrupamentos internos ("Ingredientes" e "Modo de preparo") usam `<section>`, pois só têm sentido dentro do `article` que os contém — um `<article>` pode conter `<section>`s internas sem problema.

</details>

---

**5.** O trecho abaixo usa apenas `<div>`. Reescreva-o substituindo cada `<div>` pela tag semântica correta.

```html
<div class="cabecalho"><h1>Loja Verde</h1></div>
<div class="conteudo"><h2>Ofertas</h2><p>Frete grátis acima de R$ 100.</p></div>
<div class="rodape"><p>Loja Verde — todos os direitos reservados</p></div>
```

<details>
<summary>Sugestão de solução</summary>

```html
<header><h1>Loja Verde</h1></header>
<main>
  <section>
    <h2>Ofertas</h2>
    <p>Frete grátis acima de R$ 100.</p>
  </section>
</main>
<footer><p>Loja Verde — todos os direitos reservados</p></footer>
```

`class="cabecalho"` vira `<header>`; `class="conteudo"` vira `<main>`, com um `<section>` interno para o bloco "Ofertas" (que tem seu próprio heading, `<h2>`); `class="rodape"` vira `<footer>`.

</details>

---

**6.** A página abaixo pula de `<h1>` direto para `<h4>` só porque o `<h3>` "ficava grande demais" visualmente. Corrija a hierarquia de headings sem alterar o tamanho visual do texto (explique, em uma frase, como o tamanho seria ajustado de outra forma).

```html
<h1>Academia Corpo Ativo</h1>
<h4>Nossos horários</h4>
<p>Segunda a sexta, das 6h às 22h.</p>
```

<details>
<summary>Sugestão de solução</summary>

```html
<h1>Academia Corpo Ativo</h1>
<h2>Nossos horários</h2>
<p>Segunda a sexta, das 6h às 22h.</p>
```

A hierarquia não pode pular níveis por causa do tamanho — aqui o próximo nível depois de `<h1>` é `<h2>`. Se o tamanho visual do `<h2>` não agradar, ele se ajusta com CSS (`font-size`), nunca trocando a tag por uma de nível mais profundo.

</details>

---

**7.** O trecho abaixo tem um `<section>` sem nenhum heading. Explique por que isso é um problema e corrija.

```html
<section>
  <p>Atendemos das 8h às 18h, de segunda a sábado.</p>
</section>
```

<details>
<summary>Sugestão de solução</summary>

```html
<section>
  <h2>Horário de atendimento</h2>
  <p>Atendemos das 8h às 18h, de segunda a sábado.</p>
</section>
```

Uma `<section>` representa um agrupamento **temático** de conteúdo — sem um heading, não há como saber qual é esse tema, nem para quem lê o código, nem para um leitor de tela navegando pela estrutura da página. Toda `<section>` deve ter um heading que a identifique.

</details>

---

**8.** Duas imagens de uma página de produto: uma mostra o produto sendo vendido, a outra é apenas uma linha decorativa entre seções. Adicione o atributo `alt` correto para cada uma.

```html
<img src="tenis-corrida.jpg">
<img src="linha-decorativa.png">
```

<details>
<summary>Sugestão de solução</summary>

```html
<img src="tenis-corrida.jpg" alt="Tênis de corrida azul e branco, vista lateral">
<img src="linha-decorativa.png" alt="">
```

A primeira imagem carrega informação real sobre o produto, então precisa de um `alt` descritivo. A segunda é puramente decorativa, então recebe `alt=""` — vazio, mas presente — para ser explicitamente ignorada por leitores de tela.

</details>

---

**9.** Em suas palavras, explique por que `alt=""` em uma imagem não é o mesmo que simplesmente não escrever o atributo `alt`.

<details>
<summary>Sugestão de solução</summary>

`alt=""` diz explicitamente "esta imagem é decorativa, ignore-a" para quem usa leitor de tela. Sem o atributo `alt`, o comportamento é inconsistente entre leitores de tela, e alguns chegam a anunciar o caminho do arquivo da imagem, o que é pior do que não anunciar nada.

</details>

---

## Desafios

**10.** Monte o esqueleto semântico de uma página pessoal ("sobre mim"), com `header` (nome e `nav` com âncoras internas), `main` com pelo menos duas `section` (ex.: "Formação" e "Projetos"), e `footer` com um link de contato. Garanta um único `<h1>` na página.

<details>
<summary>Sugestão de solução</summary>

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre mim</title>
</head>
<body>
  <header>
    <h1>Maria Fernandes</h1>
    <nav>
      <a href="#formacao">Formação</a>
      <a href="#projetos">Projetos</a>
    </nav>
  </header>

  <main>
    <section id="formacao">
      <h2>Formação</h2>
      <p>Análise e Desenvolvimento de Sistemas — Uniguaçu.</p>
    </section>

    <section id="projetos">
      <h2>Projetos</h2>
      <p>Portfólio pessoal, aplicativo de listas de tarefas.</p>
    </section>
  </main>

  <footer>
    <p>Contato: <a href="mailto:maria@email.com">maria@email.com</a></p>
  </footer>
</body>
</html>
```

Comece pelo esqueleto do documento (`<!DOCTYPE html>`, `<html lang>`, `<head>`), depois só então preencha o `<body>` seguindo a ordem header → main → footer, uma etapa por vez.

</details>

---

**11.** Monte uma página de listagem de blog com `main` contendo dois `<article>` (cada um com seu próprio `<h2>` e um parágrafo de resumo) e um `<aside>` com uma lista de "Posts relacionados".

<details>
<summary>Sugestão de solução</summary>

```html
<main>
  <article>
    <h2>Como organizar seu primeiro projeto em HTML</h2>
    <p>Dicas práticas para estruturar pastas e arquivos antes de começar a codar.</p>
  </article>

  <article>
    <h2>Por que tags semânticas importam</h2>
    <p>Entenda o impacto de header, main e footer na acessibilidade da sua página.</p>
  </article>
</main>

<aside>
  <h2>Posts relacionados</h2>
  <ul>
    <li><a href="#">Introdução ao CSS</a></li>
    <li><a href="#">Primeiros passos em JavaScript</a></li>
  </ul>
</aside>
```

Cada `<article>` faz sentido sozinho — poderia ser compartilhado individualmente. O `<aside>` fica fora do `<main>` porque é conteúdo relacionado, mas não essencial ao conteúdo principal da página.

</details>

---

**12.** Monte do zero o esqueleto semântico de uma página institucional para um negócio de sua escolha (academia, pet shop, estúdio de tatuagem etc.), com `header` + `nav`, `main` com pelo menos duas `section`, e `footer`. Garanta que toda `<img>` tenha um `alt` descritivo e que exista um único `<h1>` na página.

<details>
<summary>Sugestão de solução</summary>

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PetShop Amigo Fiel</title>
</head>
<body>
  <header>
    <h1>PetShop Amigo Fiel</h1>
    <nav>
      <a href="#servicos">Serviços</a>
      <a href="#localizacao">Localização</a>
    </nav>
  </header>

  <main>
    <section id="servicos">
      <h2>Serviços</h2>
      <img src="banho-tosa.jpg" alt="Cachorro sendo escovado durante o banho e tosa">
      <p>Banho, tosa e consultas veterinárias.</p>
    </section>

    <section id="localizacao">
      <h2>Localização</h2>
      <p>Rua das Flores, 123 — Centro.</p>
    </section>
  </main>

  <footer>
    <p>Contato: (42) 99999-0000</p>
  </footer>
</body>
</html>
```

Como no exercício 10, monte o esqueleto do documento primeiro, depois cada `section` do `main` uma de cada vez, conferindo a cada imagem adicionada se ela é informativa (precisa de `alt` descritivo) ou decorativa (`alt=""`).

</details>
