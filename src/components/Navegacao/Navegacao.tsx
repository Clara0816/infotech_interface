import { useState } from "react";

function Navegacao() {
    const [usuarioLogado, setUsuarioLogado] = useState(
        localStorage.getItem("usuarioLogado") !== null
    );

    const deslogar = () => {
        localStorage.removeItem("usuarioLogado");
        setUsuarioLogado(false);
        window.location.href = "/";
    };

    return (
        <nav className="navegacao">
            <div className="navegacao-links">
                <a href="/">Início</a>

                {usuarioLogado && (
                    <>
                        <a href="/produtos">
                            Produtos
                        </a>

                        <a href="/categorias">
                            Categorias
                        </a>

                        <a href="/movimentacoes">
                            Movimentações
                        </a>
                    </>
                )}
            </div>

            {usuarioLogado && (
                <div className="navegacao-usuario">
                    <a href="/perfil">
                        Perfil
                    </a>

                    <button
                        type="button"
                        onClick={deslogar}
                    >
                        Sair
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navegacao;