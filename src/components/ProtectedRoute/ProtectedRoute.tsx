import { Navigate } from "react-router-dom";

function ProtectedRoute({
    children
}: {
    children: React.ReactNode;
}) {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (!usuarioLogado) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;