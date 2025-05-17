export function scrollToTop(duration: number = 1000) {
  if (document.scrollingElement!.scrollTop === 0) return;

  const cosParameter = document.scrollingElement!.scrollTop / 2;
  let scrollCount = 0;
  let oldTimestamp: number | null = null;

  function step(newTimestamp: number) {
    if (oldTimestamp !== null) {
      scrollCount += (Math.PI * (newTimestamp - oldTimestamp)) / duration;
      if (scrollCount >= Math.PI) return (document.scrollingElement!.scrollTop = 0);
      document.scrollingElement!.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
} 