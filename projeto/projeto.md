# Projeto da Disciplina — Pokédex Web

[Desenvolvimento Web](../README.md) > Projeto

**Disciplina:** Desenvolvimento Web
**Produto/Artefato do Saber:** Aplicação web funcional (front-end) que consome APIs externas.

---

## 1. O que é este projeto

É a aplicação que você constrói ao longo de todo o semestre, entrega em partes, e apresenta ao final da disciplina. As aulas fazem referência a ela desde a aula-03 ("a estrutura HTML da sua própria aplicação") — este documento formaliza **o quê** construir, para que as decisões de cada aula (tag semântica, seletor CSS, chamada `fetch`, chave de `localStorage`) tenham sempre um destino concreto.

O projeto é uma **Pokédex**: uma página que lista pokémons consumindo a [PokeAPI](https://pokeapi.co/), permite favoritar pokémons e mantém essa lista de favoritos salva no navegador entre sessões, usando `localStorage`.

> [!NOTE]
> Por que PokeAPI? É gratuita, não exige autenticação e devolve JSON previsível — dá para focar no aprendizado de `fetch`, JSON e `localStorage` sem lidar com chaves de API, CORS bloqueado ou limites de uso agressivos.

## 2. Escopo

- **Front-end puro**: HTML + CSS + JavaScript, sem framework e sem build tool.
- **Sem back-end próprio**: os dados de pokémons vêm da PokeAPI (ver [`apis.md`](apis.md)); os favoritos vivem só no `localStorage` do navegador de quem acessa.
- Todos os requisitos — o que a aplicação deve fazer e as qualidades que ela deve ter — estão em [`especificacao-funcionalidades.md`](especificacao-funcionalidades.md).

## 3. Como o projeto se encaixa no cronograma

O [roadmap da disciplina](../roadmap/roadmap.md) reserva encontros específicos para trabalhar e apresentar o projeto:

| Encontro | Marco do projeto | O que deve estar pronto |
|---|---|---|
| 3º–5º | Base estrutural | Estrutura HTML semântica (US01, US04, US06) e estilização básica com CSS (seletores, box model, cores, tipografia) |
| 6º–9º | Layout e interatividade | Responsividade com Flexbox/Grid (RNF01) e primeiras interações em JavaScript (favoritar, busca — US03, US05) |
| 10º | **Trabalho 1 — checkpoint** | Estrutura completa navegável: listagem, paginação, busca e favoritar já funcionando, mesmo que ainda sem persistência real |
| 11º–17º | Consumo de API real | Integração com a PokeAPI via `fetch` (US01, US02, US04), persistência de favoritos em `localStorage` (US07) e tratamento assíncrono de erros (US08) |
| 18º | Laboratório de finalização | Revisão geral, correção de bugs, polimento — **🏁 Entrega Final** |
| 19º | **Trabalho 2 — apresentação final** | Projeto completo, todas as histórias de usuário e RNFs atendidos |

Isso não significa que cada requisito só pode ser tocado no encontro indicado — é só o ritmo esperado. Quem quiser adiantar (ex.: já integrar a API antes do 11º encontro) pode.

## 4. Sumário dos documentos

- [`especificacao-funcionalidades.md`](especificacao-funcionalidades.md) — o diagrama de caso de uso, todas as histórias de usuário (US01–US08, com critérios de aceite) e os requisitos não funcionais (RNF01–RNF06) da aplicação.
- [`apis.md`](apis.md) — como a PokeAPI funciona: endpoints, formato de resposta, limitações.

## 5. Critérios de avaliação

O projeto é avaliado pela [rubrica do roadmap](../roadmap/roadmap.md#4-rubrica-avaliativa-dos-trabalhos): entrega no prazo, boas práticas de programação, engajamento e competências técnicas. Os requisitos deste documento são a referência concreta para o critério **"competências técnicas"** — implementar US01–US08 corretamente, respeitando os RNFs.
