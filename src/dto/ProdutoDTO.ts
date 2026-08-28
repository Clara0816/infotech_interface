 export default interface ProdutoDTO {
    idProduto?: number,
    idCategoria: number,
    codigo: number,
    nome: string,
    descricao: string,
    precoUnitario: number,
    quantidadeDisponivel: number,
    quantidadeMinima: number,
    ativo: boolean,
    dataCadastro: Date;
 }    