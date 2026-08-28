import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import PInicio from "./pages/PInicio/PInicio";
import PListagemProduto from "./pages/PListagem/PListagemProduto/PListagemProduto";
import PCadastroProduto from "./pages/PCadastro/PCadastroProduto/PCadastroProduto";

import Navegacao from "./components/Navegacao/Navegacao";

function App() {

    return (
        <BrowserRouter>

            <Navegacao />

            <Routes>

                <Route
                    path="/"
                    element={<PInicio />}
                />

                <Route
                    path="/produtos"
                    element={<PListagemProduto />}
                />

                <Route
                    path="/cadastro-produto"
                    element={<PCadastroProduto />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;