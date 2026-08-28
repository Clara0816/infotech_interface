import { useState } from "react";
import type ProdutoDTO from "../../../dto/ProdutoDTO";
import ProdutoRequests from "../../../fetch/ProdutoRequests";

function FormProduto() {

    const [formData, setFormData] = useState<ProdutoDTO>({
        idCategoria: 0,
        codigo: 0,
        nome: "",
        descricao: "",
        precoUnitario: 0,
        quantidadeDisponivel: 0,
        quantidadeMinima: 0,
        ativo: true,
        dataCadastro: new Date()
    });

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

        // Validação do ID da categoria
        if (formData.idCategoria <= 0) {
            alert("O ID da categoria deve ser maior que zero.");
            return;
        }

        // Validação do código
        if (formData.codigo <= 0) {
            alert("O código deve ser maior que zero.");
            return;
        }

        // Validação do nome
        if (formData.nome.trim() === "") {
            alert("O nome é obrigatório.");
            return;
        }

        // Validação da descrição
        if (formData.descricao.trim() === "") {
            alert("A descrição é obrigatória.");
            return;
        }

        // Validação do preço
        if (formData.precoUnitario <= 0) {
            alert("O preço unitário deve ser maior que zero.");
            return;
        }

        // Validação da quantidade disponível
        if (formData.quantidadeDisponivel < 0) {
            alert(
                "A quantidade disponível não pode ser negativa."
            );
            return;
        }

        // Validação da quantidade mínima
        if (formData.quantidadeMinima < 0) {
            alert(
                "A quantidade mínima não pode ser negativa."
            );
            return;
        }

        const produtoParaCadastro: ProdutoDTO = {
            ...formData,
            dataCadastro: new Date()
        };

        const cadastroRealizado =
            await ProdutoRequests.cadastrarProduto(
                produtoParaCadastro
            );

        if (cadastroRealizado) {

            alert("Produto cadastrado com sucesso!");

            setFormData({
                idCategoria: 0,
                codigo: 0,
                nome: "",
                descricao: "",
                precoUnitario: 0,
                quantidadeDisponivel: 0,
                quantidadeMinima: 0,
                ativo: true,
                dataCadastro: new Date()
            });

        } else {

            alert("Não foi possível cadastrar o produto.");

        }
    };

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
                    type="number"
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
                Cadastrar produto
            </button>

        </form>
    );
}

export default FormProduto;