document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // simple typing effect
  const words = ["Web Developer", "BCA Student", "Frontend Learner"];
  let i = 0, j = 0, forward = true;
  const typed = document.getElementById("typed");

  function type() {
    const word = words[i];
    typed.textContent = word.slice(0, j);

    if (forward) {
      j++;
      if (j > word.length) { forward = false; setTimeout(type, 800); return; }
    } else {
      j--;
      if (j == 0) { forward = true; i = (i + 1) % words.length; }
    }
    setTimeout(type, forward ? 90 : 40);
  }
  type();

  // contact form fallback
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = form.name.value;
    let email = form._replyto.value;
    let msg = form.message.value;

    window.location.href =
      mailto:rp2953347@gmail.com?subject=Message from ${name}&body=${msg}%0AEmail: ${email};
  });
});