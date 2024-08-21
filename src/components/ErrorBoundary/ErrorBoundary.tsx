import { Component, ErrorInfo, ReactNode } from "react";
import Button from "@/components/base/Button";
import "./ErrorBoundary.styles.scss";

type Props = {
  children: ReactNode;
};

type State = {
  errorMessage: string;
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      errorMessage: "",
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState((prev) => ({ ...prev, errorMessage: error.message }));
    console.log("ERROR ===>", error, "\n", "===> ERROR INFO ===>", errorInfo);
  }

  handleReset = () => {
    this.setState((prev) => ({ ...prev, hasError: false }));
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2 className="error-boundary__title">Ooooooppps...!</h2>
          <p className="error-boundary__error">
            {this?.state.errorMessage || "Something must have broken!"}
          </p>
          <Button size="lg" variant="primary" onClick={this.handleReset}>
            Retry
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
