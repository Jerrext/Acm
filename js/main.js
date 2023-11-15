const overflowToggle = (arg) => {
  if (arg) {
    document.documentElement.style.overflow = "hidden auto"
    document.body.style.overflow = "hidden auto"
  } else {
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
  }
}

const popUpOpen = (window, wrapper, overlay, closeBtn, delay) => {
  overflowToggle(false)
  window.style.display = "block"

  setTimeout(() => {
    overlay.style.opacity = ".8"
    wrapper.style.opacity = "1"
    wrapper.style.top = "50%"
    closeBtn.style.opacity = "0.5"
  },0)

  if (delay) {
    setTimeout(() => {
      popUpClose(window, wrapper, overlay)
    }, delay)
  }
}

const popUpClose = (window, wrapper, overlay, closeBtn) => {  
  setTimeout(() => {
    window.style.display = ""
  }, 300)
  closeBtn.style.opacity = ""
  overlay.style.opacity = ""
  wrapper.style.opacity = ""
  wrapper.style.top = ""

  overflowToggle(true)
}

const setPopUpVisibility = (visibility, window, wrapper, overlay, closeBtn, delay) => {
  if (visibility) {
    popUpOpen(window, wrapper, overlay, closeBtn, delay)
  } else {
    popUpClose(window, wrapper, overlay, closeBtn)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Header

  const header = document.querySelector(".header")

  window.addEventListener("scroll", (e) => {
    if(window.scrollY > 0) {
      header.classList.add("scrollNav")
    } else {
      header.classList.remove("scrollNav")
    }
  })

  // Gallery

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

  // Map

  const map = document.querySelector(".contacts__map iframe")
  map.style.width = "100%"
  map.style.height = "100%"

  // Services

  document.querySelectorAll(".services__item").forEach((item,index) => item.dataset.number = index + 1)

  // Popup View

  const popupView = document.querySelector(".popup-view")
  const popupViewIWindow = document.querySelector(".popup-view__window")
  const overlayView = document.querySelector(".popup-view__overlay")
  const closeBtnView = document.querySelector(".popup-view__close")
  const prevBtnView = document.querySelector(".popup-view__prev")
  const nextBtnView = document.querySelector(".popup-view__next")

  const img = document.querySelector(".popup-view__img")
  const imgTitle = document.querySelector(".popup-view__title")
  const imgDescription = document.querySelector(".popup-view__description")
  const parentTextContainer = imgTitle.parentElement
  const parentImgContainer = img.parentElement
  
  const galleryItems = [...document.querySelectorAll(".gallery__grid-item")]

  const galleryList = galleryItems.map((item, index)=> {
    return {
      id: index,
      img: item.firstElementChild.src,
      title: item.firstElementChild.nextElementSibling.textContent,
      description: item.lastElementChild.innerHTML,
    }
  })

  window.addEventListener('popstate', function(e) {
    setPopUpVisibility(false, popupView, popupViewIWindow, overlayView, closeBtnView)
    burgerMenuClose()
  }, false);

  let currentViewIndex

  const openViewWindow = (id) => {
    if (id === 0) {
      prevBtnView.style.display = "none"
    } else if (id < 0) {
      return
    } else if (id === galleryList.length - 1) {
      nextBtnView.style.display = "none"
    } else if (id > galleryList.length - 1) {
      return
    } else {
      prevBtnView.style.display = "flex"
      nextBtnView.style.display = "flex"
    }

    currentViewIndex = id

    const currentItem = galleryList.find(work => work.id === id)

    if (!currentItem.title && !currentItem.description) {
      popupViewIWindow.style.width = "unset"
      parentTextContainer.style.display = "none"
      if (document.body.clientWidth < 600) parentImgContainer.style.maxHeight = ""
    } else {
      parentTextContainer.style.display = "block"
      if (document.body.clientWidth < 600) parentImgContainer.style.maxHeight = "400px"
      parentTextContainer.style.padding = "50px 20px"
      popupViewIWindow.style.width = "100%"
    }

    img.src = currentItem.img
    imgTitle.textContent = currentItem.title
    imgDescription.innerHTML = currentItem.description
  }

  const closeViewWindow = () => {
    window.history.back();
    setPopUpVisibility(false, popupView, popupViewIWindow, overlayView, closeBtnView)
  }

  prevBtnView.addEventListener("click", () => openViewWindow(currentViewIndex - 1))
  nextBtnView.addEventListener("click", () => openViewWindow(currentViewIndex + 1))

  galleryItems.forEach((item, index) => {
    item.dataset.index = index

    item.addEventListener("click", () => {
      openViewWindow(+item.dataset.index)
      window.history.pushState({popup: 1}, "popup","#popup")
      setPopUpVisibility(true, popupView, popupViewIWindow, overlayView, closeBtnView)
    })
  })

  closeBtnView.addEventListener("click", closeViewWindow)
  overlayView.addEventListener("click", closeViewWindow)

  // Burger

  const burger = document.querySelector(".burger")

  const burgerMenuClose = () => {
    burger.style.left = ""

    setTimeout(() => {
      burger.style.display = ""
    }, 500);
    
    overflowToggle(true)
  }

  const burgerMenuOpen = () => {
    window.history.pushState({menu: 1}, "menu","#menu")

    burger.style.display = "block"

    setTimeout(() => {
      burger.style.left = "0"
    }, 0);

    overflowToggle(false)
  }

  window.addEventListener('resize',(e) => {
    const width = document.body.clientWidth;
    if (width > 800) {
      burgerMenuClose()
    }
  });

  document.querySelector(".header__burger-btn").addEventListener("click", burgerMenuOpen)
  document.querySelector(".header__burger-close-btn").addEventListener("click", () => {
    burgerMenuClose()
    window.history.back()
  })
  document.querySelectorAll(".burger__nav-link").forEach(item => {
    item.addEventListener("click", burgerMenuClose)
  })
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



