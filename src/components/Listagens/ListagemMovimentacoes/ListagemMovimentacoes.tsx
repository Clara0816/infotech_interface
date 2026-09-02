import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MovimentacaoRequests from "../../../fetch/MovimentacaoRequests";
import type MovimentacaoDTO from "../../../dto/MovimentacaoDTO";

function ListagemMovimentacoes() {

    const [movimentacoes, setMovimentacoes] = useState<MovimentacaoDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarMovimentacoes();
    }, []);

    const carregarMovimentacoes = async () => {

        const lista = await MovimentacaoRequests.obterListaDeMovimentacoes();

        if (lista) {
            setMovimentacoes(lista);
        }
    };

    const editarMovimentacao = (idMovimentacao: number) => {
        navigate(`/editar-movimentacao/${idMovimentacao}`);
    };

    return (
        <section>

            <h1>Lista de Movimentações</h1>

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Tipo</th>
                        <th>Motivo</th>
                        <th>Quantidade</th>
                        <th>Preço Unitário</th>
                        <th>Valor Total</th>
                        <th>Observação</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>

                    {movimentacoes.map((movimentacao) => (

                        <tr key={movimentacao.idMovimentacao}>

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
                                {movimentacao.precoUnitarioPraticado !== null
                                    ? `R$ ${Number(movimentacao.precoUnitarioPraticado).toFixed(2)}`
                                    : "-"}
                            </td>

                            <td>
                                {movimentacao.valorTotal !== null
                                    ? `R$ ${Number(movimentacao.valorTotal).toFixed(2)}`
                                    : "-"}
                            </td>

                            <td>
                                {movimentacao.observacao}
                            </td>

                            <td>
                                {new Date(
                                    movimentacao.dataMovimentacao
                                ).toLocaleString("pt-BR")}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        editarMovimentacao(
                                            movimentacao.idMovimentacao!
                                        )
                                    }
                                >
                                    Editar
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