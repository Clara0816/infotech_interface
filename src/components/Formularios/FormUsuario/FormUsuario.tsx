import { useState } from "react";
import UsuarioRequests from "../../../fetch/UsuarioRequests";

function FormUsuario() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const cadastrar = async () => {

        if (nome.trim() === "") {
            alert("O nome é obrigatório.");
            return;
        }

        if (email.trim() === "") {
            alert("O email é obrigatório.");
            return;
        }

        if (senha.trim() === "") {
            alert("A senha é obrigatória.");
            return;
        }

        if (senha.length < 6) {
            alert("A senha deve possuir pelo menos 6 caracteres.");
            return;
        }

        const sucesso = await UsuarioRequests.cadastrarUsuario({
            nome: nome.trim(),
            email: email.trim(),
            senha: senha
        });

        if (sucesso) {
            alert("Usuário cadastrado com sucesso!");

            setNome("");
            setEmail("");
            setSenha("");
        } else {
            alert("Não foi possível cadastrar o usuário.");
        }
    };

    return (
        <section>
            <h1>Criar usuário</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    cadastrar();
                }}
            >
                <div>
                    <label htmlFor="nome">
                        Nome
                    </label>

                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) =>
                            setNome(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="senha">
                        Senha
                    </label>

                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                    />
                </div>

                <button type="submit">
                    Criar usuário
                </button>
            </form>
        </section>
    );
}

export default FormUsuario;