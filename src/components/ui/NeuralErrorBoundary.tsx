import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, ShieldAlert } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class NeuralErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Neural Component Failure:", error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="w-full h-[500px] flex items-center justify-center bg-gray-50 rounded-[3rem] border border-gray-100 p-12">
                    <div className="max-w-md text-center">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8"
                        >
                            <ShieldAlert size={40} />
                        </motion.div>
                        <h2 className="text-3xl font-serif font-bold text-secondary mb-4">Neural Recalibration</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                            Our advanced spatial engine is undergoing a temporary re-synchronization. Please refresh the township view or explore our static project collection.
                        </p>
                        <button 
                            onClick={this.handleReset}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-2xl font-bold hover:bg-accent transition-all shadow-xl group"
                        >
                            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                            Synchronize Township
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
