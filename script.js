const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;
let ticking = false;

// Ensure the track and images are sized to window width
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

  // Calculate if the slideshow is in view
  const inSlideshow =
    rect.top < windowHeight &&
    rect.bottom > 0 &&
    window.scrollY + windowHeight > container.offsetTop &&
    window.scrollY < container.offsetTop + container.offsetHeight;

  if (inSlideshow) {
    // Progress across the slideshow section
    let scrollProgress = Math.min(Math.max((windowHeight - rect.top) / (container.offsetHeight + windowHeight), 0), 1);
    let maxTranslate = track.offsetWidth - window.innerWidth;
    let translateX = -maxTranslate * scrollProgress;
    track.style.transform = `translateX(${translateX}px)`;

    // Only lock scroll if not at the very top or bottom of the section
    if (scrollProgress > 0 && scrollProgress < 1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  } else {
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
