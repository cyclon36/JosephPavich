const totalFrames = 6;
const frameImage = document.getElementById("frameImage");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / docHeight;

  const frameIndex = Math.min(
    totalFrames - 1,
    Math.floor(scrollFraction * totalFrames)
  );

  frameImage.src = `frame${frameIndex + 1}.png`;
});
