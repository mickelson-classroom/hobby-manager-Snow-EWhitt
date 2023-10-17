import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("There has been an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <h1 className="text-center">Sorry... there was an error</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
