import { useState } from "react";
import FormLogin from "../../components/Formularios/FormLogin/FormLogin";

function PInicio() {
    const [usuarioLogado] = useState(
        localStorage.getItem("usuarioLogado") !== null
    );

    const [mostrarLogin, setMostrarLogin] = useState(false);

    return (
        <main>
            <h1>Bem-vindo à Infotech</h1>

            <p>
                Encontre os melhores produtos tecnológicos
                para você.
            </p>

            {!usuarioLogado && !mostrarLogin && (
                <button
                    type="button"
                    onClick={() => setMostrarLogin(true)}
                >
                    Entrar
                </button>
            )}

            {!usuarioLogado && mostrarLogin && (
                <FormLogin />
            )}
        </main>
    );
}

export default PInicio;