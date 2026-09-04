import { useState, type ChangeEvent, type FormEvent } from "react";
import type ProdutoDTO from "../../../dto/ProdutoDTO";
import ProdutoRequests from "../../../fetch/ProdutoRequests";

function FormProduto({
    produtoParaEditar
}: {
    produtoParaEditar?: ProdutoDTO
}) {

    const [formData, setFormData] = useState<ProdutoDTO>(
        produtoParaEditar
            ? {
                  ...produtoParaEditar,
                  idCategoria: Number(produtoParaEditar.idCategoria),
                  precoUnitario: Number(produtoParaEditar.precoUnitario),
                  quantidadeDisponivel: Number(
                      produtoParaEditar.quantidadeDisponivel
                  ),
                  quantidadeMinima: Number(
                      produtoParaEditar.quantidadeMinima
                  ),
                  ativo: Boolean(produtoParaEditar.ativo)
              }
            : {
                  idCategoria: 0,
                  codigo: "",
                  nome: "",
                  descricao: "",
                  precoUnitario: 0,
                  quantidadeDisponivel: 0,
                  quantidadeMinima: 0,
                  ativo: true,
                  dataCadastro: new Date()
              }
    );

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value, type } = e.target;

        setFormData((produtoAnterior) => ({
            ...produtoAnterior,

            [name]:
                type === "number"
                    ? Number(value.replace(",", "."))
                    : value
        }));
    };

    const handleAtivoChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {

        setFormData((produtoAnterior) => ({
            ...produtoAnterior,
            ativo: e.target.checked
        }));
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        // Validação do ID da categoria
        if (
            !Number.isFinite(formData.idCategoria) ||
            formData.idCategoria <= 0
        ) {
            alert("O ID da categoria deve ser maior que zero.");
            return;
        }

        // Validação do código
        if (
            typeof formData.codigo !== "string" ||
            formData.codigo.trim() === ""
        ) {
            alert("O código é obrigatório.");
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
        if (
            !Number.isFinite(formData.precoUnitario) ||
            formData.precoUnitario <= 0
        ) {
            alert("O preço unitário deve ser maior que zero.");
            return;
        }

        // Validação da quantidade disponível
        if (
            !Number.isFinite(formData.quantidadeDisponivel) ||
            formData.quantidadeDisponivel < 0
        ) {
            alert(
                "A quantidade disponível não pode ser negativa."
            );
            return;
        }

        // Validação da quantidade mínima
        if (
            !Number.isFinite(formData.quantidadeMinima) ||
            formData.quantidadeMinima < 0
        ) {
            alert(
                "A quantidade mínima não pode ser negativa."
            );
            return;
        }

        const produtoParaEnviar: ProdutoDTO = {
            ...formData,
            idCategoria: Number(formData.idCategoria),
            precoUnitario: Number(formData.precoUnitario),
            quantidadeDisponivel: Number(
                formData.quantidadeDisponivel
            ),
            quantidadeMinima: Number(
                formData.quantidadeMinima
            ),
            codigo: formData.codigo.trim(),
            nome: formData.nome.trim(),
            descricao: formData.descricao.trim(),
            dataCadastro: new Date()
        };

        let cadastroRealizado: boolean;

        if (produtoParaEditar?.idProduto) {

            cadastroRealizado =
                await ProdutoRequests.atualizarProduto(
                    produtoParaEditar.idProduto,
                    produtoParaEnviar
                );

        } else {

            cadastroRealizado =
                await ProdutoRequests.cadastrarProduto(
                    produtoParaEnviar
                );
        }

        if (cadastroRealizado) {

            alert(
                produtoParaEditar
                    ? "Produto atualizado com sucesso!"
                    : "Produto cadastrado com sucesso!"
            );

            setFormData({
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

        } else {

            alert(
                produtoParaEditar
                    ? "Não foi possível atualizar o produto."
                    : "Não foi possível cadastrar o produto."
            );
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
                {produtoParaEditar
                    ? "Atualizar produto"
                    : "Cadastrar produto"}
            </button>

        </form>
    );
}

export default FormProduto;