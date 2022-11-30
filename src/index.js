const menu = document.querySelector(".menu");
const focusWindow = document.querySelector(".focus-window");
const menuButton = document.querySelector(".menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");

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

menuButton.addEventListener("click", () => {
  swapMenuOpenClosed();
  swapFocusUnfocused();
});

closeMenuButton.addEventListener("click", () => {
  swapMenuOpenClosed();
  swapFocusUnfocused();
});

focusWindow.addEventListener("click", () => {
  swapMenuOpenClosed();
  swapFocusUnfocused();
});
