function PPerfil() {
    const dadosUsuario = localStorage.getItem("usuarioLogado");

    const usuario = dadosUsuario
        ? JSON.parse(dadosUsuario)
        : null;

    return (
        <main>
            <h1>Meu perfil</h1>

            {usuario && (
                <>
                    <p>
                        <strong>Nome:</strong> {usuario.nome}
                    </p>

                    <p>
                        <strong>Email:</strong> {usuario.email}
                    </p>
                </>
            )}
        </main>
    );
}

export default PPerfil;