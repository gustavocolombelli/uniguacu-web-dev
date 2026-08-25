/**
 * 1. Objetos JavaScript
Objetos são variáveis ​​que podem armazenar tanto valores quanto funções.
Objetos são um dos conceitos mais importantes em JavaScript.
Se você entende de objetos, você entende de JavaScript.
*/

const objeto_nome_qualquer = {}

const car = {
  type: "Fiat",
  model: "500",
  color: "white"
};

/**
 * 2. Propriedades do objeto
Objetos em JavaScript são coleções de propriedades.
As propriedades podem ser alteradas, adicionadas e excluídas.
 */
const pessoa = {
    idade:19,
    nome:"Josefino",
    sobrenome:"Alencar",
    endereco:{
        logradouro:"B. de mendonça",
        numero:1443,
        cidade:"Foz do Iguaçu",
        uf:"PR"
    },
    documentos:{
        cpf:"01240.12.412.-54",
        rg:"124-.412.5443-19"
    },
    contas:{
        copel:{
            fatura:{
                boleto:"0000 01023 012302130102 3102 30123 01",
                valor: "152400"
            }
        },
        sanepar:{
            fatura:{
                boleto:"1240 1042 040140 14",
                valor:"15524"
            }
        }

    }
}
console.log(pessoa.endereco.logradouro)


let idade = pessoa.idade;
let numero = pessoa.endereco.numero
let nome = pessoa['nome ']

console.log(pessoa.nome + " tem " + pessoa.idade + " anos.")

pessoa.endereco.logradouro = "Av felip wandscher"
console.log(pessoa.endereco.logradouro)
/**
 * 3. métodos e this

Métodos de objeto
Métodos são ações que podem ser executadas em objetos.
Métodos são funções armazenadas como valores de propriedade.

Em JavaScript, a palavra-chave `this` se refere a um objeto.
É utilizado para acessar o objeto que está chamando um método.

*/


pessoa.getNomeCompleto = function(nome){
    console.log(nome)
    return this.nome + " " + this.sobrenome
}

pessoa.setNome = (nome)=>{
    if(nome == ''){
        console.log("Nome nao pode estar vazio!")
        return;
    }
    this.nome = nome
}

pessoa.getIdade = _=>{
    return this.idade;
}

pessoa.somarIdades = b => console.log(b)


pessoa.getNomeCompleto();
