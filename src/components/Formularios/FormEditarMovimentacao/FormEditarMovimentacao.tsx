import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MovimentacaoRequests from "../../../fetch/MovimentacaoRequests";
import type MovimentacaoDTO from "../../../dto/MovimentacaoDTO";

function FormEditarMovimentacao() {

    const { idMovimentacao } = useParams();
    const navigate = useNavigate();

    const [movimentacao, setMovimentacao] = useState<MovimentacaoDTO>({
        idProduto: 0,
        idMovimentacaoOrigem: null,
        tipo: "ENTRADA",
        motivo: "RECEBIMENTO",
        quantidade: 0,
        precoUnitarioPraticado: null,
        valorTotal: null,
        observacao: "",
        dataMovimentacao: new Date()
    });

    useEffect(() => {
        carregarMovimentacao();
    }, []);

    const carregarMovimentacao = async () => {

        if (!idMovimentacao) {
            alert("ID da movimentação não informado.");
            return;
        }

        const id = Number(idMovimentacao);

        if (isNaN(id) || id <= 0) {
            alert("ID da movimentação inválido.");
            return;
        }

        const dados =
            await MovimentacaoRequests.procurarMovimentacaoPorId(id);

        if (!dados) {
            alert("Movimentação não encontrada.");
            navigate("/movimentacoes");
            return;
        }

        setMovimentacao({
            ...dados,
            idMovimentacaoOrigem:
                dados.motivo === "CORRECAO"
                    ? dados.idMovimentacaoOrigem
                    : null,
            precoUnitarioPraticado:
                dados.motivo === "VENDA"
                    ? dados.precoUnitarioPraticado
                    : null,
            valorTotal:
                dados.motivo === "VENDA"
                    ? dados.valorTotal
                    : null
        });
    };

    const handleChange = (
        evento: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) => {

        const { name, value } = evento.target;

        if (name === "idProduto" || name === "quantidade") {
            setMovimentacao({
                ...movimentacao,
                [name]: Number(value)
            });
            return;
        }

        if (name === "idMovimentacaoOrigem") {
            setMovimentacao({
                ...movimentacao,
                idMovimentacaoOrigem:
                    value === "" ? null : Number(value)
            });
            return;
        }

        if (name === "precoUnitarioPraticado") {
            setMovimentacao({
                ...movimentacao,
                precoUnitarioPraticado:
                    value === "" ? null : Number(value)
            });
            return;
        }

        if (name === "valorTotal") {
            setMovimentacao({
                ...movimentacao,
                valorTotal:
                    value === "" ? null : Number(value)
            });
            return;
        }

        setMovimentacao({
            ...movimentacao,
            [name]: value
        });
    };

    const validarMovimentacao = (): boolean => {

        if (!movimentacao.idProduto || movimentacao.idProduto <= 0) {
            alert("Informe um produto válido.");
            return false;
        }

        if (
            movimentacao.tipo !== "ENTRADA" &&
            movimentacao.tipo !== "SAIDA"
        ) {
            alert("O tipo deve ser ENTRADA ou SAIDA.");
            return false;
        }

        const motivosValidos = [
            "RECEBIMENTO",
            "VENDA",
            "USO_INTERNO",
            "PERDA",
            "DANIFICADO",
            "CORRECAO"
        ];

        if (!motivosValidos.includes(movimentacao.motivo)) {
            alert("Informe um motivo válido.");
            return false;
        }

        if (!movimentacao.quantidade || movimentacao.quantidade <= 0) {
            alert("A quantidade deve ser maior que zero.");
            return false;
        }

        if (
            movimentacao.motivo === "RECEBIMENTO" &&
            movimentacao.tipo !== "ENTRADA"
        ) {
            alert("O motivo RECEBIMENTO deve possuir o tipo ENTRADA.");
            return false;
        }

        if (
            movimentacao.motivo === "VENDA" &&
            movimentacao.tipo !== "SAIDA"
        ) {
            alert("O motivo VENDA deve possuir o tipo SAIDA.");
            return false;
        }

        if (movimentacao.motivo === "CORRECAO") {

            if (
                !movimentacao.idMovimentacaoOrigem ||
                movimentacao.idMovimentacaoOrigem <= 0
            ) {
                alert(
                    "Informe a movimentação de origem para uma correção."
                );
                return false;
            }
        } else {

            if (movimentacao.idMovimentacaoOrigem !== null) {
                alert(
                    "A movimentação de origem só deve ser informada para CORRECAO."
                );
                return false;
            }
        }

        if (movimentacao.motivo === "VENDA") {

            if (
                movimentacao.precoUnitarioPraticado === null ||
                movimentacao.precoUnitarioPraticado < 0
            ) {
                alert(
                    "Informe um preço unitário válido para a venda."
                );
                return false;
            }

            if (
                movimentacao.valorTotal === null ||
                movimentacao.valorTotal < 0
            ) {
                alert(
                    "Informe um valor total válido para a venda."
                );
                return false;
            }

            const valorCalculado =
                movimentacao.quantidade *
                movimentacao.precoUnitarioPraticado;

            if (
                Math.abs(
                    valorCalculado - movimentacao.valorTotal
                ) > 0.01
            ) {
                alert(
                    `O valor total deve ser igual à quantidade multiplicada pelo preço unitário. Valor correto: R$ ${valorCalculado.toFixed(2)}`
                );
                return false;
            }

        } else {

            if (
                movimentacao.precoUnitarioPraticado !== null ||
                movimentacao.valorTotal !== null
            ) {
                alert(
                    "Preço unitário e valor total só devem ser informados para VENDA."
                );
                return false;
            }
        }

        if (
            typeof movimentacao.observacao !== "string" ||
            movimentacao.observacao.trim() === ""
        ) {
            alert("A observação é obrigatória.");
            return false;
        }

        return true;
    };

    const atualizar = async (evento: React.FormEvent) => {

        evento.preventDefault();

        if (!validarMovimentacao()) {
            return;
        }

        if (!idMovimentacao) {
            alert("ID da movimentação não informado.");
            return;
        }

        const id = Number(idMovimentacao);

        const dadosMovimentacao: MovimentacaoDTO = {
            idMovimentacao: id,
            idProduto: movimentacao.idProduto,
            idMovimentacaoOrigem:
                movimentacao.motivo === "CORRECAO"
                    ? movimentacao.idMovimentacaoOrigem
                    : null,
            tipo: movimentacao.tipo,
            motivo: movimentacao.motivo,
            quantidade: movimentacao.quantidade,
            precoUnitarioPraticado:
                movimentacao.motivo === "VENDA"
                    ? movimentacao.precoUnitarioPraticado
                    : null,
            valorTotal:
                movimentacao.motivo === "VENDA"
                    ? movimentacao.valorTotal
                    : null,
            observacao: movimentacao.observacao.trim(),
            dataMovimentacao: movimentacao.dataMovimentacao
        };

        const resposta =
            await MovimentacaoRequests.atualizarMovimentacao(
                id,
                dadosMovimentacao
            );

        if (resposta) {
            alert("Movimentação atualizada com sucesso!");
            navigate("/movimentacoes");
        } else {
            alert(
                "Essa movimentação já foi confirmada e não pode ser alterada. Registre uma correção."
            );
        }
    };

    return (
        <form onSubmit={atualizar}>

            <div>
                <label htmlFor="idProduto">
                    ID do Produto:
                </label>

                <input
                    type="number"
                    id="idProduto"
                    name="idProduto"
                    value={movimentacao.idProduto || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="tipo">
                    Tipo:
                </label>

                <select
                    id="tipo"
                    name="tipo"
                    value={movimentacao.tipo}
                    onChange={handleChange}
                >
                    <option value="ENTRADA">
                        ENTRADA
                    </option>

                    <option value="SAIDA">
                        SAIDA
                    </option>
                </select>
            </div>

            <div>
                <label htmlFor="motivo">
                    Motivo:
                </label>

                <select
                    id="motivo"
                    name="motivo"
                    value={movimentacao.motivo}
                    onChange={handleChange}
                >
                    <option value="RECEBIMENTO">
                        RECEBIMENTO
                    </option>

                    <option value="VENDA">
                        VENDA
                    </option>

                    <option value="USO_INTERNO">
                        USO_INTERNO
                    </option>

                    <option value="PERDA">
                        PERDA
                    </option>

                    <option value="DANIFICADO">
                        DANIFICADO
                    </option>

                    <option value="CORRECAO">
                        CORRECAO
                    </option>
                </select>
            </div>

            <div>
                <label htmlFor="idMovimentacaoOrigem">
                    ID da Movimentação de Origem:
                </label>

                <input
                    type="number"
                    id="idMovimentacaoOrigem"
                    name="idMovimentacaoOrigem"
                    value={
                        movimentacao.idMovimentacaoOrigem || ""
                    }
                    onChange={handleChange}
                    placeholder="Somente para CORRECAO"
                />
            </div>

            <div>
                <label htmlFor="quantidade">
                    Quantidade:
                </label>

                <input
                    type="number"
                    id="quantidade"
                    name="quantidade"
                    value={movimentacao.quantidade || ""}
                    onChange={handleChange}
                    min="1"
                />
            </div>

            <div>
                <label htmlFor="precoUnitarioPraticado">
                    Preço Unitário:
                </label>

                <input
                    type="number"
                    id="precoUnitarioPraticado"
                    name="precoUnitarioPraticado"
                    value={
                        movimentacao.precoUnitarioPraticado === null
                            ? ""
                            : movimentacao.precoUnitarioPraticado
                    }
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="Somente para VENDA"
                />
            </div>

            <div>
                <label htmlFor="valorTotal">
                    Valor Total:
                </label>

                <input
                    type="number"
                    id="valorTotal"
                    name="valorTotal"
                    value={
                        movimentacao.valorTotal === null
                            ? ""
                            : movimentacao.valorTotal
                    }
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="Somente para VENDA"
                />
            </div>

            <div>
                <label htmlFor="observacao">
                    Observação:
                </label>

                <textarea
                    id="observacao"
                    name="observacao"
                    value={movimentacao.observacao}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">
                Atualizar movimentação
            </button>

        </form>
    );
}

export default FormEditarMovimentacao;