import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Erro capturado pelo ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h3>Algo deu errado ao carregar os médicos.</h3>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
