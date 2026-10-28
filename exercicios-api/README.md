# Exercícios — Consumindo APIs com HTML, CSS e JavaScript puro

[Desenvolvimento Web](../README.md) > Exercícios de API

Dez exercícios básicos de consulta a APIs públicas. Use **somente HTML, CSS e JavaScript puro** (sem bibliotecas, frameworks ou `npm`). Nenhuma das APIs exige chave de acesso.

**Como entregar:** crie uma pasta `resolucao/` ao lado deste arquivo e, dentro dela, um arquivo `exNN-nome.html` por exercício (com o JavaScript em `<script>` ou em um `.js` próprio) e um `style.css`. Abra o HTML direto no navegador e use o console (F12) e a aba *Network* para conferir as respostas.

**Requisitos comuns a todos:**

- Use `fetch` com `async/await` e `try/catch`.
- Mostre uma mensagem de "Carregando..." enquanto a requisição não termina.
- Mostre uma mensagem de erro amigável para o usuário (nunca deixe só o erro no console).
- Estilize com CSS: a tela deve ficar legível e funcionar em tela de celular.

> [!TIP]
> Antes de programar, abra a URL da API no navegador e olhe o JSON que ela devolve. Saber o formato da resposta é metade do exercício.

---

## Exercício 1 — Buscar CEP

**API:** `https://viacep.com.br/ws/{cep}/json/`

Crie uma página com um campo de texto para o CEP e um botão **Buscar**. Ao clicar, consulte o ViaCEP e mostre abaixo do botão o logradouro, o bairro, a cidade e a UF.

- Remova qualquer caractere que não seja número antes de consultar.
- Se o CEP não tiver 8 dígitos, mostre um aviso e **não** faça a requisição.
- Para um CEP inexistente (ex.: `99999999`), o ViaCEP responde com `{ "erro": true }`. Trate esse caso.

**Dica:** teste também `01001000`.

---

## Exercício 2 — Formulário que se preenche sozinho

**API:** ViaCEP

Monte um formulário de endereço com os campos CEP, rua, bairro, cidade, UF e número. Sem botão de busca: assim que o usuário digitar o 8º número do CEP, a consulta é feita e rua, bairro, cidade e UF são preenchidos automaticamente (esses campos ficam somente leitura). Depois do preenchimento, o foco vai para o campo **Número**.

- Aplique uma máscara enquanto o usuário digita: `00000-000`.
- Se o CEP não existir, mostre o aviso e limpe os campos.

**Dica:** use o evento `input` e `slice` para a máscara.

---

## Exercício 3 — Descobrir o CEP pelo endereço

**API:** `https://viacep.com.br/ws/{UF}/{cidade}/{logradouro}/json/`

Crie três campos (UF, cidade, rua) e um botão **Buscar**. Mostre em uma lista todos os CEPs encontrados, no formato `01310-100 — Avenida Paulista, Bela Vista`.

- A rua precisa ter pelo menos 3 letras; valide antes de consultar.
- Se a lista vier vazia, mostre "Nenhum resultado".
- Cidade e rua podem ter espaços e acentos (ex.: `São Paulo`). Pesquise como preparar o texto para ir na URL.

---

## Exercício 4 — Estados e cidades

**API:** IBGE — `https://servicodados.ibge.gov.br/api/v1/localidades/estados` e `.../estados/{UF}/municipios`

Crie dois `<select>`: **Estado** e **Cidade**.

- Ao abrir a página, carregue os estados em ordem alfabética.
- Ao escolher um estado, carregue as cidades dele no segundo select.
- Enquanto nenhum estado estiver escolhido, o select de cidade fica desabilitado.
- Ao escolher a cidade, mostre abaixo o texto `Cidade - UF`.

---

## Exercício 5 — Cachorro aleatório

**API:** `https://dog.ceo/api/breeds/image/random`

Mostre a foto de um cachorro ao abrir a página. Um botão **Mostrar outro** troca a foto.

- Desabilite o botão enquanto a nova imagem estiver carregando (a requisição termina antes da imagem terminar de baixar; descubra qual evento do `<img>` avisa que ela carregou).
- A imagem não pode estourar a largura da tela.

---

## Exercício 6 — Conversor de moedas

**API:** `https://economia.awesomeapi.com.br/json/last/USD-BRL` (troque o par por `EUR-BRL`, `BTC-BRL`)

Crie um `<select>` com Dólar, Euro e Bitcoin, um campo numérico de quantidade e um botão **Converter**. Mostre a cotação de 1 unidade e o total em reais.

- Formate os valores como moeda brasileira (`R$ 5,12`) sem montar a string na mão. Pesquise `toLocaleString`.
- O campo `bid` vem como texto; converta para número antes de multiplicar.
- Não deixe converter quantidade vazia ou negativa.

---

## Exercício 7 — Card de Pokémon

**API:** `https://pokeapi.co/api/v2/pokemon/{nome-ou-numero}`

Crie um campo de busca e um botão. Mostre um card com a imagem, o número, o nome (com a primeira letra maiúscula), os tipos, a altura em metros e o peso em kg.

- A altura vem em decímetros e o peso em hectogramas; converta.
- Pressionar **Enter** no campo também faz a busca.
- Se o Pokémon não existir a API responde 404 e **não** lança erro sozinha. Descubra como detectar isso (`response.ok`).
- Estilize o card com borda, sombra e a cor de fundo mudando conforme o primeiro tipo (fogo, água, planta, outros).

---

## Exercício 8 — Lista com filtro

**API:** `https://jsonplaceholder.typicode.com/posts?_limit=30`

Carregue 30 posts e mostre apenas os títulos em uma lista. Acima dela, um campo de texto filtra a lista **enquanto o usuário digita**.

- Faça a requisição **uma vez só**; o filtro trabalha sobre o array já carregado (`filter`).
- Ignore maiúsculas e minúsculas.
- Se nada bater com o filtro, mostre "Nada encontrado".
- Mostre quantos itens estão aparecendo (`12 de 30`).

---

## Exercício 9 — Feriados nacionais

**API:** `https://brasilapi.com.br/api/feriados/v1/{ano}`

Crie um campo de ano (já preenchido com o ano atual) e um botão **Ver feriados**. Liste os feriados no formato `25/12/2026 — Natal`.

- A data vem como `2026-12-25`; reformate sem usar bibliotecas.
- Para um ano inválido (ex.: `1500`) a API responde com erro. Trate.
- Destaque com uma cor diferente os feriados que caem em fim de semana. Pesquise `new Date(...).getDay()`.

---

## Exercício 10 — Histórico de consultas

**API:** ViaCEP

Faça uma busca de CEP como no Exercício 1 e acrescente um histórico das **5 últimas consultas** bem-sucedidas, mostrando `CEP — Cidade/UF`.

- Guarde o histórico no `localStorage`, para ele continuar depois de recarregar a página (lembre que o `localStorage` só guarda texto: `JSON.stringify` / `JSON.parse`).
- Clicar em um item do histórico refaz a consulta.
- Não repita o mesmo CEP: se ele já estiver no histórico, ele sobe para o topo.
- Um botão **Limpar histórico** apaga tudo.

---

## Desafio extra

Reúna os exercícios 4 e 2 em uma única página de cadastro: o usuário digita o CEP e o estado e a cidade são selecionados automaticamente nos dois `<select>` do IBGE.

---

## Gabarito

Há uma resolução de referência em [`solucao/`](./solucao), com o essencial de cada exercício (os extras de cada enunciado ficam por sua conta). Só abra depois de tentar resolver cada exercício sozinho.
