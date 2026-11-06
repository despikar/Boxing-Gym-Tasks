

// Keep the page links in one place so the same menu works everywhere.
const pages = [
  ["index.html", "Home"],
  ["tasks.html", "Tasks"],
  ["about.html", "About"],
  ["contact.html", "Contact"]
];

// Build the shared menu and mark the current page as active.
function buildHeader() {
  const current = location.pathname.split("/").pop() || "index.html";
  let links = "";
  for (const [file, name] of pages) {
    const active = file === current ? "active" : "";
    links += `<li class="nav-item"><a class="nav-link ${active}" href="${file}">${name}</a></li>`;
  }

  document.getElementById("site-header").innerHTML = `
    <nav class="navbar navbar-expand-md bg-body-tertiary border-bottom" aria-label="Main navigation">
      <div class="container">
        <a class="navbar-brand" href="index.html">🥊 Iron Fist Boxing Gym</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#menu" aria-controls="menu" aria-expanded="false"
                aria-label="Toggle navigation menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menu">
          <ul class="navbar-nav ms-auto align-items-md-center">
            ${links}
            <li class="nav-item">
              <button id="themeBtn" class="btn btn-outline-secondary btn-sm ms-md-3" type="button">Dark mode</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
}

// Add the same footer to each page that loads this file.
function buildFooter() {
  document.getElementById("site-footer").innerHTML = `
    <div class="container text-center py-4">
      <p class="fs-5 mb-1">🥊 Iron Fist Boxing Gym</p>
      <p class="mb-1">Email: <a href="mailto:info@ironfistgym.example">info@ironfistgym.example</a></p>
      <p class="mb-1">
        <a href="https://instagram.com" aria-label="Instagram">Instagram</a> |
        <a href="https://facebook.com" aria-label="Facebook">Facebook</a>
      </p>
      <p class="mb-0 text-body-secondary">&copy; 2026 Iron Fist Boxing Gym</p>
    </div>`;
}

// Dark mode: Bootstrap changes colours when <html> has data-bs-theme="dark"
// Save the selected theme so it sticks when the page is reopened.
function setTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
  document.getElementById("themeBtn").textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

buildHeader();
buildFooter();
setTheme(localStorage.getItem("theme") || "light");

document.getElementById("themeBtn").addEventListener("click", function () {
  const now = document.documentElement.getAttribute("data-bs-theme");
  setTheme(now === "dark" ? "light" : "dark");
});
