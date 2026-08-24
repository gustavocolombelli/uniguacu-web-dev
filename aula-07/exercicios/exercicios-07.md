# Exercícios — Aula 07

[Desenvolvimento Web](../../README.md) > [Aula 07](../aula-07.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 07](../aula-07.md): organização de pastas (`resources/css`, `resources/js`, `resources/img`), `<link rel="stylesheet">`, `<script src>` e resolução de caminhos relativos (`./`, `../`).

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

Um projeto tem esta estrutura:

```
projeto/
├── index.html
└── resources/
    ├── css/
    │   └── style.css
    └── img/
        └── fundo.jpg
```

Dentro de `resources/css/style.css`, alguém escreve `background-image: url("resources/img/fundo.jpg");` — copiando, sem pensar, o mesmo caminho que já funcionava no `href` do `<link>` dentro do `index.html`.

O que acontece?

- **A.** Funciona normalmente, porque todo caminho num projeto é sempre relativo à raiz onde está o `index.html`.
- **B.** Quebra, porque o navegador tenta buscar a imagem em `resources/css/resources/img/fundo.jpg` — o caminho é relativo à pasta do `style.css`, não à raiz do projeto.
- **C.** Quebra, porque arquivos CSS não podem referenciar imagens, só arquivos HTML podem.
- **D.** Funciona, mas só se a extensão do arquivo de imagem for `.svg`.

<details>
<summary>Resposta</summary>

Alternativa **B**. O `style.css` está em `resources/css/`; um caminho relativo declarado *dentro dele* soma a partir dessa pasta. `resources/img/fundo.jpg` viraria `resources/css/resources/img/fundo.jpg`, que não existe. O caminho correto seria `../img/fundo.jpg` — subir um nível (de `css/` para `resources/`) e descer para `img/`.

> [!IMPORTANT]
> Esse é o erro mais comum ao externalizar CSS: assumir que "o caminho que funcionou no HTML funciona em qualquer arquivo". Cada arquivo resolve seus próprios caminhos a partir de onde ele está salvo.

</details>

---

**1.** Dada a estrutura de pastas abaixo, escreva o `<link>` completo que `index.html` usaria para referenciar `estilos.css`.

```
projeto/
├── index.html
└── resources/
    └── css/
        └── estilos.css
```

<details>
<summary>Sugestão de solução</summary>

```html
<link rel="stylesheet" href="resources/css/estilos.css">
```

O caminho é relativo ao `index.html`, que está na raiz — por isso basta descer diretamente para `resources/css/`, sem `../` nenhum.

</details>

---

**2.** Um `<script>` está sendo colocado dentro do `<head>`, sem o atributo `defer`, e a página só funciona corretamente depois que o desenvolvedor o move para o fim do `<body>`. Em uma frase, explique por que essa mudança de posição resolveu o problema (dica: o que o script provavelmente estava tentando fazer).

<details>
<summary>Sugestão de solução</summary>

O script provavelmente tentava selecionar ou manipular um elemento do HTML (como um botão ou uma `<div>`) que ainda não existia quando o `<script>` no `<head>` era executado — como o `<head>` é processado antes do `<body>`, o script rodava antes do restante da página ter sido construída; movendo para o fim do `<body>`, o HTML inteiro já existe quando o script executa.

</details>

---

**3.** Corrija o erro na tag abaixo, que deveria referenciar um arquivo CSS externo.

```html
<link href="resources/css/style.css">
```

<details>
<summary>Sugestão de solução</summary>

```html
<link rel="stylesheet" href="resources/css/style.css">
```

Falta o atributo `rel="stylesheet"` — sem ele, o navegador não sabe que tipo de recurso está sendo referenciado e ignora o arquivo como folha de estilos.

</details>

---

**4.** Dada a estrutura de pastas abaixo, escreva o caminho relativo que `script.js` usaria para referenciar `dados.json`, que está na mesma pasta `js/`.

```
projeto/
└── resources/
    └── js/
        ├── script.js
        └── dados.json
```

<details>
<summary>Sugestão de solução</summary>

```
dados.json
```

(ou, de forma equivalente, `./dados.json`)

Como os dois arquivos estão na mesma pasta, não é preciso subir nem descer nenhum nível — só o nome do arquivo já resolve.

</details>

---

**5.** Dada a estrutura de pastas abaixo, escreva o caminho relativo que `resources/js/script.js` usaria para referenciar `resources/img/icone.svg`.

```
projeto/
└── resources/
    ├── js/
    │   └── script.js
    └── img/
        └── icone.svg
```

<details>
<summary>Sugestão de solução</summary>

```
../img/icone.svg
```

A partir de `resources/js/`, `../` sobe um nível para `resources/`, e daí desce para `img/icone.svg`.

</details>

---

**6.** Um `index.html`, na raiz do projeto, tem `<img src="/resources/img/logo.svg">` (com uma barra `/` no início). O site funciona no computador do desenvolvedor, mas quebra ao ser publicado em `meusite.com/portfolio/`. Explique por que, e corrija.

<details>
<summary>Sugestão de solução</summary>

```html
<img src="resources/img/logo.svg">
```

O caminho começando com `/` é **absoluto**: ele sempre parte da raiz do domínio (`meusite.com/`), não da pasta onde o site foi publicado. Publicado em `meusite.com/portfolio/`, o navegador procura a imagem em `meusite.com/resources/img/logo.svg` (que não existe) em vez de `meusite.com/portfolio/resources/img/logo.svg`. Removendo a `/` inicial, o caminho passa a ser relativo à pasta do próprio `index.html`, funcionando em qualquer subpasta.

</details>

---

**7.** As linhas abaixo estão embaralhadas. Reordene-as para formar um `<head>` válido que carrega uma folha de estilos externa antes do título da página.

```html
<link rel="stylesheet" href="resources/css/style.css">
</head>
<head>
<title>Minha Página</title>
<meta charset="UTF-8">
```

<details>
<summary>Sugestão de solução</summary>

```html
<head>
<meta charset="UTF-8">
<title>Minha Página</title>
<link rel="stylesheet" href="resources/css/style.css">
</head>
```

A ordem exata entre `<meta>`, `<title>` e `<link>` não é obrigatória pelo HTML (o navegador processa qualquer ordem dentro do `<head>`), mas todos precisam estar dentro da tag `<head>` de abertura e fechamento — é essa parte que a pergunta testa.

</details>

---

**8.** Um projeto tem `index.html` na raiz e uma segunda página `contato.html`, também na raiz. Os dois arquivos precisam usar o mesmo `resources/css/style.css`. Escreva a tag `<link>` que `contato.html` usaria — é igual à do `index.html`, ou muda?

<details>
<summary>Sugestão de solução</summary>

```html
<link rel="stylesheet" href="resources/css/style.css">
```

É exatamente igual. Como `contato.html` também está na raiz do projeto (mesma pasta que `index.html`), o caminho relativo até `resources/css/style.css` é o mesmo para os dois arquivos — é isso que permite os dois compartilharem a mesma folha de estilos sem duplicar nada.

</details>

---

## Desafios

**9.** Um projeto de portfólio tem a estrutura abaixo. Escreva as três tags (`<link>`, `<img>` e `<script>`) que `index.html` usaria para referenciar, respectivamente, `estilos.css`, `foto-perfil.jpg` e `principal.js`.

```
portfolio/
├── index.html
└── resources/
    ├── css/
    │   └── estilos.css
    ├── img/
    │   └── foto-perfil.jpg
    └── js/
        └── principal.js
```

<details>
<summary>Sugestão de solução</summary>

```html
<link rel="stylesheet" href="resources/css/estilos.css">
<img src="resources/img/foto-perfil.jpg" alt="Foto de perfil">
<script src="resources/js/principal.js"></script>
```

As três seguem o mesmo padrão: caminho relativo à raiz do projeto (onde `index.html` está), descendo direto para dentro de `resources/` e depois para a subpasta correspondente ao tipo de arquivo.

</details>

---

**10.** Um projeto tem uma pasta extra para páginas internas: `paginas/sobre.html` (uma pasta abaixo da raiz), enquanto `resources/` continua na raiz, ao lado de `index.html`. Escreva o `<link>` que `paginas/sobre.html` usaria para referenciar `resources/css/style.css`.

```
projeto/
├── index.html
├── paginas/
│   └── sobre.html
└── resources/
    └── css/
        └── style.css
```

<details>
<summary>Sugestão de solução</summary>

```html
<link rel="stylesheet" href="../resources/css/style.css">
```

`sobre.html` está dentro de `paginas/`, uma pasta abaixo da raiz — por isso o caminho precisa começar subindo um nível (`../`) para voltar à raiz do projeto, e só então descer para `resources/css/style.css`. Sem o `../`, o navegador procuraria por `paginas/resources/css/style.css`, que não existe.

</details>

---

**11.** Monte, do zero, a estrutura de pastas e os três arquivos (`index.html`, `resources/css/style.css` vazio, `resources/js/script.js` vazio) para uma página simples com um `<h1>` de título, referenciando corretamente o CSS e o JS externos. Depois, abra as ferramentas de desenvolvedor do navegador (aba **Network**) e confirme visualmente que as duas requisições (`style.css` e `script.js`) aparecem na lista ao carregar a página.

<details>
<summary>Sugestão de solução</summary>

```
meu-projeto/
├── index.html
└── resources/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Minha Página</title>
  <link rel="stylesheet" href="resources/css/style.css">
</head>
<body>
  <h1>Minha Página</h1>

  <script src="resources/js/script.js"></script>
</body>
</html>
```

Com `style.css` e `script.js` vazios, a página carrega sem erro visual nenhum, mas a aba **Network** mostra as duas requisições separadas — confirmando que o navegador realmente buscou os dois arquivos externos, mesmo que eles ainda não façam nada.

</details>
