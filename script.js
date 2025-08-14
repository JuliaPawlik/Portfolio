document.addEventListener("DOMContentLoaded", () => {

  // --- Obsługa menu ---
  const linkOMnie = document.getElementById("link-o-mnie");
  const linkProjekty = document.getElementById("link-projekty");
  const sekcjaOMnie = document.getElementById("section-o-mnie");
  const sekcjaProjekty = document.getElementById("section-projekty");
  const menuLinks = document.querySelectorAll(".menu a");

  function ustawAktywny(link) {
    menuLinks.forEach(el => el.classList.remove("active"));
    link.classList.add("active");
  }

  if (linkOMnie && linkProjekty && sekcjaOMnie && sekcjaProjekty) {
    linkOMnie.addEventListener("click", function (e) {
      e.preventDefault();
      ustawAktywny(this);
      sekcjaOMnie.style.display = "block";
      sekcjaProjekty.style.display = "none";
    });

    linkProjekty.addEventListener("click", function (e) {
      e.preventDefault();
      ustawAktywny(this);
      sekcjaOMnie.style.display = "none";
      sekcjaProjekty.style.display = "block";
    });

    if (window.location.hash === "#projekty") {
      sekcjaOMnie.style.display = "none";
      sekcjaProjekty.style.display = "block";
      ustawAktywny(linkProjekty);
    }
  }

  // --- Lightbox ---
  const clickableImages = document.querySelectorAll('.clickable-img');
  if (clickableImages.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = '<img src="" alt="">';
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');

    clickableImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

});
