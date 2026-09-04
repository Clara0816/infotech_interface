import type MovimentacaoDTO from "../dto/MovimentacaoDTO";

const url = "http://localhost:3333/api/movimentacao";

class MovimentacaoRequests {

    async obterListaDeMovimentacoes(): Promise<MovimentacaoDTO[] | null> {
        try {
            const resposta = await fetch(url);

            if (!resposta.ok) {
                throw new Error("Erro ao buscar movimentações");
            }

            return await resposta.json();

        } catch (erro) {
            console.error(erro);
            return null;
        }
    }

    async cadastrarMovimentacao(
        movimentacao: MovimentacaoDTO
    ): Promise<boolean> {
        try {
            const resposta = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movimentacao)
            });

            return resposta.ok;

        } catch (erro) {
            console.error(erro);
            return false;
        }
    }

    async corrigirMovimentacao(
        idMovimentacao: number,
        movimentacao: MovimentacaoDTO
    ): Promise<boolean> {

        try {

            const resposta = await fetch(
                `${url}/${idMovimentacao}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(movimentacao)
                }
            );

            return resposta.ok;

        } catch (erro) {

            console.error(erro);
            return false;
        }
    }
}

export default new MovimentacaoRequests();