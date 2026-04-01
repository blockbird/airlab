document.querySelectorAll(".mobile-navbar.w-nav").forEach((nav, index) => {
  const button = nav.querySelector(".w-nav-button");
  const menu = nav.querySelector(".w-nav-menu");

  if (!button || !menu) {
    return;
  }

  const menuId = menu.id || `site-nav-menu-${index + 1}`;

  menu.id = menuId;
  button.setAttribute("role", "button");
  button.setAttribute("tabindex", "0");
  button.setAttribute("aria-controls", menuId);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Toggle navigation");

  const closeMenu = () => {
    button.classList.remove("w--open");
    button.setAttribute("aria-expanded", "false");
    menu.removeAttribute("data-nav-menu-open");
  };

  const toggleMenu = () => {
    if (button.classList.contains("w--open")) {
      closeMenu();
      return;
    }

    button.classList.add("w--open");
    button.setAttribute("aria-expanded", "true");
    menu.setAttribute("data-nav-menu-open", "");
  };

  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleMenu();
  });

  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }

    if (event.key === "Escape") {
      closeMenu();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });
});
