# Prompt para Geração de Aulas Didáticas a partir das Trilhas

Prompt reutilizável (copiar e colar em uma nova conversa) para gerar o material
de um encontro — combinando um arquivo `.md` de conteúdo com arquivos `.mmd`
de diagrama, aplicando técnicas de didática de programação com evidência na
literatura.

---

## 1. Por que separar .md e .mmd

- **`aula-XX.md`** — o texto da aula: teoria, código, exercícios. Renderiza
  nativamente no GitHub, inclusive blocos ```mermaid.
- **`diagramas/NN-nome.mmd`** — cada diagrama isolado em seu próprio arquivo
  Mermaid puro: fonte única, reaproveitável no `.md` e no template de
  apresentação Reveal.js, sem duplicar código de diagrama em dois lugares.

O `.md` referencia o diagrama copiando o conteúdo do `.mmd` dentro de um bloco
```mermaid``` (cópia manual, sem pipeline).

---

## 2. Técnicas pedagógicas aplicadas

Quatro técnicas com respaldo na literatura de ensino de programação foram
incorporadas à estrutura da aula:

- **PRIMM** (Predict–Run–Investigate–Modify–Make) — guia a apresentação de
  cada novo trecho de código: o aluno primeiro prevê o que o código faz,
  depois executa, investiga o funcionamento, modifica algo pequeno e só então
  cria algo novo. Substitui a exposição direta ("aqui está o código, aqui está
  a explicação") por um ciclo que exige previsão e investigação ativa.
- **Subgoal labels** — os exemplos de código trazem comentários curtos que
  nomeiam o objetivo de cada bloco (`// Etapa 1: validar entrada`), reduzindo
  a carga cognitiva de quem está lendo pela primeira vez.
- **Peer Instruction** — cada aula inclui uma questão de múltipla escolha para
  uso em sala, seguindo o protocolo: resposta individual → votação → discussão
  em grupo → nova votação → professor revela e explica.
- **Parsons Problems** — pelo menos um dos exercícios fáceis é um trecho de
  código embaralhado que o aluno deve reordenar, tirando o peso da sintaxe e
  focando na lógica.
  
---

## 3. Paleta de cores

Aplicada de forma consistente em todos os diagramas Mermaid e no template
Reveal.js, para que o material tenha uma identidade visual única entre aulas.

**Cor primária e secundária**

| Uso | Cor | Hex |
|---|---|---|
| Primária (títulos, destaques, links) | Azul | `#378ADD` |
| Secundária (ações, acentos) | Coral | `#D85A30` |

**Status do roadmap** (concluída / atual / futura)

| Status | Cor | Hex |
|---|---|---|
| Concluída | Verde | `#639922` |
| Atual (pulsante) | Âmbar | `#EF9F27` |
| Futura | Cinza | `#888780` |

**Paleta categórica** (mapas mentais e diagramas com múltiplos ramos —
vermelho fica reservado para erro/alerta, não entra aqui). A coluna "Texto"
indica a cor de fonte que garante contraste legível sobre aquele fundo —
nunca deixe o texto sem essa definição explícita, pois a cor padrão
calculada pelo Mermaid pode ficar praticamente invisível dependendo do tom
de fundo.

| Ramo | Cor | Hex | Texto |
|---|---|---|---|
| 1 | Roxo | `#7F77DD` | `#FFFFFF` |
| 2 | Verde-azulado | `#1D9E75` | `#FFFFFF` |
| 3 | Coral | `#D85A30` | `#FFFFFF` |
| 4 | Rosa | `#D4537E` | `#FFFFFF` |
| 5 | Azul | `#378ADD` | `#FFFFFF` |
| 6 | Verde | `#639922` | `#FFFFFF` |
| 7 | Âmbar | `#EF9F27` | `#2C2C2A` |

**Aplicação técnica**

Todo diagrama Mermaid deve abrir com esta diretiva de tema. Repare que
`primaryTextColor` e `secondaryTextColor` usam branco (as cores de fundo da
paleta são todas saturadas/escuras o suficiente para exigir texto claro), e
que as notas (`Note over`, usadas em sequenceDiagram) têm fundo e texto
próprios fixados, em vez de herdar a cor calculada automaticamente pelo tema
— é justamente essa herança automática que costuma deixar o texto ilegível:
```
%%{init: {'theme':'base', 'themeVariables': {
  'primaryColor': '#378ADD',
  'primaryTextColor': '#FFFFFF',
  'primaryBorderColor': '#185FA5',
  'secondaryColor': '#D85A30',
  'secondaryTextColor': '#FFFFFF',
  'tertiaryTextColor': '#2C2C2A',
  'lineColor': '#5F5E5A',
  'textColor': '#2C2C2A',
  'noteBkgColor': '#FFF6DA',
  'noteTextColor': '#2C2C2A',
  'noteBorderColor': '#D9B84A'
}}}%%
```

No template Reveal.js, as mesmas cores entram como variáveis CSS:
```css
:root {
  --r-background-color: #ffffff;
  --r-main-color: #2C2C2A;
  --r-heading-color: #0C447C;
  --r-link-color: #378ADD;
  --r-link-color-hover: #185FA5;

  --status-concluida: #639922;
  --status-atual: #EF9F27;
  --status-futura: #888780;
}
```

Em mapas mentais (`mindmap` do Mermaid) com múltiplos ramos, atribua uma cor
da paleta categórica por ramo (`cScale0`, `cScale1`, ...), sempre na mesma
ordem, para manter consistência entre aulas diferentes — **e também a cor de
texto correspondente daquele ramo** (`cScaleLabel0`, `cScaleLabel1`, ...),
conforme a coluna "Texto" da tabela acima, para o rótulo nunca ficar
invisível sobre o fundo do ramo. Exemplo para os 4 primeiros ramos:
```
  'cScale0': '#7F77DD', 'cScaleLabel0': '#FFFFFF',
  'cScale1': '#1D9E75', 'cScaleLabel1': '#FFFFFF',
  'cScale2': '#D85A30', 'cScaleLabel2': '#FFFFFF',
  'cScale3': '#D4537E', 'cScaleLabel3': '#FFFFFF'
```

---

## 4. Dados que você preenche antes de enviar

- **[DISCIPLINA]**: Sistemas Distribuídos / Desenvolvimento Web
- **[Nº DA AULA]**: ex. aula-03
- **[TIPO DE AULA]**: conteúdo regular / prova / apresentação de projeto
  *(se prova ou apresentação, ver seção 7 — não gera conteúdo novo)*
- **[ETAPA DA TRILHA]**: cole a linha correspondente da planilha (tema,
  competências, atividades, referências)
- **[RESUMO DA AULA ANTERIOR]**: 3-5 linhas do que já foi visto
- **[STACK/FERRAMENTAS DA AULA]**: tecnologias específicas desse encontro

---

## 5. O prompt

```
Você é um assistente pedagógico ajudando a preparar uma aula para um curso de
graduação em Engenharia de Software / Análise e Desenvolvimento de Sistemas.

Contexto:
- Disciplina: [DISCIPLINA]
- Aula: [Nº DA AULA]
- Tipo de aula: [TIPO DE AULA]
- Tema/etapa da trilha: [ETAPA DA TRILHA]
- O que já foi visto: [RESUMO DA AULA ANTERIOR]
- Stack/ferramentas desta aula: [STACK/FERRAMENTAS DA AULA]

Gere o material desta aula em dois tipos de arquivo, seguindo a estrutura da
seção 6 deste prompt:

1. Um arquivo aula-XX.md com o conteúdo completo da aula.
2. Um arquivo .mmd separado para cada diagrama ou infográfico usado na aula,
   nomeado como NN-descricao-curta.mmd (ex.: 01-fluxo-cliente-servidor.mmd).

Apresente cada arquivo claramente delimitado, com o caminho completo antes do
bloco de código, por exemplo:

### Arquivo: [disciplina]/aula-XX/aula-XX.md
```md
...conteúdo...
```

### Arquivo: [disciplina]/aula-XX/diagramas/01-nome.mmd
```mermaid
...conteúdo...
```

Diretrizes obrigatórias:
- Não faça referências de metodologias pedagógicas, o conteúdo gerado será acessado pelos alunos.
- Tom didático, leve e introdutório — sem complexidade além do que a etapa da
  trilha pede.
- Incremental: retome brevemente o que já foi visto antes de avançar. Não
  repita explicações completas de aulas anteriores.
- Fundamentos embutidos no contexto prático, nunca isolados em teoria pura.
- Diagramas simples e sem poluição visual (flowchart, sequenceDiagram,
  classDiagram ou mindmap conforme o conteúdo pedir).
- O exemplo de código principal da aula deve seguir o ciclo PRIMM: apresente
  o código e peça uma previsão do que ele faz, mostre o resultado da
  execução, investigue linha a linha o funcionamento, proponha uma pequena
  modificação guiada e finalize com um mini desafio de criação livre.
- Todo bloco de código de exemplo deve usar subgoal labels: comentários
  curtos que nomeiam o objetivo de cada trecho (ex. // Etapa 1: ler dados
  de entrada).
- Exercícios: 1 questão de Peer Instruction (múltipla escolha com 4
  alternativas plausíveis, para votação em sala), 4-5 exercícios fáceis
  (pelo menos 1 no formato Parsons Problem, com o código embaralhado para o
  aluno reordenar), 2-3 exercícios médios de escrita de código do zero.
  Gabarito/dica ocultos em <details><summary>...</summary>.
  Não mencione o que é facil e médio nos enunciados
- Callouts podem ser usados, caso necessário, em qualquer seção do arquivo
  — não são uma seção fixa própria, mas um recurso pontual de destaque.
  Não usar a sintaxe de alerta do GitHub (`> [!NOTE]` etc.): ela só
  renderiza com cor no GitHub.com, e o material é consumido pelos alunos
  em visualizadores diversos (VS Code, Obsidian, exportações para PDF/Word).
  Usar em vez disso um blockquote simples com emoji + negrito, que mantém
  o destaque visual em qualquer visualizador:
  - `> 📌 **Nota:** ...` — informação útil que o aluno deve saber mesmo
    passando os olhos rapidamente pelo conteúdo.
  - `> 💡 **Dica:** ...` — dica prática para fazer algo melhor ou mais
    facilmente.
  - `> ⚠️ **Importante:** ...` — informação-chave que o aluno precisa saber
    para atingir o objetivo daquele trecho.
- Não misturar conteúdo novo com dias de avaliação ou apresentação.
- Saída: apenas os arquivos pedidos, sem preâmbulo fora da estrutura.
```

---

## 6. Estrutura de pastas por aula

```
[disciplina]/aula-XX/
  aula-XX.md
  diagramas/
    01-nome-do-fluxo.mmd
    02-nome-do-infografico.mmd
```

---

## 6. Estrutura obrigatória do `aula-XX.md`

1. **Cabeçalho** — título, número, duração, 2-3 objetivos de aprendizagem
2. **Contextualização** — motivação prática, ligando com a aula anterior
3. **Conteúdo teórico incremental** — subtópicos curtos, explicação direta
4. **Diagrama(s)** — embutidos via ```mermaid, copiados do(s) .mmd
   correspondente(s)
5. **Exemplo de código — ciclo PRIMM**
   - *Predict*: pergunta guiada — "o que este código faz antes de rodar?"
   - *Run*: resultado esperado da execução
   - *Investigate*: explicação linha a linha, com subgoal labels nos
     comentários do código
   - *Modify*: pequena alteração proposta, guiada
   - *Make*: mini desafio de criação livre a partir do exemplo
6. **Infográfico-resumo** — diagrama Mermaid (mindmap ou blocos) condensando
   os pontos-chave, também com .mmd próprio
7. **Exercícios**
   - 1 questão de Peer Instruction (múltipla escolha, para votação em sala)
   - 4-5 exercícios fáceis, incluindo ao menos 1 Parsons Problem
   - 2-3 exercícios médios
   - Dificuldade crescente organiza a ordem interna dos exercícios, mas o
     enunciado não deve rotular nenhum item como "fácil" ou "médio"
   - Gabarito/dica em `<details><summary>`
8. **Referências** — bibliografia básica e complementar, alinhada à trilha
9. **Ponte para a próxima aula** — 1-2 linhas

> Callouts (`📌 Nota`, `💡 Dica`, `⚠️ Importante`) não são uma seção fixa
> desta lista — podem aparecer, caso necessário, dentro de qualquer uma
> das seções acima, sempre no formato blockquote descrito na seção 4.

---

## 7. Caso especial: aulas de avaliação ou apresentação

Se **[TIPO DE AULA]** for prova ou apresentação, gerar só um `.md` (sem
`.mmd`) com:

- Objetivo do dia e escopo/conteúdo cobrado
- Estrutura da avaliação/apresentação (tempo, formato, critérios)
- Orientações logísticas

Sem diagramas, sem exercícios, sem ciclo PRIMM — dia exclusivo, sem mistura
de pauta.
