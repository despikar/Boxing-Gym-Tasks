const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  contactForm.classList.add("was-validated");
  if (!contactForm.checkValidity()) return;

  const body = document.getElementById("modalBody");
  body.textContent = "";
  const lines = [
    "Name: " + document.getElementById("name").value,
    "Email: " + document.getElementById("email").value,
    "Subject: " + document.getElementById("subject").value,
    "Message: " + document.getElementById("message").value
  ];
  for (const line of lines) {
    const p = document.createElement("p");
    p.textContent = line;
    body.appendChild(p);
  }

  new bootstrap.Modal(document.getElementById("confirmModal")).show();
  contactForm.reset();
  contactForm.classList.remove("was-validated");
});