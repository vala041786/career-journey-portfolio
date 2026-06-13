'use client';

import { useEffect, useState } from 'react';

/** Detect browser zoom-out / compact viewport so the full journey stays readable. */
export function useCompactView() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => {
      const vv = window.visualViewport;
      const scale = vv?.scale ?? 1;
      const zoomedOut = scale < 0.92;
      const wideAndShort = window.innerWidth >= 640 && window.innerHeight <= 560;
      const isCompact = zoomedOut || wideAndShort;

      setCompact(isCompact);
      document.documentElement.toggleAttribute('data-compact-view', isCompact);
    };

    update();
    const vv = window.visualViewport;
    window.addEventListener('resize', update);
    vv?.addEventListener('resize', update);
    vv?.addEventListener('scroll', update);

    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
      document.documentElement.removeAttribute('data-compact-view');
    };
  }, []);

  return compact;
}
