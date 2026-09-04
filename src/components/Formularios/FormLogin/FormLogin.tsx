import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type UsuarioDTO from "../../../dto/UsuarioDTO";
import UsuarioRequests from "../../../fetch/UsuarioRequests";
import "./FormLogin.css";

function FormLogin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const entrar = async () => {
        if (email.trim() === "") {
            alert("O email é obrigatório.");
            return;
        }

        if (senha.trim() === "") {
            alert("A senha é obrigatória.");
            return;
        }

        const usuario: UsuarioDTO = {
            email: email.trim(),
            senha: senha
        };

        const usuarioLogado = await UsuarioRequests.login(usuario);

        if (usuarioLogado) {
            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(usuarioLogado)
            );

            alert("Login realizado com sucesso!");

            window.location.href = "/";
        } else {
            alert("Email ou senha inválidos.");
        }
    };

    return (
        <section className="login-form-container">
            <form
                className="login-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    entrar();
                }}
            >
                <h2 className="login-header">LOGIN</h2>

                <div className="form-group">
                    <label htmlFor="email">
                        E-mail
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Informe o seu email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="senha">
                        Senha
                    </label>

                    <input
                        id="senha"
                        type="password"
                        placeholder="Informe sua senha"
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="login-button"
                >
                    Entrar
                </button>

                <button
                    type="button"
                    className="cadastro-button"
                    onClick={() =>
                        navigate("/cadastro-usuario")
                    }
                >
                    Criar novo usuário
                </button>
            </form>
        </section>
    );
}

export default FormLogin;