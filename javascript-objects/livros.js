/**
 * Desafio prático: criar e manipular uma lista (array) de objetos, 
iterar sobre ela e aplicar uma lógica de filtragem/agrupamento 
para encontrar o livro com maior pontuação em cada categoria.

Desafio: O Melhor Livro por Categoria
const l1 = {titulo:"", categoria:"", pontuacao:n}
const l2 = {titulo:"", categoria:"", pontuacao:n}
const l3 = {titulo:"", categoria:"", pontuacao:n}
const ln = {titulo:"", categoria:"", pontuacao:n}
Objetivo
-Crie um array de objetos onde cada objeto representa um livro com 
titulo, categoria e pontuacao (de 0 a 10), 

-escreva uma função que percorra o array e retorne um novo 
objeto contendo apenas o livro com maior pontuação 
para uma categoria específica informada












 */
const livro8 =  { titulo: "Dom Casmurro", categoria: "Clássico", pontuacao: 10 }
const livro9=  { titulo: "O Pequeno Príncipe", categoria: "Infantil", pontuacao: 9 }


const livros = [
  { titulo: "Clean Code", categoria: "Programação", pontuacao: 9 },
  { titulo: "JavaScript: The Good Parts", categoria: "Programação", pontuacao: 10 },
  { titulo: "O Hobbit", categoria: "Fantasia", pontuacao: 8 },
  { titulo: "Harry Potter e a Pedra Filosofal", categoria: "Fantasia", pontuacao: 9 },
  { titulo: "1984", categoria: "Ficção", pontuacao: 10 },
  { titulo: "O Senhor das Moscas", categoria: "Ficção", pontuacao: 8 },
  { titulo: "Sapiens", categoria: "História", pontuacao: 9 },
  { titulo: "O Poder do Hábito", categoria: "Desenvolvimento Pessoal", pontuacao: 8 },
  livro8,
  livro9
];

function filtrarLivroPorCategoria(arrLivros, categoria){

    var livrosFiltradosPorCategoria = arrLivros.filter(livroAtual=>livroAtual.categoria == categoria)
    let livroMelhorNota = livrosFiltradosPorCategoria[0]
    for(let i = 0 ; i< livrosFiltradosPorCategoria.length;i++){
        if(livrosFiltradosPorCategoria[++i].pontuacao> livroMelhorNota.pontuacao){
            livroMelhorNota=livrosFiltradosPorCategoria[i]
        }
    }
    console.log(livroMelhorNota)
}

filtrarLivroPorCategoria(livros, "Programação")

