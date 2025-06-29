const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;

// Don't set widths in JS! Let CSS handle image and track sizing.

function setContainerHeight() {
  // Container height = numImages * window.innerHeight
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
  if (scrollY >= start && scrollY <= end) {
    const totalScrollable = containerHeight - windowHeight;
    const progress = Math.min(Math.max((scrollY - containerTop) / totalScrollable, 0), 1);
    const maxTranslate = track.scrollWidth - window.innerWidth;
    const translateX = -maxTranslate * progress;
    track.style.transform = `translateX(${translateX}px)`;
    document.body.style.overflow = 'hidden';
  } else {
    // snap back if outside range
    track.style.transform = scrollY < start
      ? 'translateX(0)'
      : `translateX(-${track.scrollWidth - window.innerWidth}px)`;
    document.body.style.overflow = '';
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
  setContainerHeight();
  handleScroll();
});

window.addEventListener('DOMContentLoaded', () => {
  setContainerHeight();
  handleScroll();
});

setContainerHeight();
handleScroll();
