import { Suspense, lazy } from 'react';

// Lazy import keeps DevEditorImpl + DevEditor.css OUT of the production bundle:
// in prod `import.meta.env.DEV` is statically `false`, so `Impl` stays `null`
// and Rollup tree-shakes the dynamic import call entirely.
const Impl = import.meta.env.DEV ? lazy(() => import('./DevEditorImpl')) : null;

export default function DevEditor() {
  if (!Impl) return null;
  return (
    <Suspense fallback={null}>
      <Impl />
    </Suspense>
  );
}
