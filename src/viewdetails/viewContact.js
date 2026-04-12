import { getAllContacts } from "../../crud/view_contact.js";
import { removeContact } from "../../crud/remove_contact.js";
import { updateContact } from "../../crud/update_contact.js";
import { toast } from "../toast.js";
import { AVATARS } from "../avatars.js";
import { searchContacts } from "../search.js";

const outputDiv      = document.getElementById("result");
const detailsOverlay = document.getElementById("detailsOverlay");

// ── Details modal elements ────────────────────────────────────────────────────
const detailsView    = document.getElementById("detailsView");
const detailsEdit    = document.getElementById("detailsEdit");
const detailsConfirm = document.getElementById("detailsConfirm");
const confirmText    = document.getElementById("confirmText");
const detailsPhoto   = document.getElementById("detailsPhoto");
const detailsName    = document.getElementById("detailsName");
const detailsNumber  = document.getElementById("detailsNumber");
const detailsEmail   = document.getElementById("detailsEmail");
const editForm          = document.getElementById("editForm");
const editAvatarOptions = document.getElementById("editAvatarOptions");
const editLink          = document.getElementById("editLink");
const editName          = document.getElementById("editName");
const editEmail         = document.getElementById("editEmail");
const editNumber        = document.getElementById("editNumber");

let activeContact  = null;
let editSelectedPhoto = "";

// ── Render edit avatars from shared map ───────────────────────────────────────
Object.entries(AVATARS).forEach(([name, url]) => {
  const img = document.createElement("img");
  img.src = url;
  img.alt = name;
  img.title = name;
  img.className = "avatar-pick";
  img.dataset.name = name;
  editAvatarOptions.appendChild(img);
});

editAvatarOptions.addEventListener("click", (e) => {
  const img = e.target.closest(".avatar-pick");
  if (!img) return;
  editAvatarOptions.querySelectorAll(".avatar-pick").forEach(i => i.classList.remove("active"));
  img.classList.add("active");
  editSelectedPhoto = img.src;
  editLink.value = img.dataset.name;
});

function openDetails(contact) {
  activeContact = contact;

  // Fill view mode
  detailsPhoto.src     = contact.photo || "";
  detailsName.textContent   = contact.name;
  detailsNumber.textContent = contact.number;
  detailsEmail.textContent  = contact.email || "";

  // Make sure we start in view mode
  detailsView.style.display = "";
  detailsEdit.style.display = "none";

  detailsOverlay.classList.add("open");
}

function closeDetails() {
  detailsOverlay.classList.remove("open");
  detailsView.style.display    = "";
  detailsEdit.style.display    = "none";
  detailsConfirm.style.display = "none";
  editAvatarOptions.querySelectorAll(".avatar-pick").forEach(i => i.classList.remove("active"));
  editSelectedPhoto = "";
  activeContact = null;
}

function showEditMode() {
  editName.value   = activeContact.name;
  editEmail.value  = activeContact.email || "";
  editNumber.value = activeContact.number;

  // Pre-select the matching avatar if the saved photo matches one in AVATARS
  editSelectedPhoto = activeContact.photo || "";
  const matchedName = Object.keys(AVATARS).find(k => AVATARS[k] === activeContact.photo);
  editAvatarOptions.querySelectorAll(".avatar-pick").forEach(i => i.classList.remove("active"));
  if (matchedName) {
    editLink.value = matchedName;
    editAvatarOptions.querySelector(`[data-name="${matchedName}"]`)?.classList.add("active");
  } else {
    editLink.value = activeContact.photo || "";
  }

  detailsView.style.display = "none";
  detailsEdit.style.display = "";
}

// Close buttons
document.getElementById("closeDetails").addEventListener("click", closeDetails);
detailsOverlay.addEventListener("click", (e) => { if (e.target === detailsOverlay) closeDetails(); });

// Switch to edit mode
document.getElementById("detailsEditBtn").addEventListener("click", showEditMode);

// Cancel edit → back to view
document.getElementById("editCancelBtn").addEventListener("click", () => {
  detailsView.style.display = "";
  detailsEdit.style.display = "none";
});

// Delete — show custom confirm panel
document.getElementById("detailsDeleteBtn").addEventListener("click", () => {
  confirmText.textContent = `Delete "${activeContact.name}"?`;
  detailsView.style.display    = "none";
  detailsConfirm.style.display = "";
});

document.getElementById("confirmNoBtn").addEventListener("click", () => {
  detailsConfirm.style.display = "none";
  detailsView.style.display    = "";
});

document.getElementById("confirmYesBtn").addEventListener("click", async () => {
  try {
    await removeContact(activeContact.id);
    closeDetails();
    window.dispatchEvent(new Event("contacts-updated"));
    toast("Contact deleted.", "success");
  } catch (err) {
    toast("Error deleting: " + err, "error");
  }
});

// Save update
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const linkVal = editLink.value.trim();
    const photo   = AVATARS[linkVal] || linkVal || editSelectedPhoto;
    await updateContact(activeContact.id, {
      name:   editName.value.trim(),
      email:  editEmail.value.trim(),
      number: editNumber.value.trim(),
      photo,
    });
    closeDetails();
    window.dispatchEvent(new Event("contacts-updated"));
    toast("Contact updated!", "success");
  } catch (err) {
    toast("Error updating: " + err, "error");
  }
});

// ── Render contact list ───────────────────────────────────────────────────────
let allContacts = [];

function renderContacts(contacts) {
  outputDiv.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "contact-list";

  contacts.forEach(contact => {
    const li = document.createElement("li");
    li.className = "contact-item";

    const img = document.createElement("img");
    img.src = contact.photo || "";
    img.alt = "Profile";
    img.className = "profile-pic";

    const infoDiv = document.createElement("div");
    infoDiv.className = "contact-info";

    const name = document.createElement("h3");
    name.textContent = contact.name;

    const number = document.createElement("p");
    number.textContent = contact.number;

    infoDiv.append(name, number);

    const menuBtn = document.createElement("button");
    menuBtn.className = "menu-btn";
    menuBtn.textContent = "⋮";
    menuBtn.addEventListener("click", () => openDetails(contact));

    li.append(img, infoDiv, menuBtn);
    ul.appendChild(li);
  });

  outputDiv.appendChild(ul);
}

async function displayContacts() {
  allContacts = await getAllContacts();
  const query = document.getElementById("textInput").value;
  renderContacts(searchContacts(allContacts, query));
}

// Search input — filter on every keystroke
document.getElementById("textInput").addEventListener("input", (e) => {
  renderContacts(searchContacts(allContacts, e.target.value));
});

displayContacts();
window.addEventListener("contacts-updated", displayContacts);
