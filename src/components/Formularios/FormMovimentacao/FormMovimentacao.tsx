import { useState } from "react";
import type MovimentacaoDTO from "../../../dto/MovimentacaoDTO";
import MovimentacaoRequests from "../../../fetch/MovimentacaoRequests";
import "./FormMovimentacao.css";

function FormMovimentacao({
    movimentacaoParaCorrigir
}: {
    movimentacaoParaCorrigir?: MovimentacaoDTO
}) {

    const [idProduto, setIdProduto] = useState(
        movimentacaoParaCorrigir
            ? String(movimentacaoParaCorrigir.idProduto)
            : ""
    );

    const [tipo, setTipo] = useState(
        movimentacaoParaCorrigir?.tipo ?? ""
    );

    const [motivo, setMotivo] = useState(
        movimentacaoParaCorrigir
            ? "CORRECAO"
            : ""
    );

    const [quantidade, setQuantidade] = useState(
        movimentacaoParaCorrigir
            ? String(movimentacaoParaCorrigir.quantidade)
            : ""
    );

    const [precoUnitarioPraticado, setPrecoUnitarioPraticado] =
        useState("");

    const [valorTotal, setValorTotal] = useState("");

    const [observacao, setObservacao] = useState("");

    const [idMovimentacaoOrigem, setIdMovimentacaoOrigem] =
        useState(
            movimentacaoParaCorrigir
                ? String(movimentacaoParaCorrigir.idMovimentacao)
                : ""
        );

    const salvar = async () => {

        if (!idProduto || Number(idProduto) <= 0) {
            alert("Informe um produto válido.");
            return;
        }

        if (
            !quantidade ||
            Number(quantidade) <= 0
        ) {
            alert("A quantidade deve ser maior que zero.");
            return;
        }

        if (observacao.trim() === "") {
            alert("A observação é obrigatória.");
            return;
        }

        // CORREÇÃO
        if (movimentacaoParaCorrigir?.idMovimentacao) {

            const movimentacao: MovimentacaoDTO = {
                idProduto: Number(idProduto),
                idMovimentacaoOrigem:
                    movimentacaoParaCorrigir.idMovimentacao,
                tipo,
                motivo: "CORRECAO",
                quantidade: Number(quantidade),
                observacao: observacao.trim(),
                dataMovimentacao: new Date()
            };

            const sucesso =
                await MovimentacaoRequests.corrigirMovimentacao(
                    movimentacaoParaCorrigir.idMovimentacao,
                    movimentacao
                );

            if (sucesso) {
                alert(
                    "Correção da movimentação registrada com sucesso!"
                );

                setQuantidade("");
                setObservacao("");

            } else {
                alert(
                    "Erro ao registrar a correção da movimentação."
                );
            }

            return;
        }

        // CADASTRO NORMAL

        if (tipo !== "ENTRADA" && tipo !== "SAIDA") {
            alert("O tipo deve ser ENTRADA ou SAIDA.");
            return;
        }

        if (!motivo) {
            alert("Informe o motivo da movimentação.");
            return;
        }

        if (
            motivo === "RECEBIMENTO" &&
            tipo !== "ENTRADA"
        ) {
            alert(
                "RECEBIMENTO deve ser uma movimentação de ENTRADA."
            );
            return;
        }

        if (
            motivo === "VENDA" &&
            tipo !== "SAIDA"
        ) {
            alert(
                "VENDA deve ser uma movimentação de SAIDA."
            );
            return;
        }

        if (
            motivo === "VENDA" &&
            (
                !precoUnitarioPraticado ||
                !valorTotal
            )
        ) {
            alert(
                "Informe o preço unitário e o valor total para uma VENDA."
            );
            return;
        }

        const movimentacao: MovimentacaoDTO = {
            idProduto: Number(idProduto),
            tipo,
            motivo,
            quantidade: Number(quantidade),
            dataMovimentacao: new Date(),
            observacao: observacao.trim()
        };

        if (motivo === "CORRECAO") {
            if (!idMovimentacaoOrigem) {
                alert(
                    "Informe a movimentação de origem para uma CORRECAO."
                );
                return;
            }

            movimentacao.idMovimentacaoOrigem =
                Number(idMovimentacaoOrigem);
        }

        if (precoUnitarioPraticado) {
            movimentacao.precoUnitarioPraticado =
                Number(precoUnitarioPraticado);
        }

        if (valorTotal) {
            movimentacao.valorTotal =
                Number(valorTotal);
        }

        const sucesso =
            await MovimentacaoRequests.cadastrarMovimentacao(
                movimentacao
            );

        if (sucesso) {
            alert("Movimentação cadastrada com sucesso!");

            setIdProduto("");
            setTipo("");
            setMotivo("");
            setQuantidade("");
            setPrecoUnitarioPraticado("");
            setValorTotal("");
            setObservacao("");
            setIdMovimentacaoOrigem("");

        } else {
            alert("Erro ao cadastrar movimentação.");
        }
    };

    return (
        <section className="form-movimentacao">

            <h1>
                {movimentacaoParaCorrigir
                    ? "Corrigir Movimentação"
                    : "Cadastrar Movimentação"}
            </h1>

            <div className="campo">
                <label>ID do produto:</label>

                <input
                    type="number"
                    value={idProduto}
                    onChange={(e) =>
                        setIdProduto(e.target.value)
                    }
                    disabled={!!movimentacaoParaCorrigir}
                />
            </div>

            <div className="campo">
                <label>Tipo:</label>

                <select
                    value={tipo}
                    onChange={(e) =>
                        setTipo(e.target.value)
                    }
                    disabled={!!movimentacaoParaCorrigir}
                >
                    <option value="">
                        Selecione
                    </option>

                    <option value="ENTRADA">
                        ENTRADA
                    </option>

                    <option value="SAIDA">
                        SAIDA
                    </option>
                </select>
            </div>

            <div className="campo">
                <label>Motivo:</label>

                <select
                    value={motivo}
                    onChange={(e) =>
                        setMotivo(e.target.value)
                    }
                    disabled={!!movimentacaoParaCorrigir}
                >
                    <option value="">
                        Selecione
                    </option>

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

            <div className="campo">
                <label>Quantidade:</label>

                <input
                    type="number"
                    value={quantidade}
                    onChange={(e) =>
                        setQuantidade(e.target.value)
                    }
                />
            </div>

            {!movimentacaoParaCorrigir && (
                <>
                    <div className="campo">
                        <label>
                            Preço unitário:
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            value={
                                precoUnitarioPraticado
                            }
                            onChange={(e) =>
                                setPrecoUnitarioPraticado(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="campo">
                        <label>
                            Valor total:
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            value={valorTotal}
                            onChange={(e) =>
                                setValorTotal(
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </>
            )}

            {movimentacaoParaCorrigir && (
                <div className="campo">
                    <label>
                        ID da movimentação original:
                    </label>

                    <input
                        type="number"
                        value={idMovimentacaoOrigem}
                        disabled
                    />
                </div>
            )}

            <div className="campo">
                <label>Observação:</label>

                <input
                    type="text"
                    value={observacao}
                    onChange={(e) =>
                        setObservacao(e.target.value)
                    }
                />
            </div>

            <button onClick={salvar}>
                {movimentacaoParaCorrigir
                    ? "Registrar correção"
                    : "Cadastrar"}
            </button>

        </section>
    );
}

export default FormMovimentacao;