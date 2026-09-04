import type CategoriaDTO from "../dto/CategoriaDTO";

const url = "http://localhost:3333/api/categoria";

class CategoriaRequests {

    async obterListaDeCategorias(): Promise<CategoriaDTO[] | null> {
        try {
            const resposta = await fetch(url);

            if (!resposta.ok) {
                throw new Error("Erro ao buscar categorias");
            }

            return await resposta.json();

        } catch (erro) {
            console.error(erro);
            return null;
        }
    }

    async cadastrarCategoria(categoria: CategoriaDTO): Promise<boolean> {
        try {
            const resposta = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoria)
            });

            return resposta.ok;

        } catch (erro) {
            console.error(erro);
            return false;
        }
    }

    async atualizarCategoria(
        idCategoria: number,
        categoria: CategoriaDTO
    ): Promise<boolean> {
        try {
            const resposta = await fetch(
                `${url}/${idCategoria}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoria)
                }
            );

            return resposta.ok;

        } catch (erro) {
            console.error(erro);
            return false;
        }
    }
}

export default new CategoriaRequests();