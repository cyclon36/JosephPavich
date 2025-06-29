const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;
let ticking = false;

// Resize track and images to fit viewport
function setTrackWidth() {
  if (!track) return;
  track.style.width = (numImages * window.innerWidth) + 'px';
  images.forEach(img => {
    img.style.width = window.innerWidth + 'px';
    img.style.height = window.innerHeight + 'px';
  });
}

// Horizontal scroll effect mapped to vertical scroll
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

// Initial setup
setTrackWidth();
handleScroll();
