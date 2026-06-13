'use client';

import { useCallback, useState } from 'react';

import { JourneySection } from './JourneySection';
import { Starfield } from './Starfield';
import { Intro } from './Intro';

export function Experience() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocusChange = useCallback((focused: boolean) => {
    setIsFocused(focused);
  }, []);

  return (
    <>
      <Starfield isFocused={isFocused} />

      <div className="relative z-10">
        <Intro />
        <JourneySection onFocusChange={handleFocusChange} />
      </div>
    </>
  );
}
