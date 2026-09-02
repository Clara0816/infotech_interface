export default interface MovimentacaoDTO {
    idMovimentacao?: number,
    idProduto: number,
    idMovimentacaoOrigem: number | null,
    tipo: string,
    motivo: string,
    quantidade: number,
    precoUnitarioPraticado: number | null,
    valorTotal: number | null,
    observacao: string,
    dataMovimentacao: Date;
}