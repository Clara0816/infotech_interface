import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type ProdutoDTO from "../../../dto/ProdutoDTO";
import ProdutoRequests from "../../../fetch/ProdutoRequests";

function FormEditarProduto() {

    const { idProduto } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ProdutoDTO>({
        idProduto: 0,
        idCategoria: 0,
        codigo: "",
        nome: "",
        descricao: "",
        precoUnitario: 0,
        quantidadeDisponivel: 0,
        quantidadeMinima: 0,
        ativo: true,
        dataCadastro: new Date()
    });

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        const buscarProduto = async () => {

            if (!idProduto) {
                alert("Produto não encontrado.");
                navigate("/produtos");
                return;
            }

            const produto =
                await ProdutoRequests.procurarProdutoPorId(
                    Number(idProduto)
                );

            if (!produto) {
                alert("Produto não encontrado.");
                navigate("/produtos");
                return;
            }

            setFormData({
                ...produto,
                idProduto: Number(produto.idProduto),
                codigo: String(produto.codigo),
                dataCadastro: new Date(produto.dataCadastro)
            });

            setCarregando(false);
        };

        buscarProduto();

    }, [idProduto, navigate]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value, type } = e.target;

        setFormData((produtoAnterior) => ({
            ...produtoAnterior,
            [name]:
                type === "number"
                    ? Number(value)
                    : value
        }));
    };

    const handleAtivoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData((produtoAnterior) => ({
            ...produtoAnterior,
            ativo: e.target.checked
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (formData.idCategoria <= 0) {
            alert("O ID da categoria deve ser maior que zero.");
            return;
        }

        if (formData.codigo.trim() === "") {
            alert("O código é obrigatório.");
            return;
        }

        if (formData.nome.trim() === "") {
            alert("O nome é obrigatório.");
            return;
        }

        if (formData.descricao.trim() === "") {
            alert("A descrição é obrigatória.");
            return;
        }

        if (formData.precoUnitario <= 0) {
            alert("O preço unitário deve ser maior que zero.");
            return;
        }

        if (formData.quantidadeDisponivel < 0) {
            alert("A quantidade disponível não pode ser negativa.");
            return;
        }

        if (formData.quantidadeMinima < 0) {
            alert("A quantidade mínima não pode ser negativa.");
            return;
        }

        if (!formData.idProduto) {
            alert("ID do produto inválido.");
            return;
        }

        const produtoAtualizado: ProdutoDTO = {
            ...formData,
            codigo: formData.codigo.trim(),
            nome: formData.nome.trim(),
            descricao: formData.descricao.trim()
        };

        const atualizacaoRealizada =
            await ProdutoRequests.atualizarProduto(
                formData.idProduto,
                produtoAtualizado
            );

        if (atualizacaoRealizada) {

            alert("Produto atualizado com sucesso!");

            navigate("/produtos");

        } else {

            alert("Não foi possível atualizar o produto.");
        }
    };

    if (carregando) {
        return <p>Carregando produto...</p>;
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="idCategoria">
                    ID da categoria
                </label>

                <input
                    type="number"
                    id="idCategoria"
                    name="idCategoria"
                    value={formData.idCategoria}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="codigo">
                    Código
                </label>

                <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="nome">
                    Nome
                </label>

                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="descricao">
                    Descrição
                </label>

                <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="precoUnitario">
                    Preço unitário
                </label>

                <input
                    type="number"
                    id="precoUnitario"
                    name="precoUnitario"
                    value={formData.precoUnitario}
                    onChange={handleChange}
                    step="0.01"
                />
            </div>

            <div>
                <label htmlFor="quantidadeDisponivel">
                    Quantidade disponível
                </label>

                <input
                    type="number"
                    id="quantidadeDisponivel"
                    name="quantidadeDisponivel"
                    value={formData.quantidadeDisponivel}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="quantidadeMinima">
                    Quantidade mínima
                </label>

                <input
                    type="number"
                    id="quantidadeMinima"
                    name="quantidadeMinima"
                    value={formData.quantidadeMinima}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="ativo">
                    Produto ativo
                </label>

                <input
                    type="checkbox"
                    id="ativo"
                    name="ativo"
                    checked={formData.ativo}
                    onChange={handleAtivoChange}
                />
            </div>

            <button type="submit">
                Salvar alterações
            </button>

            <button
                type="button"
                onClick={() => navigate("/produtos")}
            >
                Cancelar
            </button>

        </form>
    );
}

export default FormEditarProduto;