import "./vendors/cookie";
const timeEnd = "Nov 30, 2021 00:00:00";
var isChrome =
  navigator.userAgent.indexOf("Chrome") != -1 &&
  navigator.vendor.indexOf("Google Inc") != -1;

$(document).ready(function () {
  clickMenu();
  slider();
  countDown();
  // hideNav();
  if (!isChrome) {
    scrollLink();
  }
  $(".lazy").lazy();
});

function scrollLink() {
  $(".nv ul li a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    } // End if
  });
}
function hideNav() {
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-200px";
    }
    prevScrollpos = currentScrollPos;
  };
}

function countDown() {
  var countDownDate = new Date(timeEnd).getTime();
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("dd").innerHTML = days;
    document.getElementById("hh").innerHTML = ("0" + hours).slice(-2);
    document.getElementById("mm").innerHTML = ("0" + minutes).slice(-2);
    document.getElementById("ss").innerHTML = ("0" + seconds).slice(-2);

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("dd").innerHTML = 0;
      document.getElementById("hh").innerHTML = ("0" + 0).slice(-2);
      document.getElementById("mm").innerHTML = ("0" + 0).slice(-2);
      document.getElementById("ss").innerHTML = ("0" + 0).slice(-2);
    } else {
      document.getElementById("releases").innerHTML =
        "Releases " + moment(timeEnd).format("MMMM DD, YYYY");
    }
  }, 1000);
}
function slider() {
  new Swiper(".swiper-container", {
    autoplay: {
      delay: 2000,
    },
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount:4
    },
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1100: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1280: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1360: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}
function clickMenu() {
  $(".hamburger, .ic-close").click(function () {
    $(".menu-mobile").toggleClass("open");
  });
}
