import { useEffect, useState } from "react";
import type CategoriaDTO from "../../../dto/CategoriaDTO";
import CategoriaRequests from "../../../fetch/CategoriaRequests";
import { useNavigate } from "react-router-dom";

function ListagemCategorias() {

    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);

    const navigate = useNavigate();

    const carregarCategorias = async () => {

        const lista =
            await CategoriaRequests.obterListaDeCategorias();

        if (lista) {
            setCategorias(lista);
        }
    };

    useEffect(() => {
        carregarCategorias();
    }, []);

    return (
        <section>

            <h1>Lista de Categorias</h1>

            {categorias.length === 0 ? (

                <p>Nenhuma categoria cadastrada.</p>

            ) : (

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
                                        onClick={() =>
                                            navigate(
                                                `/editar-categoria/${categoria.idCategoria}`
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

            )}

        </section>
    );
}

export default ListagemCategorias;