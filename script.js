const linkOMnie = document.getElementById("link-o-mnie");
const linkProjekty = document.getElementById("link-projekty");

const sekcjaOMnie = document.getElementById("section-o-mnie");
const sekcjaProjekty = document.getElementById("section-projekty");

const menuLinks = document.querySelectorAll(".menu a");

function ustawAktywny(link) {
  menuLinks.forEach(el => el.classList.remove("active"));
  link.classList.add("active");
}

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

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#projekty") {
    sekcjaOMnie.style.display = "none";
    sekcjaProjekty.style.display = "block";
    ustawAktywny(linkProjekty);
  }
});