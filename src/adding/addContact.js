// import { addContact } from "../../crud/add_contact.js";

// const addButton = document.getElementById("addButton");
// const contactList = document.getElementById("contactList");

// // CREATE MODAL
// const modal = document.createElement("div");
// modal.classList.add("modal", "hidden");

// const form = document.createElement("form");
// form.classList.add("modal-content");

// const nameInput = document.createElement("input");
// nameInput.placeholder = "Name";
// nameInput.required = true;

// const numberInput = document.createElement("input");
// numberInput.placeholder = "Number";
// numberInput.required = true;

// const emailInput = document.createElement("input");
// emailInput.placeholder = "Email (optional)";

// const saveBtn = document.createElement("button");
// saveBtn.type = "submit";
// saveBtn.textContent = "Save";

// form.append(nameInput, numberInput, emailInput, saveBtn);
// modal.appendChild(form);
// document.body.appendChild(modal);

// // EVENTS
// addButton.addEventListener("click", () => {
//   console.log("Add button clicked");
//   modal.classList.toggle("hidden");
//   if (!modal.classList.contains("hidden")) {
//     console.log("Modal opened");
//     nameInput.focus();
//   } else {
//     console.log("Modal closed");
//   }
// });

// // Close modal when clicking outside
// modal.addEventListener("click", e => {
//   if (e.target === modal) {
//     console.log("Clicked outside modal, closing");
//     modal.classList.add("hidden");
//   }
// });

// // Render contact in list
// function renderContact(contact) {
//   console.log("Rendering contact:", contact);
//   const li = document.createElement("li");
//   li.textContent = `${contact.name} - ${contact.number}${contact.email ? ` (${contact.email})` : ""}`;
//   li.dataset.id = contact.id;
//   contactList.appendChild(li);
// }

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
//     // Add contact to DB
//     const newContact = await addContact(contact);

//     // Render contact in UI
//     renderContact(newContact);

//     // Reset form
//     form.reset();

//     // Automatically close modal
//     modal.classList.add("hidden");
//     console.log("Modal closed after saving contact");

//   } catch (err) {
//     console.error("Error adding contact:", err);
//     alert(err);
//   }
// });
