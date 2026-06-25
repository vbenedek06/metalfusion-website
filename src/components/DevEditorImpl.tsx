import { useEffect, useRef, useState } from 'react';
import './DevEditor.css';

const STORAGE_KEY = 'dev-editing';
const ATTR = 'data-edit-key';

function getInitialEditing(): boolean {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem(STORAGE_KEY) === '1';
}

function applyEditing(on: boolean): void {
  document.body.classList.toggle('dev-editing', on);
  const nodes = document.querySelectorAll<HTMLElement>(`[${ATTR}]`);
  nodes.forEach((el) => {
    if (on) {
      el.setAttribute('contenteditable', 'plaintext-only');
      el.setAttribute('spellcheck', 'false');
    } else {
      el.removeAttribute('contenteditable');
      el.removeAttribute('spellcheck');
      el.blur();
    }
  });
}

function makeEditable(el: HTMLElement): void {
  el.setAttribute('contenteditable', 'plaintext-only');
  el.setAttribute('spellcheck', 'false');
}

export default function DevEditorImpl() {
  const [editing, setEditing] = useState<boolean>(getInitialEditing);
  const [toast, setToast] = useState<{ text: string; kind: 'ok' | 'err' } | null>(null);
  const originalText = useRef<string>('');
  const toastTimer = useRef<number | undefined>(undefined);

  const showToast = (text: string, kind: 'ok' | 'err') => {
    setToast({ text, kind });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1800);
  };

  // Toggle state ↔ DOM + sessionStorage
  useEffect(() => {
    applyEditing(editing);
    if (editing) window.sessionStorage.setItem(STORAGE_KEY, '1');
    else window.sessionStorage.removeItem(STORAGE_KEY);
  }, [editing]);

  // Alt+E toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        setEditing((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Watch DOM for new [data-edit-key] nodes (route changes, dynamic content)
  useEffect(() => {
    if (!editing) return;
    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        rec.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.hasAttribute?.(ATTR)) makeEditable(el);
          el.querySelectorAll?.(`[${ATTR}]`).forEach((c) => makeEditable(c as HTMLElement));
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [editing]);

  // Focus / blur / key handling on [data-edit-key]
  useEffect(() => {
    if (!editing) return;

    const closestEditable = (el: EventTarget | null): HTMLElement | null => {
      if (!(el instanceof HTMLElement)) return null;
      return el.closest(`[${ATTR}]`);
    };

    const onFocusIn = (e: FocusEvent) => {
      const el = closestEditable(e.target);
      if (!el) return;
      originalText.current = el.textContent ?? '';
    };

    const onClick = (e: MouseEvent) => {
      const el = closestEditable(e.target);
      if (!el) return;
      const a = (e.target as HTMLElement).closest('a,button');
      if (a) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onKey = async (e: KeyboardEvent) => {
      const el = closestEditable(e.target);
      if (!el) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        el.textContent = originalText.current;
        el.blur();
        return;
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const key = el.getAttribute(ATTR) ?? '';
        const value = (el.textContent ?? '').trim();
        if (!value) {
          el.textContent = originalText.current;
          showToast('Üres érték — visszaállítva', 'err');
          el.blur();
          return;
        }

        try {
          const res = await fetch('/__edit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value }),
          });
          if (!res.ok) {
            const reason = await res.text();
            el.textContent = originalText.current;
            showToast(`Hiba: ${reason || res.status}`, 'err');
            console.error('[DevEditor] save failed', res.status, reason);
            return;
          }
          showToast('Mentve · újratöltés…', 'ok');
          window.setTimeout(() => window.location.reload(), 350);
        } catch (err) {
          el.textContent = originalText.current;
          showToast('Hálózati hiba', 'err');
          console.error('[DevEditor] network error', err);
        }
      }
    };

    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [editing]);

  return (
    <>
      <button
        type="button"
        className="dev-editor-fab"
        data-on={editing}
        onClick={() => setEditing((v) => !v)}
        title="Alt+E"
      >
        <span className="dev-editor-fab__dot" />
        {editing ? 'Szerkesztés: BE' : 'Szerkesztés'}
      </button>
      <div className="dev-editor-toast" data-show={!!toast} data-kind={toast?.kind ?? 'ok'}>
        {toast?.text ?? ''}
      </div>
    </>
  );
}
