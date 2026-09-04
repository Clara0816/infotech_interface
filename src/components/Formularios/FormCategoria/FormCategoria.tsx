import { useState } from "react";
import type CategoriaDTO from "../../../dto/CategoriaDTO";
import CategoriaRequests from "../../../fetch/CategoriaRequests";

function FormCategoria({
    categoriaParaEditar
}: {
    categoriaParaEditar?: CategoriaDTO
}) {

    const [nome, setNome] = useState(
        categoriaParaEditar?.nome ?? ""
    );

    const salvar = async () => {

        // Validação dos dados
        if (nome.trim() === "") {
            alert("O nome da categoria é obrigatório.");
            return;
        }

        if (nome.trim().length < 2) {
            alert("O nome da categoria deve ter pelo menos 2 caracteres.");
            return;
        }

        if (nome.trim().length > 80) {
            alert("O nome da categoria deve ter no máximo 80 caracteres.");
            return;
        }

        const categoria: CategoriaDTO = {
            idCategoria: categoriaParaEditar?.idCategoria,
            nome: nome.trim()
        };

        let sucesso: boolean;

        if (categoriaParaEditar?.idCategoria) {

            sucesso = await CategoriaRequests.atualizarCategoria(
                categoriaParaEditar.idCategoria,
                categoria
            );

        } else {

            sucesso = await CategoriaRequests.cadastrarCategoria(
                categoria
            );
        }

        if (sucesso) {

            alert(
                categoriaParaEditar
                    ? "Categoria atualizada com sucesso!"
                    : "Categoria cadastrada com sucesso!"
            );

            setNome("");

        } else {

            alert(
                categoriaParaEditar
                    ? "Erro ao atualizar categoria."
                    : "Erro ao cadastrar categoria."
            );
        }
    };

    return (
        <section>

            <h1>
                {categoriaParaEditar
                    ? "Atualizar Categoria"
                    : "Cadastrar Categoria"}
            </h1>

            <label>
                Nome da categoria:

                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite o nome da categoria"
                />

            </label>

            <button onClick={salvar}>
                {categoriaParaEditar
                    ? "Atualizar"
                    : "Cadastrar"}
            </button>

        </section>
    );
}

export default FormCategoria;