const container = document.getElementById('scroll-container');
const track = document.getElementById('scroll-track');
const images = track ? track.querySelectorAll('img') : [];
const numImages = images.length;
let ticking = false;

// Show a warning if images are missing
if (numImages === 0) {
  container.innerHTML = '<div style="color:white;background:#c00;padding:2em;text-align:center;font-size:2em;">No images found!<br>Check Frame1.png–Frame6.png are in the right place.</div>';
}

// Always set a minimum height so the section never collapses
function setTrackWidth() {
  if (!track) return;
  track.style.width = (numImages * window.innerWidth) + 'px';
  images.forEach(img => {
    img.style.width = window.innerWidth + 'px';
    img.onerror = () => {
      img.style.background = '#c00';
      img.style.color = 'white';
      img.alt = 'Image missing';
      img.src = '';
      img.parentElement.innerHTML += `<div style="position:absolute;left:0;top:40%;width:100vw;text-align:center;color:white;font-size:2em;">Image missing</div>`;
    };
  });
}

function handleScroll() {
  if (!container || !track || numImages === 0) {
    document.body.style.overflow = '';
    return;
  }
  const rect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const inSlideshow = rect.top < windowHeight && rect.bottom > 0;
  if (inSlideshow) {
    // Progress across the slideshow section
    let scrollProgress = Math.min(Math.max((windowHeight - rect.top) / (container.offsetHeight + windowHeight), 0), 1);
    let maxTranslate = track.offsetWidth - window.innerWidth;
    let translateX = -maxTranslate * scrollProgress;
    track.style.transform = `translateX(${translateX}px)`;
    // Only lock scroll if actually in the middle of the slideshow
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
