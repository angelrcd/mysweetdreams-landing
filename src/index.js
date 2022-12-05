const menu = document.querySelector(".menu");
const focusWindow = document.querySelector(".focus-window");
const menuButton = document.querySelector(".menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbar = document.querySelector(".navbar");

function swapMenuOpenClosed() {
  if (menu.classList.contains("menu-open")) {
    menu.classList.remove("menu-open");
    menu.classList.add("menu-closed");
  } else {
    menu.classList.remove("menu-closed");
    menu.classList.add("menu-open");
  }
}

function swapFocusUnfocused() {
  if (focusWindow.classList.contains("web-in-focus")) {
    focusWindow.classList.remove("web-in-focus");
    focusWindow.classList.add("web-out-of-focus");
  } else {
    focusWindow.classList.remove("web-out-of-focus");
    focusWindow.classList.add("web-in-focus");
  }
}

function setNavVisible() {
  navbar.classList.remove("nav-not-visible");
  navbar.classList.add("nav-visible");
}

function setNavNotVisible() {
  navbar.classList.remove("nav-visible");
  navbar.classList.add("nav-not-visible");
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, "passive", {
    get: function() { supportsPassive = true; }
  }));
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

menuButton.addEventListener("click", () => {
  swapMenuOpenClosed();
  swapFocusUnfocused();
  disableScroll();
});

closeMenuButton.addEventListener("click", () => {
  swapMenuOpenClosed();
  swapFocusUnfocused();
  enableScroll();
});

focusWindow.addEventListener("click", () => {
  swapMenuOpenClosed();
  swapFocusUnfocused();
  enableScroll();
});

let lastScrollTop = 0;
window.addEventListener("scroll", function() { // or window.addEventListener("scroll"....
  const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  if (st > lastScrollTop) {
    setNavNotVisible();
  } else {
    setNavVisible();
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
