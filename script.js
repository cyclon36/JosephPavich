const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;

function setContainerHeight() {
  if (!container) return;
  // The scrollable area should be (numImages - 1) * window.innerHeight + window.innerHeight
  // which is numImages * window.innerHeight
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

  // The horizontal track should move exactly one full image per "screenful" of scroll
  if (scrollY >= start && scrollY <= end) {
    const totalScrollable = containerHeight - windowHeight; // This is (numImages - 1) * window.innerHeight
    const progress = Math.min(Math.max((scrollY - containerTop) / totalScrollable, 0), 1);
    const maxTranslate = window.innerWidth * (numImages - 1);
    const translateX = -maxTranslate * progress;
    track.style.transform = `translateX(${translateX}px)`;
    document.body.style.overflow = 'hidden';
  } else {
    track.style.transform = scrollY < start
      ? 'translateX(0)'
      : `translateX(-${window.innerWidth * (numImages - 1)}px)`;
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
