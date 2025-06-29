document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('scroll-container');
  const track = document.getElementById('scroll-track');
  const images = track ? track.querySelectorAll('img') : [];
  const numImages = images.length;

  function setContainerHeight() {
    // Always set the height to exactly numImages * window.innerHeight
    if (!container) return;
    container.style.height = (numImages * window.innerHeight) + 'px';
  }

  function handleScroll() {
    if (!container || !track || numImages === 0) return;
    const windowHeight = window.innerHeight;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const scrollY = window.scrollY;
    const start = containerTop;
    const end = containerTop + containerHeight - windowHeight;

    // Use (numImages - 1) * window.innerWidth for translation—matches the number of transitions
    const maxTranslate = window.innerWidth * (numImages - 1);

    if (scrollY >= start && scrollY <= end) {
      const totalScrollable = containerHeight - windowHeight;
      const progress = Math.min(Math.max((scrollY - containerTop) / totalScrollable, 0), 1);
      const translateX = -maxTranslate * progress;
      track.style.transform = `translateX(${translateX}px)`;
      document.body.style.overflow = 'hidden';
    } else {
      track.style.transform = scrollY < start
        ? 'translateX(0)'
        : `translateX(-${maxTranslate}px)`;
      document.body.style.overflow = '';
    }
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    setContainerHeight();
    handleScroll();
  });

  setContainerHeight();
  handleScroll();
});
