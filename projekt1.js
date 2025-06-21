document.addEventListener("DOMContentLoaded", () => {
  const przyciski = document.querySelectorAll(".project-card[data-target]");
  const sekcje = document.querySelectorAll(".main-section[data-target]");

  function pokazSekcje(target) {
    sekcje.forEach(sekcja => {
      if (sekcja.getAttribute("data-target") === target) {
        sekcja.style.display = "block";
      } else {
        sekcja.style.display = "none";
      }
    });

    przyciski.forEach(przycisk => {
      if (przycisk.getAttribute("data-target") === target) {
        przycisk.classList.add("active");
      } else {
        przycisk.classList.remove("active");
      }
    });
  }

  przyciski.forEach(przycisk => {
    przycisk.addEventListener("click", (e) => {
      e.preventDefault();
      const target = przycisk.getAttribute("data-target");
      pokazSekcje(target);
    });
  });

  // Domyślnie pokaż pierwszą sekcję
  if (przyciski.length > 0) {
    pokazSekcje(przyciski[0].getAttribute("data-target"));
  }
});