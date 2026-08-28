import { useEffect, useState } from "react";
import type ProdutoDTO from "../../../dto/ProdutoDTO";
import ProdutoRequests from "../../../fetch/ProdutoRequests";

function ListagemProdutos() {

    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);

    const buscarProdutos = async () => {

        const listaProdutos =
            await ProdutoRequests.obterListaDeProdutos();

        if (listaProdutos) {
            setProdutos(listaProdutos);
        }
    };

    useEffect(() => {
        buscarProdutos();
    }, []);

    return (
        <section>

            <h1>Produtos</h1>

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Estoque mínimo</th>
                        <th>Ativo</th>
                    </tr>
                </thead>

                <tbody>

                    {produtos.map((produto) => (

                        <tr key={produto.idProduto}>

                            <td>
                                {produto.idProduto}
                            </td>

                            <td>
                                {produto.codigo}
                            </td>

                            <td>
                                {produto.nome}
                            </td>

                            <td>
                                {produto.descricao}
                            </td>

                            <td>
                                <td>
                                    R$ {Number(produto.precoUnitario).toFixed(2)}
                                </td>
                            </td>

                            <td>
                                {produto.quantidadeDisponivel}
                            </td>

                            <td>
                                {produto.quantidadeMinima}
                            </td>

                            <td>
                                {produto.ativo ? "Ativo" : "Inativo"}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </section>
    );
}

export default ListagemProdutos;