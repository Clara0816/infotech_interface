import { useEffect, useState } from "react";
import type ProdutoDTO from "../../../dto/ProdutoDTO";
import ProdutoRequests from "../../../fetch/ProdutoRequests";
import FormProduto from "../../Formularios/FormProduto/FormProduto";

function ListagemProdutos() {
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);

    const [produtoSelecionado, setProdutoSelecionado] =
        useState<ProdutoDTO | null>(null);

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

    const editarProduto = (produto: ProdutoDTO) => {
        setProdutoSelecionado(produto);
    };

    return (
        <section>
            <h1>Produtos</h1>

            <button
                type="button"
                onClick={() =>
                    window.location.href = "/cadastro-produto"
                }
            >
                Cadastrar produto
            </button>

            {produtoSelecionado && (
                <FormProduto
                    produtoParaEditar={produtoSelecionado}
                />
            )}

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
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.idProduto}>
                            <td>{produto.idProduto}</td>
                            <td>{produto.codigo}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.descricao}</td>

                            <td>
                                R${" "}
                                {Number(
                                    produto.precoUnitario
                                ).toFixed(2)}
                            </td>

                            <td>
                                {produto.quantidadeDisponivel}
                            </td>

                            <td>
                                {produto.quantidadeMinima}
                            </td>

                            <td>
                                {produto.ativo
                                    ? "Ativo"
                                    : "Inativo"}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        editarProduto(produto)
                                    }
                                >
                                    Atualizar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default ListagemProdutos;