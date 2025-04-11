// src/setupTests.ts
import "@testing-library/jest-dom";

// Polyfill for window.matchMedia (if you haven't added it already)
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Polyfill for HTMLCanvasElement getContext to avoid "clearRect" errors in jsdom
if (typeof HTMLCanvasElement !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLCanvasElement.prototype.getContext = function (contextType: string): any {
    if (contextType === "2d") {
      // Return a minimal stub that supports clearRect, etc.
      return {
        clearRect: () => {},
        // Optionally add stubs for any additional methods uPlot or your tests might call:
        fillRect: () => {},
        getImageData: () => ({ data: [] }),
        putImageData: () => {},
        createImageData: () => [],
        setTransform: () => {},
        drawImage: () => {},
        save: () => {},
        fillText: () => {},
        restore: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        translate: () => {},
        scale: () => {},
        rotate: () => {},
        arc: () => {},
      } as unknown as CanvasRenderingContext2D;
    }
    return null;
  };
}
