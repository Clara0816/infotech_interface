import { useEffect, useState } from "react";
import type CategoriaDTO from "../../../dto/CategoriaDTO";
import CategoriaRequests from "../../../fetch/CategoriaRequests";
import FormCategoria from "../../Formularios/FormCategoria/FormCategoria";

function ListagemCategorias() {
    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);

    const [categoriaSelecionada, setCategoriaSelecionada] =
        useState<CategoriaDTO | null>(null);

    const buscarCategorias = async () => {
        const listaCategorias =
            await CategoriaRequests.obterListaDeCategorias();

        if (listaCategorias) {
            setCategorias(listaCategorias);
        }
    };

    useEffect(() => {
        buscarCategorias();
    }, []);

    const editarCategoria = (categoria: CategoriaDTO) => {
        setCategoriaSelecionada(categoria);
    };

    return (
        <section>
            <h1>Categorias</h1>

            <button
                type="button"
                onClick={() =>
                    window.location.href = "/cadastro-categoria"
                }
            >
                Cadastrar categoria
            </button>

            {categoriaSelecionada && (
                <FormCategoria
                    categoriaParaEditar={categoriaSelecionada}
                />
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.idCategoria}>
                            <td>
                                {categoria.idCategoria}
                            </td>

                            <td>
                                {categoria.nome}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        editarCategoria(
                                            categoria
                                        )
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

export default ListagemCategorias;