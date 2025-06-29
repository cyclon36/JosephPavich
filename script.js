const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;

// Dynamically set track width and container height for perfect scrolling
function setTrackAndContainer() {
  if (!track || !container) return;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  track.style.width = (numImages * vw) + 'px';
  images.forEach(img => {
    img.style.width = vw + 'px';
    img.style.height = vh + 'px';
  });
  container.style.height = (numImages * vh) + 'px';
}

function handleScroll() {
  if (!container || !track || numImages === 0) {
    document.body.style.overflow = '';
    return;
  }
  const windowHeight = window.innerHeight;
  const containerTop = container.offsetTop;
  const containerHeight = container.offsetHeight;
  const scrollY = window.scrollY;

  // Only activate effect when inside slideshow section
  if (scrollY >= containerTop && scrollY < containerTop + containerHeight - windowHeight) {
    const totalScrollable = containerHeight - windowHeight;
    const progress = (scrollY - containerTop) / totalScrollable;
    const maxTranslate = track.offsetWidth - window.innerWidth;
    const translateX = -maxTranslate * progress;
    track.style.transform = `translateX(${translateX}px)`;
    document.body.style.overflow = 'hidden'; // Lock scroll
  } else {
    track.style.transform = 'translateX(0)';
    document.body.style.overflow = '';
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
  setTrackAndContainer();
  handleScroll();
});

// Initial setup
setTrackAndContainer();
handleScroll();
