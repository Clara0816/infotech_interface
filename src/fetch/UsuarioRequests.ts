import type UsuarioDTO from "../dto/UsuarioDTO";

const url = "http://localhost:3333/api/login";

class UsuarioRequests {

    async login(
        usuario: UsuarioDTO
    ): Promise<{
        idUsuario: number;
        nome: string;
        email: string;
    } | null> {

        try {

            const resposta = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            if (!resposta.ok) {
                return null;
            }

            const dados = await resposta.json();

            return dados.usuario;

        } catch (erro) {

            console.error(
                `Erro ao realizar login: ${erro}`
            );

            return null;
        }
    }

    async cadastrarUsuario(
        usuario: {
            nome: string;
            email: string;
            senha: string;
        }
    ): Promise<boolean> {

        try {

            const resposta = await fetch(
                "http://localhost:3333/api/usuario",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)
                }
            );

            return resposta.ok;

        } catch (erro) {

            console.error(
                `Erro ao cadastrar usuário: ${erro}`
            );

            return false;
        }
    }
}

export default new UsuarioRequests();