# Exercício — Jogo de Xadrez

## Objetivo

Desenvolver um **jogo de xadrez funcional para navegador** utilizando **HTML, CSS e JavaScript**, aplicando conceitos de estruturação de páginas, estilização, manipulação do DOM, eventos, estruturas de dados, funções e lógica de programação.

O jogo deverá permitir que dois jogadores disputem uma partida de xadrez no navegador.

---

## Tecnologias

Utilize exclusivamente:

- HTML5
- CSS3
- JavaScript

Não utilizar frameworks ou bibliotecas como React, Vue, Angular ou similares.

---

## 1. Tabuleiro

Crie um tabuleiro de xadrez com **8 × 8 casas**, totalizando 64 posições.

O tabuleiro deverá:

- Alternar entre duas cores;
- Possuir as coordenadas das linhas e colunas;
- Ser responsivo;
- Posicionar corretamente todas as peças no início da partida.

A posição inicial deverá seguir as regras oficiais do xadrez.

---

## 2. Peças

Utilize imagens SVG públicas para representar as peças.

Os assets podem ser obtidos no repositório do Lichess. Escolha livremente qual conjunto de peças utilizar:

[Lichess — Chess Pieces SVG](https://github.com/lichess-org/lila/tree/master/public/piece)

As peças devem ser identificadas como:

```text
wK = Rei branco
wQ = Dama branca
wR = Torre branca
wB = Bispo branco
wN = Cavalo branco
wP = Peão branco

bK = Rei preto
bQ = Dama preta
bR = Torre preta
bB = Bispo preto
bN = Cavalo preto
bP = Peão preto
```

---

## 3. Representação do tabuleiro

O estado do jogo deverá ser armazenado em JavaScript.

Uma possibilidade é utilizar uma matriz:

```javascript
const board = [
    ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
];
```

Também deverá ser controlado o jogador atual:

```javascript
let currentPlayer = 'white';
```

---

# 4. Movimentação das peças

O jogador deverá conseguir selecionar e movimentar as peças utilizando **Drag and Drop**.

Documentação de apoio:

[MDN — HTML Drag and Drop API](https://developer.mozilla.org/pt-BR/docs/Web/API/HTML_Drag_and_Drop_API)

O suporte a toque (celular) não é obrigatório.

Utilize os eventos e recursos da API, como:

- `dragstart`;
- `dragover`;
- `drop`;
- `dragend`;
- `dataTransfer`.

A peça deverá carregar informações suficientes para identificar sua posição de origem.

Ao realizar o `drop`, o sistema deverá identificar:

```text
Origem → Destino

e2 → e4
```

A jogada **não deve ser executada diretamente pelo evento `drop`**. Ela deverá passar pela lógica de validação do jogo.

---

# 5. Regras das peças

Implemente corretamente as regras de movimentação.

### Peão

- Move uma casa para frente;
- Pode mover duas casas na primeira movimentação;
- Captura diagonalmente;
- Não pode atravessar outras peças;
- Deve permitir promoção ao chegar à última linha.

### Torre

- Move horizontalmente ou verticalmente;
- Não pode atravessar outras peças.

### Bispo

- Move somente pelas diagonais;
- Não pode atravessar outras peças.

### Cavalo

- Move em formato de "L";
- Pode saltar outras peças.

### Dama

- Combina os movimentos da torre e do bispo;
- Não pode atravessar outras peças.

### Rei

- Move uma casa em qualquer direção;
- Não pode ir para uma casa atacada por peça adversária.

### Regra geral

Nenhuma peça pode realizar uma jogada que deixe o próprio rei em xeque (isso inclui peças "cravadas", que protegem o rei).

---

# 6. Captura

Quando uma peça for movimentada para uma casa ocupada por uma peça adversária:

- A peça adversária deverá ser removida;
- A peça que realizou a captura deverá ocupar a posição;
- O estado do tabuleiro deverá ser atualizado.

Não será permitido capturar uma peça da mesma cor.

---

# 7. Turnos

A partida deverá alternar entre:

```text
Brancas → Pretas → Brancas → Pretas...
```

O jogador somente poderá movimentar peças pertencentes à sua própria cor.

A interface deverá informar o jogador atual:

```text
Vez das brancas
```

ou:

```text
Vez das pretas
```

O turno somente deverá ser alterado após uma **jogada válida**.

---

# 8. Validação das jogadas

Toda movimentação deverá ser validada antes de alterar o estado do tabuleiro.

Crie uma função responsável por essa validação, por exemplo:

```javascript
function isValidMove(board, from, to) {
    // regras da jogada
}
```

A validação deverá verificar, no mínimo:

- Se existe uma peça na posição de origem;
- Se a peça pertence ao jogador atual;
- Se o movimento é permitido para aquela peça;
- Se o destino não possui uma peça da mesma cor;
- Se o caminho está livre quando necessário;
- Se a jogada não deixa o próprio rei em xeque.

Movimentos inválidos deverão ser rejeitados e o tabuleiro deverá permanecer inalterado.

---

# 9. Xeque

O sistema deverá identificar quando o rei de um jogador está sendo ameaçado por uma peça adversária.

Exemplo:

```text
⚠ XEQUE!
```

A situação de xeque deverá ser considerada durante a validação das jogadas.

---

# 10. Xeque-mate

O sistema deverá identificar o **xeque-mate**.

Um jogador estará em xeque-mate quando:

1. Seu rei estiver em xeque;
2. Não existir nenhuma jogada legal capaz de remover o xeque.

Quando isso ocorrer, a partida deverá ser encerrada.

Exemplo:

```text
XEQUE-MATE!

As brancas venceram.
```

---

# 11. Empate

Implemente pelo menos o empate por **afogamento (stalemate)**.

Ocorre quando:

- O jogador não está em xeque;
- Não possui nenhuma jogada legal disponível.

Exemplo:

```text
EMPATE!

Afogamento.
```

---

# 12. Promoção

Quando um peão alcançar a última linha do tabuleiro, o jogador deverá escolher a peça para a qual deseja promovê-lo:

- Dama;
- Torre;
- Bispo;
- Cavalo.

Exemplo:

```text
Escolha a promoção:

[ Dama ]
[ Torre ]
[ Bispo ]
[ Cavalo ]
```

A escolha deve ocorrer antes da troca de turno, e o xeque deve ser verificado depois da promoção.

---

# 13. Interface

A aplicação deverá apresentar, no mínimo:

- Título do jogo;
- Tabuleiro;
- Peças;
- Jogador atual;
- Destaque da peça sendo movimentada;
- Indicação de jogada inválida;
- Indicação de xeque;
- Indicação de xeque-mate;
- Indicação de empate;
- Botão **Nova partida**, que reinicia todo o estado do jogo.

O tabuleiro deverá funcionar em diferentes tamanhos de tela.

---

# 14. Organização do projeto

Organize os arquivos de forma semelhante a:

```text
chess/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── board.js
│   ├── pieces.js
│   ├── rules.js
│   └── game.js
│
└── assets/
    └── chess/
        ├── wK.svg
        ├── wQ.svg
        ├── wR.svg
        ├── wB.svg
        ├── wN.svg
        ├── wP.svg
        ├── bK.svg
        ├── bQ.svg
        ├── bR.svg
        ├── bB.svg
        ├── bN.svg
        └── bP.svg
```

A organização pode ser diferente, desde que o código esteja devidamente separado e organizado.

---

# Requisitos mínimos

O projeto deverá possuir:

- [ ] Tabuleiro 8 × 8;
- [ ] Posição inicial correta;
- [ ] Peças em SVG;
- [ ] Drag and Drop;
- [ ] Controle de turnos, com indicação do jogador atual;
- [ ] Movimentação de todas as peças;
- [ ] Captura;
- [ ] Validação das jogadas (incluindo não deixar o próprio rei em xeque);
- [ ] Bloqueio de movimentos inválidos, com indicação na tela;
- [ ] Destaque da peça sendo movimentada;
- [ ] Xeque;
- [ ] Xeque-mate;
- [ ] Promoção do peão;
- [ ] Empate por afogamento;
- [ ] Botão para iniciar nova partida;
- [ ] Interface responsiva.

---

# Desafios extras

Para alunos que desejarem ir além dos requisitos obrigatórios:

### Roque

Implementar:

- Roque pequeno;
- Roque grande;
- Todas as restrições relacionadas ao roque.

### En passant

Implementar a captura especial **en passant**.

### Histórico

Exibir as jogadas realizadas:

```text
1. e4 e5
2. Nf3 Nc6
3. Bb5 a6
```

Uma possibilidade é armazenar o histórico como uma lista com um objeto por jogada:

```javascript
const history = [
    { from: 'e2', to: 'e4', piece: 'wP', captured: null, notation: 'e4' },
    { from: 'e7', to: 'e5', piece: 'bP', captured: null, notation: 'e5' },
    { from: 'g1', to: 'f3', piece: 'wN', captured: null, notation: 'Nf3' }
];
```

Atributos:

- `from`: casa de origem da jogada (ex.: `'e2'`);
- `to`: casa de destino da jogada (ex.: `'e4'`);
- `piece`: código da peça movimentada (ex.: `'wP'`);
- `captured`: código da peça capturada, ou `null` se não houve captura;
- `notation`: texto da jogada em notação algébrica, exibido no histórico (ex.: `'Nf3'`).

Para exibir, agrupe as jogadas de duas em duas (brancas e pretas) e numere cada par.

---

# Entrega

O aluno deverá entregar:

1. Código-fonte completo;
2. Assets utilizados;
3. README.md contendo:
   - Como executar o projeto;
   - Estrutura do projeto;
   - Como o estado do tabuleiro é armazenado;
   - Como as jogadas são validadas;
   - Regras implementadas;
   - Funcionalidades extras implementadas.

---

## Observação

O objetivo principal não é apenas criar uma interface visual de um tabuleiro.

O sistema deverá **implementar as regras do xadrez em JavaScript**, de forma que uma jogada inválida seja efetivamente rejeitada pela lógica da aplicação.

Por exemplo, não basta permitir que uma torre seja arrastada de `a1` para `a8`. O sistema deverá verificar se o movimento é permitido e se existe alguma peça bloqueando o caminho.