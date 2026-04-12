import { addContact } from "../../crud/add_contact.js";
import { toast } from "../toast.js";
import { AVATARS } from "../avatars.js";

// ── Render avatars from the map ───────────────────────────────────────────────
const avatarContainer = document.getElementById("avatarOptions");
Object.entries(AVATARS).forEach(([name, url]) => {
  const img = document.createElement("img");
  img.src = url;
  img.alt = name;
  img.title = name;
  img.className = "avatar-pick";
  img.dataset.name = name;
  avatarContainer.appendChild(img);
});

// ── Modal helpers ─────────────────────────────────────────────────────────────
const overlay = document.getElementById("modalOverlay");

function openModal() {
  overlay.classList.add("open");
}

function closeModal() {
  overlay.classList.remove("open");
  resetForm();
}

function resetForm() {
  document.getElementById("formvalidation").reset();
  selectedPhoto = "";
  document.querySelectorAll(".avatar-pick").forEach(i => i.classList.remove("active"));
}

document.getElementById("addButton").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("resetButton").addEventListener("click", resetForm);
overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });

// ── Avatar selection ──────────────────────────────────────────────────────────
let selectedPhoto = "";
avatarContainer.addEventListener("click", (e) => {
  const img = e.target.closest(".avatar-pick");
  if (!img) return;

  document.querySelectorAll(".avatar-pick").forEach(i => i.classList.remove("active"));
  img.classList.add("active");
  selectedPhoto = img.src;
  // Show the character name instead of the raw URL
  document.getElementById("link").value = img.dataset.name;
});

// ── Form submit ───────────────────────────────────────────────────────────────
document.getElementById("formvalidation").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name   = document.getElementById("name").value.trim();
  const email  = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();
  // If a name key was typed/selected, resolve it to a URL; otherwise use as raw URL
  const linkVal = document.getElementById("link").value.trim();
  const photo   = AVATARS[linkVal] || linkVal || selectedPhoto;

  try {
    await addContact({ name, number, email, photo });
    closeModal();
    window.dispatchEvent(new Event("contacts-updated"));
    toast(`"${name}" added!`, "success");
  } catch (err) {
    toast("Error: " + err, "error");
  }
});
