import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 text-center shadow-2xl border border-gray-100">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <AlertTriangle size={40} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-secondary mb-4">Structural Anomaly Detected</h1>
            <p className="text-gray-500 mb-10 leading-relaxed">
              We've encountered a temporary architectural glitch. Our digital engineers are on the way.
            </p>
            <div className="space-y-4">
              <Button 
                variant="primary" 
                className="w-full h-14 rounded-2xl flex items-center justify-center gap-2"
                onClick={() => window.location.reload()}
              >
                <RefreshCw size={20} /> Re-Initialize Domain
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 border-gray-200"
                onClick={() => window.location.href = '/'}
              >
                <Home size={20} /> Return to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
