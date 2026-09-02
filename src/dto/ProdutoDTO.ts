export default interface ProdutoDTO {
    idProduto?: number,
    idCategoria: number,
    codigo: string,
    nome: string,
    descricao: string,
    precoUnitario: number,
    quantidadeDisponivel: number,
    quantidadeMinima: number,
    ativo: boolean,
    dataCadastro: Date;
}