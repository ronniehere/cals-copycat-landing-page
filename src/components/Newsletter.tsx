import { useEffect, useRef, useState } from "react";

const Newsletter = () => {
  // Adjust these to crop the embedded form on each side (in pixels)
  const IFRAME_WIDTH = 540;   // Brevo iframe width
  const IFRAME_HEIGHT = 1000; // Ensure taller than needed
  const cropTop = 30;   // crop from the top
  const cropRight = 25; // crop from the right
  const cropBottom = 300; // crop from the bottom
  const cropLeft = 25;  // crop from the left

  const visibleWidth = IFRAME_WIDTH - cropLeft - cropRight;
  const visibleHeight = IFRAME_HEIGHT - cropTop - cropBottom;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      const s = Math.min(1, width / visibleWidth);
      setScale(s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [visibleWidth]);
  return (
    <div id="newsletter" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-playfair">
          Subscribe to our Newsletter
        </h2>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto font-inter">
          Get product updates, health tips, and exclusive offers straight to your inbox.
        </p>
        <div className="mt-8 flex justify-center">
          <div
            ref={wrapperRef}
            className="w-full"
            style={{ maxWidth: visibleWidth, height: visibleHeight * scale }}
          >
            <div
              style={{
                width: visibleWidth,
                height: visibleHeight,
                transform: `scale(${scale})`,
                transformOrigin: 'top left'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: visibleWidth,
                  height: visibleHeight,
                  overflow: 'hidden'
                }}
              >
                <iframe
                  title="Cals Newsletter Signup"
                  width={IFRAME_WIDTH}
                  height={IFRAME_HEIGHT}
                  src="https://077a7f4a.sibforms.com/serve/MUIFAMcNWaFMw9QsewW5Qm7BOWBE0egbeVizV8F8UT7qs_9RGLLsd5owpUBXdL-28WI6YUA5zqd_AxykrsLGSU878aJuH8eyKYg8SozXxu5393eQnZQUMZmUiGQmW9I5gdSc4Eqg6M1F6uXzmGVCEEgANakLmAA2LRNzxlWxR5aBc8nQVWnKJyoUxhGb0KazGcmyzNJr4Jr8FDbg"
                  frameBorder={0}
                  scrolling="no"
                  allowFullScreen
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: -cropTop,
                    left: -cropLeft,
                    border: 0
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;


