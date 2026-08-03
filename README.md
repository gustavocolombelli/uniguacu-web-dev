# Desenvolvimento Web

Material de aula da disciplina de Desenvolvimento Web, do curso de Engenharia de Software e Análise e Desenvolvimento de Sistemas.

## Por onde começar

- **[`roadmap/roadmap.md`](roadmap/roadmap.md)** — cronograma completo do semestre: o que é visto em cada encontro, o diagrama do cronograma, a composição da nota final e a rubrica avaliativa dos trabalhos.
- **[`projeto/projeto.md`](projeto/projeto.md)** — especificação do projeto da disciplina (a Pokédex construída ao longo do semestre): [diagrama de caso de uso](projeto/diagramas/01-caso-de-uso.svg), histórias de usuário, requisitos não funcionais e a API consumida.
- **`aula-XX/`** — material de cada encontro, publicado à medida que as aulas acontecem.

## Feedback

Tem algo que gostou ou que acha que poderia melhorar nas aulas? Responda o [formulário de melhoria contínua](https://forms.gle/FXZx8VVWTJAmjYSW7) — é rápido, anônimo e ajuda a ajustar o ritmo e o conteúdo das próximas aulas.

## Estrutura de arquivos

```
.
├── roadmap/
│   ├── roadmap.md          # cronograma, avaliação e rubrica do semestre
│   └── diagramas/          # diagramas Mermaid usados no roadmap
├── projeto/
│   ├── projeto.md                        # visão geral do projeto da disciplina
│   ├── especificacao-funcionalidades.md  # diagrama de caso de uso, US01-US08 e RNF01-RNF06
│   ├── diagramas/                        # diagramas Mermaid usados na especificação
│   └── apis.md                           # PokeAPI: endpoints e estratégia de uso
├── aula-01/
│   ├── aula-01.md          # conteúdo da aula (exercícios embutidos)
│   └── diagramas/          # diagramas Mermaid usados na aula
├── aula-02/
│   ├── aula-02.md          # conteúdo da aula
│   ├── diagramas/          # diagramas Mermaid usados na aula
│   └── exercicios/
│       └── exercicios-02.md
└── aula-XX/                # demais encontros, conforme publicados
```

Cada `aula-XX.md` traz teoria, exemplos de código e referências. Os exercícios (com dica/gabarito) ficam embutidos no próprio `aula-XX.md` ou em `exercicios/exercicios-XX.md`, dependendo da aula. Os diagramas dentro de `diagramas/` já vêm embutidos no `.md` correspondente — não é preciso abri-los separadamente, exceto para reaproveitá-los em outro material.
