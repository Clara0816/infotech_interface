import { useEffect, useState } from "react";
import type MovimentacaoDTO from "../../../dto/MovimentacaoDTO";
import MovimentacaoRequests from "../../../fetch/MovimentacaoRequests";
import FormMovimentacao from "../../Formularios/FormMovimentacao/FormMovimentacao";

function ListagemMovimentacoes() {
    const [movimentacoes, setMovimentacoes] =
        useState<MovimentacaoDTO[]>([]);

    const [movimentacaoSelecionada, setMovimentacaoSelecionada] =
        useState<MovimentacaoDTO | null>(null);

    const buscarMovimentacoes = async () => {
        const listaMovimentacoes =
            await MovimentacaoRequests.obterListaDeMovimentacoes();

        if (listaMovimentacoes) {
            setMovimentacoes(listaMovimentacoes);
        }
    };

    useEffect(() => {
        buscarMovimentacoes();
    }, []);

    const corrigirMovimentacao = (
        movimentacao: MovimentacaoDTO
    ) => {
        setMovimentacaoSelecionada(movimentacao);
    };

    return (
        <section>
            <h1>Movimentações</h1>

            <button
                type="button"
                onClick={() =>
                    window.location.href = "/cadastro-movimentacao"
                }
            >
                Cadastrar movimentação
            </button>

            {movimentacaoSelecionada && (
                <FormMovimentacao
                    movimentacaoParaCorrigir={
                        movimentacaoSelecionada
                    }
                />
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Tipo</th>
                        <th>Motivo</th>
                        <th>Quantidade</th>
                        <th>Preço unitário</th>
                        <th>Valor total</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {movimentacoes.map((movimentacao) => (
                        <tr
                            key={
                                movimentacao.idMovimentacao
                            }
                        >
                            <td>
                                {movimentacao.idMovimentacao}
                            </td>

                            <td>
                                {movimentacao.idProduto}
                            </td>

                            <td>
                                {movimentacao.tipo}
                            </td>

                            <td>
                                {movimentacao.motivo}
                            </td>

                            <td>
                                {movimentacao.quantidade}
                            </td>

                            <td>
                                {movimentacao.precoUnitarioPraticado
                                    ? `R$ ${Number(
                                        movimentacao.precoUnitarioPraticado
                                    ).toFixed(2)}`
                                    : "-"}
                            </td>

                            <td>
                                {movimentacao.valorTotal
                                    ? `R$ ${Number(
                                        movimentacao.valorTotal
                                    ).toFixed(2)}`
                                    : "-"}
                            </td>

                            <td>
                                {new Date(
                                    movimentacao.dataMovimentacao
                                ).toLocaleDateString("pt-BR")}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        corrigirMovimentacao(
                                            movimentacao
                                        )
                                    }
                                >
                                    Corrigir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default ListagemMovimentacoes;