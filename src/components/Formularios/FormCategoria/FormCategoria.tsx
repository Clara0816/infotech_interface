import { useState } from "react";
import type CategoriaDTO from "../../../dto/CategoriaDTO";
import CategoriaRequests from "../../../fetch/CategoriaRequests";

function FormCategoria() {

    const [formData, setFormData] = useState<CategoriaDTO>({
        nome: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setFormData((categoriaAnterior) => ({
            ...categoriaAnterior,
            [name]: value
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

        const categoriaParaCadastro: CategoriaDTO = {
            nome: formData.nome.trim()
        };

        const cadastroRealizado =
            await CategoriaRequests.cadastrarCategoria(
                categoriaParaCadastro
            );

        if (cadastroRealizado) {

            alert("Categoria cadastrada com sucesso!");

            setFormData({
                nome: ""
            });

        } else {

            alert("Não foi possível cadastrar a categoria.");
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
                Cadastrar categoria
            </button>

        </form>
    );
}

export default FormCategoria;