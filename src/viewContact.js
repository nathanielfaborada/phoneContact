import { getAllContacts } from "../crud/view_contact.js";

const outputDiv = document.getElementById("result");

async function displayContacts() {
  outputDiv.innerHTML = "<p>Loading contacts...</p>";

  const contacts = await getAllContacts();
  outputDiv.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "contact-list";

  contacts.forEach(contact => {
    const li = document.createElement("li");
    li.className = "contact-item";

    // profile image
    const img = document.createElement("img");
    img.src = contact.photo || "profile.jpg"; // fallback
    img.alt = "Profile";
    img.className = "profile-pic";

    // contact info
    const infoDiv = document.createElement("div");
    infoDiv.className = "contact-info";

    const name = document.createElement("h3");
    name.textContent = contact.name;

    const number = document.createElement("p");
    number.textContent = contact.number;

    infoDiv.append(name, number);

    // menu button
    const menuBtn = document.createElement("button");
    menuBtn.className = "menu-btn";
    menuBtn.textContent = "⋮";

    // OPTIONAL: menu click
    menuBtn.onclick = () => {
      alert(`Options for ${contact.name}`);
    };

    li.append(img, infoDiv, menuBtn);
    ul.appendChild(li);
  });

  outputDiv.appendChild(ul);
}

displayContacts();
