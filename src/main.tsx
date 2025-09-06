import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Toaster from './Toaster';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
        <Toaster />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);