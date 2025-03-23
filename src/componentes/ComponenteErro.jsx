import React from "react";
import ErrorBoundary from "./ErrorBoundary"; // Certifique-se de que o caminho está correto

const ComponenteErro = () => {
    throw new Error("Erro proposital para testar o ErrorBoundary!");
};

function TestandoErrorBoundary() {
    return (
        <div>
            <h1>Teste de ErrorBoundary</h1>
            <ErrorBoundary>
                <ComponenteErro />
            </ErrorBoundary>
        </div>
    );
}

export default TestandoErrorBoundary;