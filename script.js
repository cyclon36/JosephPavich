document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('scroll-container');
  const track = document.getElementById('scroll-track');
  const images = track ? track.querySelectorAll('img') : [];
  const numImages = images.length;

  function setContainerHeight() {
    if (!container) return;
    // Ensure enough vertical scroll for all images
    container.style.height = (numImages * window.innerHeight) + 'px';
  }

  function handleScroll() {
    if (!container || !track || numImages === 0) return;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const scrollY = window.scrollY;
    const start = containerTop;
    const end = containerTop + containerHeight - windowHeight;
    const maxTranslate = windowWidth * (numImages - 1);

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

  // Important: always update sizes on resize and load
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    setContainerHeight();
    handleScroll();
  });

  setContainerHeight();
  handleScroll();
});
