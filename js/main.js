document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header")

  window.addEventListener("scroll", (e) => {
    if(window.scrollY > 0) {
      header.classList.add("scrollNav")
    } else {
      header.classList.remove("scrollNav")
    }
  })

  const galleryBtnsWrapper = document.querySelector(".gallery__btns-wrapper")
  const galleryBtnMore = document.querySelector(".gallery__btn-more")
  const galleryBtnHide = document.querySelector(".gallery__btn-hide")
  const galleryGrid = document.querySelectorAll(".gallery__grid")
  
  let count1 = 1
  if (count1 < galleryGrid.length) {
    galleryBtnMore.addEventListener('click', () => {
      galleryGrid[count1].style.display = "grid";
      count1++;
      if (galleryGrid.length === count1) {
        galleryBtnMore.style.display = "none"
        galleryBtnHide.style.display = "block"
      }
    });
  
    galleryBtnHide.addEventListener('click', () => {
      galleryGrid.forEach(item => {
        item.style.display = ""
      })
      galleryBtnMore.style.display = ""
      galleryBtnHide.style.display = ""
      count1 = 1
    })
  } else {
    galleryBtnsWrapper.style.display = "none"
  }
})

const swiper1 = new Swiper('.banner__swiper', {
  effect: 'fade',
  slidesPerView: 1,
  loop: true,
  simulateTouch: false,
  autoplay: {
    delay: 4000,
  },
  speed: 1000,
  pagination: {
    el: ".banner__swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}"></span>`;
    },
  },
});

// const swiper2 = new Swiper('.testimonial__swiper', {
//   slidesPerView: 1.7,
//   spaceBetween: 11,
//   simulateTouch: false,
//   autoplay: {
//     delay: 5000,
//   },
//   pagination: {
//     el: ".testimonial__swiper-pagination",
//     clickable: true,
//     renderBullet: function (index, className) {
//       return `<span class="${className}"></span>`;
//     },
//   },
//   navigation: {
//     nextEl: ".testimonial__swiper-button-next",
//     prevEl: ".testimonial__swiper-button-prev",
//   },
//   breakpoints: {
//     1100: {
//       slidesPerView: 5,
//       spaceBetween: 24,
//     },
//     900: {
//       slidesPerView: 4,
//     },
//     600: {
//       slidesPerView: 3,
//       spaceBetween: 15,
//     },
//   },
// });

const overflowToggle = (arg) => {
  if (arg) {
    document.documentElement.style.overflow = "hidden auto"
    document.body.style.overflow = "hidden auto"
  } else {
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
  }
}

const popUpOpen = (window, wrapper, overlay, delay) => {
  overflowToggle(false)
  window.style.display = "block"

  setTimeout(() => {
    overlay.style.opacity = ".5"
    wrapper.style.opacity = "1"
    wrapper.style.top = "50%"
  },0)

  if (delay) {
    setTimeout(() => {
      popUpClose(window, wrapper, overlay)
    }, delay)
  }
}

const popUpClose = (window, wrapper, overlay) => {
  setTimeout(() => {
    window.style.display = ""
  }, 300)
  overlay.style.opacity = ""
  wrapper.style.opacity = ""
  wrapper.style.top = ""

  overflowToggle(true)
}

const setPopUpVisibility = (visibility, window, wrapper, overlay, delay) => {
  if (visibility) {
    popUpOpen(window, wrapper, overlay, delay)
  } else {
    popUpClose(window, wrapper, overlay)
  }
}

const popupView = document.querySelector(".popup-view")
const popupViewImg = document.querySelector(".popup-view__img")
const overlayView = document.querySelector(".popup-view__overlay")

document.querySelectorAll(".gallery__grid-item").forEach(item => {
  item.addEventListener("click", () => {
    const imgSrs = item.firstElementChild.src
    const img = document.querySelector(".popup-view__img")
    img.src = imgSrs.replace(".jpg", "-large.jpg")
    setPopUpVisibility(true, popupView, popupViewImg, overlayView)
  })
})

const burger = document.querySelector(".burger")
const burgerMenu = document.querySelector(".burger-menu")

const burgerMenuClose = () => {
  burgerMenu.style.left = ""

  setTimeout(() => {
    burger.style.display = ""
  }, 500);
  
  overflowToggle(true)
}

const burgerMenuOpen = () => {
  burger.style.display = "block"

  setTimeout(() => {
    burgerMenu.style.left = "0"
  }, 0);

  overflowToggle(false)
}

window.addEventListener('resize',(e) => {
  const width = document.body.clientWidth;
  if (width > 1300) {
    burgerMenuClose()
  }
});

document.querySelector(".header__burger-btn").addEventListener("click", burgerMenuOpen)
// document.querySelector(".header__burger-close-btn").addEventListener("click", burgerMenuClose)
document.querySelectorAll(".burger .header__nav-list-link").forEach(item => {
  item.addEventListener("click", burgerMenuClose)
})