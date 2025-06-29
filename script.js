const scrollTrack = document.getElementById("scroll-track");
const scrollContainer = document.getElementById("scroll-container");
const totalImages = 6;

window.addEventListener("scroll", () => {
  const containerTop = scrollContainer.offsetTop;
  const containerHeight = scrollContainer.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY >= containerTop && scrollY <= containerTop + containerHeight) {
    const progress = (scrollY - containerTop) / containerHeight;
    const translateX = -progress * (100 * (totalImages - 1));
    scrollTrack.style.transform = `translateX(${translateX}vw)`;
  }
});
