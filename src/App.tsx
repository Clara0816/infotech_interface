import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import PInicio from "./pages/PInicio/PInicio";

import PListagemProduto from "./pages/PListagem/PListagemProduto/PListagemProduto";
import PCadastroProduto from "./pages/PCadastro/PCadastroProduto/PCadastroProduto";

import PListagemCategoria from "./pages/PListagem/PListagemCategoria/PListagemCategoria";
import PCadastroCategoria from "./pages/PCadastro/PCadastroCategoria/PCadastroCategoria";

import PListagemMovimentacao from "./pages/PListagem/PListagemMovimentacao/PListagemMovimentacao";
import PCadastroMovimentacao from "./pages/PCadastro/PCadastroMovimentacao/PCadastroMovimentacao";

import PLogin from "./pages/PLogin/PLogin";
import PCadastroUsuario from "./pages/PCadastro/PCadastroUsuario/PCadastroUsuario";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import PPerfil from "./pages/PPerfil/PPerfil";

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
                    path="/login"
                    element={<PLogin />}
                />

                <Route
                    path="/cadastro-usuario"
                    element={<PCadastroUsuario />}
                />

                <Route
                    path="/perfil"
                    element={
                        <ProtectedRoute>
                            <PPerfil />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/produtos"
                    element={
                        <ProtectedRoute>
                            <PListagemProduto />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cadastro-produto"
                    element={
                        <ProtectedRoute>
                            <PCadastroProduto />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/categorias"
                    element={
                        <ProtectedRoute>
                            <PListagemCategoria />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cadastro-categoria"
                    element={
                        <ProtectedRoute>
                            <PCadastroCategoria />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/movimentacoes"
                    element={
                        <ProtectedRoute>
                            <PListagemMovimentacao />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cadastro-movimentacao"
                    element={
                        <ProtectedRoute>
                            <PCadastroMovimentacao />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;