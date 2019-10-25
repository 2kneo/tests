/*mobil menu*/
const changeMenu = () => {
  const btnChangeMenu = document.querySelector(".change-menu");
  const btnFooterMenu = document.querySelector(".mf-menu");
  const wrapperMenu = document.querySelector(".menu");
  const wrapperFooter = document.querySelector(".menu-addition-footer");

  btnChangeMenu.addEventListener("click", function() {
    wrapperMenu.classList.toggle("menu-active");
  });

  btnFooterMenu.addEventListener("click", function() {
    wrapperFooter.classList.toggle("menu-active");
  });
};
/*--*/

const slider = () => {
  const slider_1 = tns({
    container: ".slider-1",
    items: 1,
    edgePadding: 50,
    gutter: 10,
    controls: false,
    nav: false,
    mouseDrag: true,
    controlsText: ["", ""]
  });
};

/*light-slide*/
const lightSlider = () => {
  const owl = () => {
    $(".owl-carousel").owlCarousel({
      loop: true,
      items: 1,
      nav: false,
      dots: true,
      responsiveClass: true
    });
  };
  owl();

  const lightItem = document.querySelectorAll(".list-light .card");
  const sliderWrapper = document.querySelector(".owl-carousel");

  const state = {
    warmLight: ["warmLight-1.png", "warmLight-2.jpg", "warmLight-3.jpg"],
    dayLight: ["dayLight-1.jpg", "dayLight-2.jpg"],
    coldLight: [
      "coldLight-1.png",
      "coldLight-2.jpg",
      "coldLight-3.jpg",
      "coldLight-4.jpg"
    ]
  };

  lightItem.forEach(item => {
    item.addEventListener("click", function() {
      $(".owl-carousel").trigger("destroy.owl.carousel");
      lightItem.forEach(item => {
        item.classList.remove("active");
      });
      this.classList.toggle("active");
      const dataColor = this.getAttribute("data-color");
      sliderWrapper.innerHTML = "";
      const itemSlider = state[dataColor].map(item => {
        sliderWrapper.innerHTML += elInitialization(item);
      });
      owl();
    });
  });

  const elInitialization = value => {
    return `<div>
                  <img src="images/${value}" alt="">
                </div>`;
  };
};
/**/

/*info*/
const info = () => {
  const info = document.querySelector(".info span");
  const infoText = document.querySelector(".info-text");
  const back = infoText.querySelector(".back");
  const header = document.querySelector(".header");
  const headerWrapperRow = header.querySelector(".row");
  const headerInfoWrapper = header.querySelector(".info-mobile");
  const headerInfoClose = header.querySelector(".close");

  info.addEventListener("click", function() {
    infoText.style.display = "block";
    if (document.body.offsetWidth <= 768) {
      headerWrapperRow.classList.toggle("d-none");
      headerInfoWrapper.classList.toggle("d-none");
      header.classList.add("pt-0", "pb-0");
    }
  });

  back.addEventListener("click", function() {
    infoText.style.display = "none";
    if (document.body.offsetWidth <= 768) {
      headerInfoWrapper.classList.toggle("d-none");
      headerWrapperRow.classList.toggle("d-none");
      header.classList.remove("pt-0", "pb-0");
    }
  });

  headerInfoClose.addEventListener("click", function() {
    infoText.style.display = "none";
    headerInfoWrapper.classList.toggle("d-none");
    headerWrapperRow.classList.toggle("d-none");
    header.classList.remove("pt-0", "pb-0");
  });
};

document.addEventListener("DOMContentLoaded", function() {
  info();
  slider();
  changeMenu();
  lightSlider();
});
