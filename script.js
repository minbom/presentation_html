
const slides = Array.from(document.querySelectorAll('.slide'));
let current = 0;
function scaleSlides(){
  const s = Math.min(window.innerWidth/1280, window.innerHeight/720);
  slides.forEach(sl => sl.style.transform = `scale(${s})`);
}
function showSlide(i){
  current = Math.max(0, Math.min(i, slides.length-1));
  slides.forEach((sl, idx) => sl.classList.toggle('active', idx===current));
  updateHud();
}
function currentSteps(){ return Array.from(slides[current].querySelectorAll('.step')); }
function next(){
  const steps = currentSteps();
  const hidden = steps.find(el => !el.classList.contains('visible'));
  if(hidden){ hidden.classList.add('visible'); updateHud(); return; }
  if(current < slides.length-1) showSlide(current+1);
}
function prev(){
  const steps = currentSteps();
  const visible = [...steps].reverse().find(el => el.classList.contains('visible'));
  if(visible){ visible.classList.remove('visible'); updateHud(); return; }
  if(current > 0) showSlide(current-1);
}
function updateHud(){
  const steps = currentSteps();
  const visible = steps.filter(el => el.classList.contains('visible')).length;
  document.getElementById('hud').textContent = `${current+1}/${slides.length}` + (steps.length ? ` · image ${visible}/${steps.length}` : '');
}
document.addEventListener('click', e => {
  if(e.target.isContentEditable) return;
  next();
});
document.addEventListener('keydown', e => {
  if(e.target.isContentEditable) return;
  if(['ArrowRight','PageDown','Space','Enter'].includes(e.code) || e.key === ' ') { e.preventDefault(); next(); }
  if(['ArrowLeft','PageUp','Backspace'].includes(e.code)) { e.preventDefault(); prev(); }
  if(e.key.toLowerCase()==='r') { currentSteps().forEach(el => el.classList.remove('visible')); updateHud(); }
});
window.addEventListener('resize', scaleSlides);
scaleSlides(); showSlide(0);
