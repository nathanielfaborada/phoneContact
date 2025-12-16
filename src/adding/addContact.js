// import { addContact } from "../../crud/add_contact.js";

// const addButton = document.getElementById("addButton");

// /* =====================
//    CREATE MODAL
// ===================== */
// const modal = document.createElement("div");
// modal.className = "modal hidden";

// const form = document.createElement("form");
// form.className = "modal-content";

// /* INPUTS */
// const nameInput = document.createElement("input");
// nameInput.placeholder = "Name";
// nameInput.required = true;

// const numberInput = document.createElement("input");
// numberInput.placeholder = "Number";
// numberInput.required = true;

// const emailInput = document.createElement("input");
// emailInput.placeholder = "Email (optional)";

// /* BUTTON WRAPPER */
// const buttonWrapper = document.createElement("div");
// buttonWrapper.className = "modal-buttons";

// /* BACK BUTTON */
// const backBtn = document.createElement("button");
// backBtn.type = "button"; // IMPORTANT
// backBtn.textContent = "Back";

// /* SAVE BUTTON */
// const saveBtn = document.createElement("button");
// saveBtn.type = "submit";
// saveBtn.textContent = "Save";

// /* APPEND */
// buttonWrapper.append(backBtn, saveBtn);
// form.append(nameInput, numberInput, emailInput, buttonWrapper);
// modal.appendChild(form);
// document.body.appendChild(modal);

// /* =====================
//    FUNCTIONS
// ===================== */
// function openModal() {
//   modal.classList.remove("hidden");
//   nameInput.focus();
// }

// function closeModal() {
//   form.reset();
//   modal.classList.add("hidden");
// }

// /* =====================
//    EVENTS
// ===================== */
// addButton.addEventListener("click", openModal);

// backBtn.addEventListener("click", closeModal);

// // Click outside modal
// modal.addEventListener("click", e => {
//   if (e.target === modal) closeModal();
// });

// // Submit form
// form.addEventListener("submit", async e => {
//   e.preventDefault();

//   const contact = {
//     name: nameInput.value.trim(),
//     number: numberInput.value.trim(),
//     email: emailInput.value.trim()
//   };

//   if (!contact.name || !contact.number) return;

//   try {
//     await addContact(contact);
//     closeModal();

//     // OPTIONAL: refresh list
//     // displayContacts();

//   } catch (err) {
//     console.error("Error adding contact:", err);
//     alert("Failed to add contact");
//   }
// });
