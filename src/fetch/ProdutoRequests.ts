import type ProdutoDTO from "../dto/ProdutoDTO";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

class ProdutoRequests {

    private serverURL: string;
    private endpointProduto: string;

    constructor() {
        this.serverURL = API_URL;
        this.endpointProduto = "/api/produto";
    }

    async obterListaDeProdutos(): Promise<ProdutoDTO[] | undefined> {

        try {

            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointProduto}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!respostaAPI.ok) {
                throw new Error(
                    "Não foi possível listar os produtos."
                );
            }

            const listaDeProdutos: ProdutoDTO[] =
                await respostaAPI.json();

            return listaDeProdutos;

        } catch (error) {

            console.error(
                `Erro ao buscar os produtos: ${error}`
            );

            return undefined;
        }
    }

    async procurarProdutoPorId(
        idProduto: number
    ): Promise<ProdutoDTO | undefined> {

        try {

            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointProduto}/${idProduto}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!respostaAPI.ok) {
                throw new Error(
                    "Não foi possível encontrar o produto."
                );
            }

            const produto: ProdutoDTO =
                await respostaAPI.json();

            return produto;

        } catch (error) {

            console.error(
                `Erro ao buscar o produto: ${error}`
            );

            return undefined;
        }
    }

    async cadastrarProduto(
        produto: ProdutoDTO
    ): Promise<boolean> {

        try {

            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointProduto}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(produto)
                }
            );

            if (!respostaAPI.ok) {

                const erro = await respostaAPI.json();

                console.error(
                    `Erro ao cadastrar produto: ${erro.mensagem}`
                );

                return false;
            }

            return true;

        } catch (error) {

            console.error(
                `Erro ao cadastrar o produto: ${error}`
            );

            return false;
        }
    }
}

export default new ProdutoRequests();