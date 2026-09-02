import type MovimentacaoDTO from "../dto/MovimentacaoDTO";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

class MovimentacaoRequests {

    private serverURL: string;
    private endpointMovimentacao: string;

    constructor() {
        this.serverURL = API_URL;
        this.endpointMovimentacao = "/api/movimentacao";
    }

    async obterListaDeMovimentacoes(): Promise<MovimentacaoDTO[] | undefined> {
        try {

            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointMovimentacao}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!respostaAPI.ok) {
                throw new Error(
                    "Não foi possível listar as movimentações."
                );
            }

            const listaDeMovimentacoes: MovimentacaoDTO[] =
                await respostaAPI.json();

            return listaDeMovimentacoes;

        } catch (error) {

            console.error(
                `Erro ao buscar as movimentações: ${error}`
            );

            return undefined;
        }
    }

    async procurarMovimentacaoPorId(
        idMovimentacao: number
    ): Promise<MovimentacaoDTO | undefined> {
        try {

            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointMovimentacao}/${idMovimentacao}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!respostaAPI.ok) {
                throw new Error(
                    "Não foi possível encontrar a movimentação."
                );
            }

            const movimentacao: MovimentacaoDTO =
                await respostaAPI.json();

            return movimentacao;

        } catch (error) {

            console.error(
                `Erro ao buscar a movimentação: ${error}`
            );

            return undefined;
        }
    }

    async cadastrarMovimentacao(
        movimentacao: MovimentacaoDTO
    ): Promise<boolean> {
        try {

            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointMovimentacao}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(movimentacao)
                }
            );

            if (!respostaAPI.ok) {

                const erro = await respostaAPI.json();

                console.error(
                    `Erro ao cadastrar movimentação: ${erro.mensagem}`
                );

                return false;
            }

            return true;

        } catch (error) {

            console.error(
                `Erro ao cadastrar a movimentação: ${error}`
            );

            return false;
        }
    }

    async atualizarMovimentacao(
        idMovimentacao: number,
        movimentacao: MovimentacaoDTO
    ): Promise<boolean> {
        try {

            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointMovimentacao}/${idMovimentacao}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(movimentacao)
                }
            );

            if (!respostaAPI.ok) {

                const erro = await respostaAPI.json();

                console.error(
                    `Erro ao atualizar movimentação: ${erro.mensagem}`
                );

                return false;
            }

            return true;

        } catch (error) {

            console.error(
                `Erro ao atualizar a movimentação: ${error}`
            );

            return false;
        }
    }
}

export default new MovimentacaoRequests();