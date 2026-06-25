import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info.componentStack);
    }
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'var(--bg, #0b0d10)',
          color: 'var(--text, #e7ecf2)',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-mute, #7c8693)',
              marginBottom: 16,
            }}
          >
            Hiba történt
          </p>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Az oldal betöltése megszakadt.</h1>
          <p style={{ color: 'var(--text-dim, #aab3bf)', marginBottom: 24 }}>
            Próbálja meg újratölteni az oldalt. Ha a hiba ismétlődik, írjon a{' '}
            <a href="mailto:info@metalfusion.hu" style={{ color: 'var(--accent-strong, #2f8dff)' }}>
              info@metalfusion.hu
            </a>{' '}
            címre.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              padding: '12px 24px',
              background: 'var(--accent, #1f72d8)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontFamily: 'inherit',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Oldal újratöltése
          </button>
        </div>
      </div>
    );
  }
}
