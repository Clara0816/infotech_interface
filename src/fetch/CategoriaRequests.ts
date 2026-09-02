import type CategoriaDTO from "../dto/CategoriaDTO";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

class CategoriaRequests {

    private serverURL: string;
    private endpointCategoria: string;

    constructor() {
        this.serverURL = API_URL;
        this.endpointCategoria = "/api/categoria";
    }

    async obterListaDeCategorias(): Promise<CategoriaDTO[] | undefined> {
        try {
            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointCategoria}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!respostaAPI.ok) {
                throw new Error(
                    "Não foi possível listar as categorias."
                );
            }

            const listaDeCategorias: CategoriaDTO[] =
                await respostaAPI.json();

            return listaDeCategorias;

        } catch (error) {
            console.error(
                `Erro ao buscar as categorias: ${error}`
            );

            return undefined;
        }
    }

    async procurarCategoriaPorId(
        idCategoria: number
    ): Promise<CategoriaDTO | undefined> {
        try {
            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointCategoria}/${idCategoria}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!respostaAPI.ok) {
                throw new Error(
                    "Não foi possível encontrar a categoria."
                );
            }

            const categoria: CategoriaDTO =
                await respostaAPI.json();

            return categoria;

        } catch (error) {
            console.error(
                `Erro ao buscar a categoria: ${error}`
            );

            return undefined;
        }
    }

    async cadastrarCategoria(
        categoria: CategoriaDTO
    ): Promise<boolean> {
        try {
            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointCategoria}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoria)
                }
            );

            if (!respostaAPI.ok) {
                const erro = await respostaAPI.json();

                console.error(
                    `Erro ao cadastrar categoria: ${erro.mensagem}`
                );

                return false;
            }

            return true;

        } catch (error) {
            console.error(
                `Erro ao cadastrar a categoria: ${error}`
            );

            return false;
        }
    }

    async atualizarCategoria(
        idCategoria: number,
        categoria: CategoriaDTO
    ): Promise<boolean> {
        try {
            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointCategoria}/${idCategoria}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoria)
                }
            );

            if (!respostaAPI.ok) {
                const erro = await respostaAPI.json();

                console.error(
                    `Erro ao atualizar categoria: ${erro.mensagem}`
                );

                return false;
            }

            return true;

        } catch (error) {
            console.error(
                `Erro ao atualizar a categoria: ${error}`
            );

            return false;
        }
    }
}

export default new CategoriaRequests();