const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;

// Set proper heights and widths
function setTrackAndContainer() {
  if (!track || !container) return;
  const vw = window.innerWidth;
  const vh = window.innerHeight * 0.5; // 50vh for slideshow
  track.style.width = (numImages * vw) + 'px';
  track.style.height = vh + 'px';
  images.forEach(img => {
    img.style.width = vw + 'px';
    img.style.height = vh + 'px';
  });
  container.style.height = (numImages * window.innerHeight) + 'px'; // 100vh per image
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

  // Use full 100vh per image for vertical scroll area
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
