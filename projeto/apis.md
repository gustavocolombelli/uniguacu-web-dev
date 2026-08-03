# API do Projeto — PokeAPI

[Desenvolvimento Web](../README.md) > [Projeto](projeto.md) > APIs

O projeto consome a [PokeAPI](https://pokeapi.co/), uma API REST pública e gratuita de dados sobre pokémons. Este documento cobre só o que o projeto usa dela — a documentação oficial completa está em https://pokeapi.co/docs/v2.

---

## 1. Base URL

```
https://pokeapi.co/api/v2/
```

Sem autenticação: nenhuma chave de API, token ou cadastro é necessário para fazer requisições.

## 2. Endpoints usados

### 2.1 Listar pokémons (paginado)

```
GET /pokemon?limit=20&offset=0
```

- `limit`: quantos itens retornar por página (o projeto usa 20).
- `offset`: a partir de qual posição começar (para paginar, some `limit` ao offset atual).

**Exemplo de resposta (abreviado):**

```json
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
  ]
}
```

> [!IMPORTANT]
> Este endpoint **não retorna imagem nem tipo/altura/peso** — só nome e URL do recurso individual. Para exibir sprite e detalhes, é preciso um segundo request ao endpoint 2.2 para cada pokémon (ou sob demanda, ao abrir os detalhes — ver US04).

Os campos `next` e `previous` já vêm prontos para uso direto em US02: se `next` for `null`, é a última página; se `previous` for `null`, é a primeira.

### 2.2 Detalhes de um pokémon

```
GET /pokemon/{name-or-id}
```

Aceita tanto o nome (`/pokemon/pikachu`) quanto o ID numérico (`/pokemon/25`).

**Exemplo de resposta (abreviado):**

```json
{
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/.../25.png"
  },
  "types": [
    { "slot": 1, "type": { "name": "electric" } }
  ]
}
```

Campos relevantes para o projeto:
- `sprites.front_default` — URL da imagem usada em US01 e US04.
- `types[].type.name` — tipo(s) do pokémon (US04).
- `height` / `weight` — altura e peso (US04). A API retorna em decímetros e hectogramas; converter para metros/kg é opcional, mas deixe claro na tela qual unidade está sendo exibida.

## 3. Limitações e cuidados

- **Sem rate limit documentado oficialmente**, mas a API pede uso responsável — evite disparar dezenas de requisições simultâneas sem necessidade (ex.: não busque detalhes de todos os pokémons da página de uma vez só se não forem exibidos).
- **CORS liberado**: a API já permite requisições `fetch` diretamente do navegador, sem proxy.
- **Sem escrita**: é uma API somente leitura (`GET`). Não existe endpoint para "salvar" um favorito na PokeAPI — por isso favoritos são responsabilidade da aplicação, guardados em `localStorage` (US07), nunca enviados à API.

## 4. Estratégia de uso no projeto

- `localStorage` é usado **só para favoritos** — uma lista de IDs ou nomes de pokémons favoritados, lida e escrita a cada ação de US05.
- Os dados de pokémons em si (nome, sprite, tipo etc.) **não são persistidos**; são buscados da API a cada carregamento de página. Isso mantém a aplicação simples e evita dados desatualizados no `localStorage`.
- Toda chamada à API deve ser tratada como potencialmente lenta ou falha — daí o requisito US08 de feedback de carregamento e erro.
