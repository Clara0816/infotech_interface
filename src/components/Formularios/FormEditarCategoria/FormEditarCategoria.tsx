import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type CategoriaDTO from "../../../dto/CategoriaDTO";
import CategoriaRequests from "../../../fetch/CategoriaRequests";

function FormEditarCategoria() {

    const [formData, setFormData] = useState<CategoriaDTO>({
        nome: ""
    });

    const { idCategoria } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const carregarCategoria = async () => {

            if (!idCategoria) {
                return;
            }

            const categoria =
                await CategoriaRequests.procurarCategoriaPorId(
                    Number(idCategoria)
                );

            if (categoria) {
                setFormData(categoria);
            }
        };

        carregarCategoria();

    }, [idCategoria]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData((categoriaAnterior) => ({
            ...categoriaAnterior,
            nome: e.target.value
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (formData.nome.trim() === "") {
            alert("O nome da categoria é obrigatório.");
            return;
        }

        if (formData.nome.trim().length > 80) {
            alert(
                "O nome da categoria deve possuir no máximo 80 caracteres."
            );
            return;
        }

        if (!idCategoria) {
            alert("ID da categoria inválido.");
            return;
        }

        const categoriaAtualizada: CategoriaDTO = {
            nome: formData.nome.trim()
        };

        const atualizacaoRealizada =
            await CategoriaRequests.atualizarCategoria(
                Number(idCategoria),
                categoriaAtualizada
            );

        if (atualizacaoRealizada) {

            alert("Categoria atualizada com sucesso!");

            navigate("/categorias");

        } else {

            alert("Não foi possível atualizar a categoria.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>

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

            <button type="submit">
                Atualizar categoria
            </button>

        </form>
    );
}

export default FormEditarCategoria;