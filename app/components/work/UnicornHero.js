'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function UnicornHero() {
  const ref = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      if (!scriptLoaded || !mounted) return;

      // Wait a bit more to ensure the script is fully initialized
      await new Promise(resolve => setTimeout(resolve, 100));

      const US = window.UnicornStudio;
      if (!US || !mounted) return;

      try {
        await US.init({ dpi: 1.5, scale: 1 });
      } catch (error) {
        console.error('Failed to initialize UnicornStudio:', error);
      }
    }

    if (scriptLoaded) {
      boot();
    }

    return () => {
      mounted = false;
      if (window.UnicornStudio?.destroy) {
        try {
          window.UnicornStudio.destroy();
        } catch (error) {
          console.error('Failed to destroy UnicornStudio:', error);
        }
      }
    };
  }, [scriptLoaded]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const handleScriptError = (error) => {
    console.error('Failed to load UnicornStudio script:', error);
  };

  return (
    <>
      <Script
        id="unicorn-sdk"
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      <div className="w-full aspect-[16/10]">
        <div
          ref={ref}
          data-us-project="aWqHZNM0AaLhK9O2gexn?production=true"
          data-us-dpi="1.5"
          data-us-scale="1"
          data-us-lazyload="true"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  );
}