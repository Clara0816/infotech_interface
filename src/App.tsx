import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import PInicio from "./pages/PInicio/PInicio";

import PListagemProduto from "./pages/PListagem/PListagemProduto/PListagemProduto";
import PCadastroProduto from "./pages/PCadastro/PCadastroProduto/PCadastroProduto";
import PEditarProduto from "./pages/PEditarProduto/PEditarProduto";

import PListagemCategoria from "./pages/PListagem/PListagemCategoria/PListagemCategoria";
import PCadastroCategoria from "./pages/PCadastro/PCadastroCategoria/PCadastroCategoria";
import PEditarCategoria from "./pages/PEditarCategoria/PEditarCategoria";

import PListagemMovimentacao from "./pages/PListagem/PListagemMovimentacao/PListagemMovimentacao";
import PCadastroMovimentacao from "./pages/PCadastro/PCadastroMovimentacao/PCadastroMovimentacao";
import PEditarMovimentacao from "./pages/PEditarMovimentacao/PEditarMovimentacao";

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

                {/* PRODUTO */}

                <Route
                    path="/produtos"
                    element={<PListagemProduto />}
                />

                <Route
                    path="/cadastro-produto"
                    element={<PCadastroProduto />}
                />

                <Route
                    path="/editar-produto/:idProduto"
                    element={<PEditarProduto />}
                />

                {/* CATEGORIA */}

                <Route
                    path="/categorias"
                    element={<PListagemCategoria />}
                />

                <Route
                    path="/cadastro-categoria"
                    element={<PCadastroCategoria />}
                />

                <Route
                    path="/editar-categoria/:idCategoria"
                    element={<PEditarCategoria />}
                />

                {/* MOVIMENTAÇÃO */}

                <Route
                    path="/movimentacoes"
                    element={<PListagemMovimentacao />}
                />

                <Route
                    path="/cadastro-movimentacao"
                    element={<PCadastroMovimentacao />}
                />

                <Route
                    path="/editar-movimentacao/:idMovimentacao"
                    element={<PEditarMovimentacao />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;