"use strict";var changeMenu=function(){var e=document.querySelector(".change-menu"),t=document.querySelector(".mf-menu"),n=document.querySelector(".menu"),o=document.querySelector(".menu-addition-footer");e.addEventListener("click",function(){n.classList.toggle("menu-active")}),t.addEventListener("click",function(){o.classList.toggle("menu-active")})},slider=function(){tns({container:".slider-1",items:1,edgePadding:50,gutter:10,controls:!1,nav:!1,mouseDrag:!0,controlsText:["",""]})},lightSlider=function(){var e=function(){$(".owl-carousel").owlCarousel({loop:!0,items:1,nav:!1,dots:!0,responsiveClass:!0})};e();var t=document.querySelectorAll(".list-light .card"),n=document.querySelector(".owl-carousel"),o={warmLight:["warmLight-1.png","warmLight-2.jpg","warmLight-3.jpg"],dayLight:["dayLight-1.jpg","dayLight-2.jpg"],coldLight:["coldLight-1.png","coldLight-2.jpg","coldLight-3.jpg","coldLight-4.jpg"]};t.forEach(function(i){i.addEventListener("click",function(){$(".owl-carousel").trigger("destroy.owl.carousel"),t.forEach(function(e){e.classList.remove("active")}),this.classList.toggle("active");var i=this.getAttribute("data-color");n.innerHTML="";o[i].map(function(e){n.innerHTML+=c(e)});e()})});var c=function(e){return'<div>\n                  <img src="images/'.concat(e,'" alt="">\n                </div>')}},info=function(){var e=document.querySelector(".info span"),t=document.querySelector(".info-text"),n=t.querySelector(".back"),o=document.querySelector(".header"),c=o.querySelector(".row"),i=o.querySelector(".info-mobile"),s=o.querySelector(".close");e.addEventListener("click",function(){t.style.display="block",document.body.offsetWidth<=768&&(c.classList.toggle("d-none"),i.classList.toggle("d-none"),o.classList.add("pt-0","pb-0"))}),n.addEventListener("click",function(){t.style.display="none",document.body.offsetWidth<=768&&(i.classList.toggle("d-none"),c.classList.toggle("d-none"),o.classList.remove("pt-0","pb-0"))}),s.addEventListener("click",function(){t.style.display="none",i.classList.toggle("d-none"),c.classList.toggle("d-none"),o.classList.remove("pt-0","pb-0")})};document.addEventListener("DOMContentLoaded",function(){info(),slider(),changeMenu(),lightSlider()});
//# sourceMappingURL=script.js.map
