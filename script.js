const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;

function setDimensions() {
  if (!track || !container) return;
  const vw = window.innerWidth;
  const vh = window.innerHeight * 0.5;
  track.style.width = (numImages * vw) + 'px';
  track.style.height = vh + 'px';
  images.forEach(img => {
    img.style.width = vw + 'px';
    img.style.height = vh + 'px';
  });
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
    const maxTranslate = track.offsetWidth - window.innerWidth;
    const translateX = -maxTranslate * progress;
    track.style.transform = `translateX(${translateX}px)`;
    document.body.style.overflow = 'hidden';
  } else {
    track.style.transform = scrollY < start ? 'translateX(0)' : `translateX(-${track.offsetWidth - window.innerWidth}px)`;
    document.body.style.overflow = '';
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
  setDimensions();
  handleScroll();
});

setDimensions();
handleScroll();
