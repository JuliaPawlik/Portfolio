document.addEventListener("DOMContentLoaded", () => {


  // ========================================
  // MENU
  // ========================================

  const linkOMnie = document.getElementById("link-o-mnie");
  const linkProjekty = document.getElementById("link-projekty");

  const sekcjaOMnie = document.getElementById("section-o-mnie");
  const sekcjaProjekty = document.getElementById("section-projekty");

  const menuLinks = document.querySelectorAll(".menu a");


  function ustawAktywny(link) {
    menuLinks.forEach(el => el.classList.remove("active"));

    if (link) {
      link.classList.add("active");
    }
  }


  if (
    linkOMnie &&
    linkProjekty &&
    sekcjaOMnie &&
    sekcjaProjekty
  ) {

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

  // ========================================
  // GENEROWANIE KART PROJEKTÓW
  // ========================================

  const projectsGrid = document.getElementById("projects-grid");


  if (
    projectsGrid &&
    typeof projekty !== "undefined"
  ) {

    Object.entries(projekty)
      .sort(([idA], [idB]) => Number(idB) - Number(idA))
      .forEach(([projectId, project]) => {


        // Karta projektu

        const card = document.createElement("a");

        card.className = "project-card";

        card.href = `projekt.html?id=${projectId}`;


        // Zdjęcie kafelka

        card.style.backgroundImage =
          `url("images/projekt${projectId}/prof_kafelek.jpg")`;


        // Overlay

        const overlay = document.createElement("div");

        overlay.className = "overlay";


        // Tytuł

        const title = document.createElement("h3");

        title.textContent = project.tytul;


        // Budowanie karty

        overlay.appendChild(title);

        card.appendChild(overlay);

        projectsGrid.appendChild(card);

      });

  }



  // ========================================
  // ŁADOWANIE DANYCH PROJEKTU
  // ========================================

  const hero = document.getElementById("hero");

  const projectTitle = document.getElementById("project-title");

  const projectDescription =
    document.getElementById("project-description");

  const projectGallery =
    document.getElementById("project-gallery");


  // Uruchamiamy tylko na stronie projektu

  if (
    hero &&
    projectTitle &&
    projectDescription &&
    projectGallery &&
    typeof projekty !== "undefined"
  ) {


    // Odczyt ID projektu z adresu

    const params = new URLSearchParams(window.location.search);

    const projectId = params.get("id");

    const project = projekty[projectId];


    // Sprawdzenie, czy projekt istnieje

    if (!project) {

      projectTitle.textContent = "Nie znaleziono projektu";

      projectDescription.textContent =
        "Sprawdź, czy adres strony jest poprawny.";

    } else {


      // ----------------------------
      // HERO
      // ----------------------------

      hero.style.setProperty(
        "--hero-image",
        `url("images/projekt${projectId}/prof.jpg")`
      );


      // ----------------------------
      // TYTUŁ
      // ----------------------------

      projectTitle.textContent = project.tytul;

      document.title = project.tytul;


      // ----------------------------
      // OPIS
      // ----------------------------

      projectDescription.textContent = project.opis;


      // ----------------------------
      // GALERIA
      // ----------------------------

      projectGallery.innerHTML = "";

      // Zwykłe obrazki (domyślne)
      if (project.obrazy) {
        project.obrazy.forEach(image => {
          const container = document.createElement("div");
          container.className = "image-with-caption";

          const img = document.createElement("img");
          img.src = `images/projekt${projectId}/${image.plik}`;
          img.alt = image.podpis;
          img.className = "clickable-img";
          img.loading = "lazy";

          const caption = document.createElement("div");
          caption.className = "caption";
          caption.textContent = image.podpis;

          container.appendChild(img);
          container.appendChild(caption);

          projectGallery.appendChild(container);
        });
      }

      // SLIDERY

      if (project.slidery) {
        project.slidery.forEach((slider, index) => {
          const section = document.createElement("section");

          section.innerHTML = `
            <h2>${slider.tytul}</h2>

            <div class="swiper slider-main slider-${index}">
              <div class="swiper-wrapper">
                ${slider.obrazy.map(image => `
                  <div class="swiper-slide">
                    <img
                      src="images/projekt${projectId}/${image.plik}"
                      alt="${image.podpis}"
                      class="clickable-img"
                    >
                  </div>
                `).join("")}
              </div>

              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>

            <div class="swiper slider-thumbs">
              <div class="swiper-wrapper">
                ${slider.obrazy.map(image => `
                  <div class="swiper-slide">
                    <img
                      src="images/projekt${projectId}/${image.plik}"
                      alt="${image.podpis}"
                    >
                  </div>
                `).join("")}
              </div>
            </div>
          `;

          projectGallery.appendChild(section);
        });
      }

    }

  }



  // ========================================
  // LIGHTBOX
  // ========================================

  const clickableImages =
    document.querySelectorAll(".clickable-img");


  if (clickableImages.length > 0) {


    // Szukamy istniejącego lightboxa

    let lightbox = document.getElementById("lightbox");


    // Jeśli go nie ma, tworzymy nowy

    if (!lightbox) {

      lightbox = document.createElement("div");

      lightbox.id = "lightbox";

      lightbox.classList.add("lightbox");

      lightbox.innerHTML = '<img src="" alt="">';

      document.body.appendChild(lightbox);

    }


    const lightboxImg = lightbox.querySelector("img");


    // Otwieranie obrazków

    clickableImages.forEach(img => {

      img.addEventListener("click", () => {

        lightboxImg.src = img.src;

        lightboxImg.alt = img.alt;

        lightbox.style.display = "flex";

      });

    });


    // Zamykanie po kliknięciu

    lightbox.addEventListener("click", () => {

      lightbox.style.display = "none";

      lightboxImg.src = "";

    });

  }



  // ========================================
  // SWIPER
  // ========================================

  const mainEls =
    document.querySelectorAll(".slider-main");

  const thumbsEls =
    document.querySelectorAll(".slider-thumbs");


  mainEls.forEach((mainEl, i) => {


    const thumbsEl = thumbsEls[i];

    if (!thumbsEl) return;


    // Nawigacja

    const nextEl =
      mainEl.querySelector(".swiper-button-next");

    const prevEl =
      mainEl.querySelector(".swiper-button-prev");


    // Miniaturki

    const thumbsSwiper = new Swiper(thumbsEl, {

      spaceBetween: 10,

      slidesPerView: 6,

      freeMode: true,

      watchSlidesProgress: true,

    });


    // Główny slider

    const mainSwiper = new Swiper(mainEl, {

      loop: true,

      spaceBetween: 10,

      navigation: {
        nextEl,
        prevEl
      },

      thumbs: {
        swiper: thumbsSwiper
      },

    });

  });


});