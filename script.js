const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;

// Set the width of the track and images on load and resize
function setTrackWidth() {
  if (!track) return;
  track.style.width = (numImages * window.innerWidth) + 'px';
  images.forEach(img => {
    img.style.width = window.innerWidth + 'px';
    img.style.height = window.innerHeight + 'px';
  });
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
  setTrackWidth();
  handleScroll();
});

// Initial setup
setTrackWidth();
handleScroll();
