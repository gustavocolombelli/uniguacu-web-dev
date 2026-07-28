# Exercícios — Aula 04

[Desenvolvimento Web](../../README.md) > [Aula 04](../aula-04.md) > Exercícios

Lista de exercícios de reforço, baseada inteiramente no conteúdo da [Aula 04](../aula-04.md): formulários, tipos de `input`, validação nativa do HTML5, tabelas e mídia (`img`, `audio`, `video`).

Tente resolver cada exercício sozinho antes de abrir a sugestão de solução.

---

## Questão para discussão em sala

Você está construindo um formulário de login com campos de usuário e senha. Qual configuração de envio é a mais adequada, e por quê?

- **A.** `method="get"`, porque é mais simples de implementar e de testar.
- **B.** `method="post"`, porque não expõe os dados enviados na URL, evitando que a senha fique visível no histórico do navegador.
- **C.** Não definir `method`, deixando o navegador escolher automaticamente o mais seguro.
- **D.** `method="get"` combinado com `type="password"` no input, já que esse tipo criptografa o valor antes do envio.

<details>
<summary>Resposta</summary>

Alternativa **B**. `method="post"` envia os dados no corpo da requisição, sem expô-los na URL — essencial para qualquer dado sensível, como senhas.

> [!IMPORTANT]
> A alternativa D é um erro conceitual comum: `type="password"` só mascara o valor **visualmente** na tela, ele não criptografa nada. Sem `method="post"` (e HTTPS), a senha ainda trafega de forma exposta.

</details>

---

**1.** As linhas abaixo estão embaralhadas. Reordene-as para formar um formulário simples com um campo de e-mail obrigatório e um botão de envio.

```html
</form>
<input type="email" id="email" name="email" required>
<form action="/contato" method="post">
<button type="submit">Enviar</button>
<label for="email">E-mail</label>
```

<details>
<summary>Sugestão de solução</summary>

```html
<form action="/contato" method="post">
<label for="email">E-mail</label>
<input type="email" id="email" name="email" required>
<button type="submit">Enviar</button>
</form>
```

Pense na ordem de abertura: primeiro `<form>`, depois o `<label>` associado ao campo, depois o `<input>` correspondente, depois o botão de envio, e por último a tag de fechamento `</form>`.

</details>

---

**2.** As linhas abaixo estão embaralhadas. Reordene-as para formar um `<select>` com três opções de método de entrega.

```html
<option value="retirada">Retirada na loja</option>
</select>
<option value="expresso">Entrega expressa</option>
<select id="entrega" name="entrega">
<option value="padrao">Entrega padrão</option>
```

<details>
<summary>Sugestão de solução</summary>

```html
<select id="entrega" name="entrega">
<option value="padrao">Entrega padrão</option>
<option value="expresso">Entrega expressa</option>
<option value="retirada">Retirada na loja</option>
</select>
```

O `<select>` precisa abrir antes de qualquer `<option>`, e todas as `<option>` ficam entre a abertura e o `</select>` de fechamento — a ordem entre as opções em si é livre, pois nenhuma depende da outra.

</details>

---

**3.** Para cada dado abaixo, indique o `type` de `<input>` mais adequado: (a) data de nascimento, (b) valor de uma compra em reais, (c) senha de acesso, (d) telefone para contato.

<details>
<summary>Sugestão de solução</summary>

(a) `type="date"` — ativa o seletor de calendário nativo.
(b) `type="number"` — aceita `min`/`max`/`step` para valores numéricos.
(c) `type="password"` — mascara o valor digitado na tela.
(d) `type="tel"` — ativa teclado numérico no celular; pode ser combinado com `pattern` para validar o formato.

</details>

---

**4.** O campo abaixo aceita qualquer texto como CEP. Adicione os atributos necessários para exigir o formato brasileiro `00000-000` antes do envio.

```html
<input type="text" id="cep" name="cep">
```

<details>
<summary>Sugestão de solução</summary>

```html
<input type="text" id="cep" name="cep" pattern="\d{5}-\d{3}" required>
```

`pattern` define a expressão regular que o valor precisa satisfazer (cinco dígitos, hífen, três dígitos). `required` garante que o campo não fique vazio antes de ser validado pelo `pattern`.

</details>

---

**5.** O campo de idade abaixo aceita qualquer número, inclusive negativos ou maiores que 120. Adicione atributos para limitar a faixa entre 0 e 120.

```html
<input type="number" id="idade" name="idade">
```

<details>
<summary>Sugestão de solução</summary>

```html
<input type="number" id="idade" name="idade" min="0" max="120" required>
```

`min` e `max` definem os limites aceitos pelo navegador antes do envio — valores fora dessa faixa disparam a mensagem de erro nativa, sem precisar de nenhum código adicional.

</details>

---

**6.** O trecho abaixo tem um campo sem `label` associado corretamente. Explique o problema de acessibilidade e corrija.

```html
<p>Nome completo</p>
<input type="text" id="nome" name="nome">
```

<details>
<summary>Sugestão de solução</summary>

```html
<label for="nome">Nome completo</label>
<input type="text" id="nome" name="nome">
```

Um `<p>` não tem nenhuma relação estrutural com o campo — um leitor de tela anuncia o `input` sem dizer o que ele representa, e clicar no texto não foca o campo. Trocar por `<label for="nome">` conectado ao `id="nome"` do `input` resolve os dois problemas.

</details>

---

**7.** O trecho de áudio abaixo não exibe nenhum controle na tela e não tem conteúdo alternativo. Corrija os dois problemas.

```html
<audio>
  <source src="podcast-aula.mp3" type="audio/mpeg">
</audio>
```

<details>
<summary>Sugestão de solução</summary>

```html
<audio controls>
  <source src="podcast-aula.mp3" type="audio/mpeg">
  Seu navegador não suporta áudio embutido.
</audio>
```

`controls` exibe os controles nativos de reprodução (play, pausa, volume). O texto depois do `<source>` só aparece quando nenhuma fonte pode ser reproduzida — é o conteúdo alternativo para navegadores sem suporte.

</details>

---

**8.** Sem testar no navegador, responda: o que acontece ao tentar enviar um formulário com o campo abaixo preenchido com o valor `15`?

```html
<input type="number" id="idade" name="idade" min="18" max="65" required>
```

<details>
<summary>Sugestão de solução</summary>

O navegador bloqueia o envio do formulário e exibe uma mensagem de erro nativa (algo como "O valor deve ser maior ou igual a 18"), com o foco automaticamente voltando para esse campo. Isso acontece porque `15` é menor que o `min="18"` definido, mesmo o campo não estando vazio.

</details>

---

**9.** Em suas palavras, explique por que a validação nativa do HTML5 (`required`, `pattern`, etc.) não é suficiente sozinha para proteger um sistema real, mesmo sendo útil para a experiência do usuário.

<details>
<summary>Sugestão de solução</summary>

Qualquer pessoa pode desativar o JavaScript do navegador, editar o HTML antes de enviar, ou enviar uma requisição diretamente para a URL da `action` do formulário — nesses casos, os atributos de validação do HTML nunca chegam a ser avaliados. Por isso o servidor precisa sempre revalidar os dados recebidos, independente do que o navegador já checou.

</details>

---

## Desafios

**10.** Monte, do zero, um formulário de cadastro de usuário com: nome (texto, obrigatório), e-mail (obrigatório, validado nativamente), senha (mínimo de 8 caracteres, obrigatória), data de nascimento (`type="date"`) e um `select` com pelo menos duas opções para "Como conheceu o curso". Garanta que todo campo tenha um `<label>` associado corretamente via `for`/`id`.

<details>
<summary>Sugestão de solução</summary>

```html
<form action="/cadastro" method="post">
  <label for="nome">Nome completo</label>
  <input type="text" id="nome" name="nome" required>

  <label for="email">E-mail</label>
  <input type="email" id="email" name="email" required>

  <label for="senha">Senha (mín. 8 caracteres)</label>
  <input type="password" id="senha" name="senha" minlength="8" required>

  <label for="nascimento">Data de nascimento</label>
  <input type="date" id="nascimento" name="nascimento">

  <label for="origem">Como conheceu o curso?</label>
  <select id="origem" name="origem">
    <option value="redes-sociais">Redes sociais</option>
    <option value="indicacao">Indicação de amigo</option>
    <option value="site">Site da instituição</option>
  </select>

  <button type="submit">Cadastrar</button>
</form>
```

Cada campo segue o par `<label for="x">` + `<input id="x">`, testando a validação nativa no navegador a cada campo novo adicionado.

</details>

---

**11.** Monte uma tabela de comparação de planos com `caption`, `thead` e `tbody`, comparando três planos (nome, preço mensal e um recurso incluído).

<details>
<summary>Sugestão de solução</summary>

```html
<table>
  <caption>Planos disponíveis</caption>
  <thead>
    <tr>
      <th>Plano</th>
      <th>Preço mensal</th>
      <th>Recurso incluído</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Básico</td>
      <td>R$ 29,90</td>
      <td>1 usuário</td>
    </tr>
    <tr>
      <td>Padrão</td>
      <td>R$ 59,90</td>
      <td>5 usuários</td>
    </tr>
    <tr>
      <td>Premium</td>
      <td>R$ 99,90</td>
      <td>Usuários ilimitados</td>
    </tr>
  </tbody>
</table>
```

Os títulos das colunas ficam em `<th>`, dentro do `<thead>`; cada linha de dado fica em `<tbody>`, usando `<td>` para as células comuns.

</details>

---

**12.** Monte uma seção de galeria de mídia (`<section>`) com uma imagem com `alt` descritivo, um player de áudio com `controls` e conteúdo alternativo, e um player de vídeo com `controls` e conteúdo alternativo.

<details>
<summary>Sugestão de solução</summary>

```html
<section>
  <h2>Galeria do workshop</h2>

  <img src="turma-workshop.jpg" alt="Participantes do workshop reunidos em volta de um notebook">

  <audio controls>
    <source src="depoimento-aluno.mp3" type="audio/mpeg">
    Seu navegador não suporta áudio embutido.
  </audio>

  <video controls width="480">
    <source src="resumo-workshop.mp4" type="video/mp4">
    Seu navegador não suporta vídeo embutido.
  </video>
</section>
```

Cada mídia segue o mesmo princípio: `alt` descreve a imagem para quem não pode vê-la, e o texto dentro de `<audio>`/`<video>` é o conteúdo alternativo, exibido apenas se nenhum `<source>` puder ser reproduzido.

</details>
