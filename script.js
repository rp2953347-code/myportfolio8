// Basic interactions: typed hero, nav toggle, smooth scroll, theme toggle, form fallback and year
document.addEventListener('DOMContentLoaded', () => {
  // Typed effect (simple)
  const phrases = ["Web Developer", "BCA Student", "Frontend Enthusiast", "Open to Internships"];
  const typedEl = document.getElementById('typed');
  let pIndex = 0, charIndex = 0, forward = true;

  function type() {
    const current = phrases[pIndex];
    if (forward) {
      charIndex++;
      if (charIndex > current.length) { forward = false; setTimeout(type, 900); return; }
    } else {
      charIndex--;
      if (charIndex < 0) { forward = true; pIndex = (pIndex+1)%phrases.length; setTimeout(type, 300); return; }
    }
    typedEl.textContent = current.slice(0, charIndex);
    setTimeout(type, forward ? 80 : 40);
  }
  type();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      // close mobile nav if open
      if(window.innerWidth < 680) toggleNav(false);
    });
  });

  // Nav toggle mobile
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle && navToggle.addEventListener('click', ()=> toggleNav());
  function toggleNav(force){
    if(force === false) navLinks.style.display = 'none';
    else navLinks.style.display = (navLinks.style.display === 'flex' ? 'none' : 'flex');
    navLinks.style.flexDirection = 'column';
    navLinks.style.background = 'transparent';
    navLinks.style.padding = '10px';
  }

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  function setTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    themeBtn.innerHTML = t === 'light' ? '<i class="fa fa-moon"></i>' : '<i class="fa fa-sun"></i>';
  }
  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light': 'dark');
  setTheme(saved);
  themeBtn && themeBtn.addEventListener('click', ()=> setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));

  // Set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form fallback: if user didn't configure Formspree, use mailto
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      const action = form.getAttribute('action');
      // naive check: if action still has 'formspree.io/f/yourformid' or empty, fallback to mailto
      if(!action || action.includes('yourformid')){
        e.preventDefault();
        const name = encodeURIComponent(form.name.value.trim());
        const email = encodeURIComponent(form._replyto.value.trim());
        const msg = encodeURIComponent(form.message.value.trim());
        const subject = encodeURIComponent(Portfolio message from ${name});
        const body = encodeURIComponent(Name: ${name}\nEmail: ${email}\n\n${decodeURIComponent(msg)});
        const mailto = mailto:anil20102005@gmail.com?subject=${subject}&body=${body};
        window.location.href = mailto;
      }
      // else allow default submit to Formspree
    });
  }
});