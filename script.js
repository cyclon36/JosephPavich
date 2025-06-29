const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;
let ticking = false;

function setTrackWidth() {
  if (!track) return;
  track.style.width = (numImages * window.innerWidth) + 'px';
  images.forEach(img => {
    img.style.width = window.innerWidth + 'px';
  });
}

function handleScroll() {
  if (!container || !track) return;
  const rect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  if (rect.top < windowHeight && rect.bottom > 0) {
    // Within slideshow area
    let scrollProgress = Math.min(Math.max((windowHeight - rect.top) / (container.offsetHeight + windowHeight), 0), 1);
    let maxTranslate = track.offsetWidth - window.innerWidth;
    let translateX = -maxTranslate * scrollProgress;
    track.style.transform = `translateX(${translateX}px)`;
    // Lock body scroll
    document.body.style.overflow = 'hidden';
  } else {
    // Not in slideshow area
    track.style.transform = 'translateX(0)';
    document.body.style.overflow = '';
  }
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener('resize', () => {
  setTrackWidth();
  handleScroll();
});

// Init
setTrackWidth();
handleScroll();
