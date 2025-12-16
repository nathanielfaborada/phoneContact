import { getStore } from "../database/contacts_db.js";

export function addContact({ name, number, email }) {
  return new Promise(async (resolve, reject) => {
    // Validate inputs
    name = name?.trim();
    number = number?.trim();
    email = email?.trim();

    if (!name || !number) return reject("Name and number are required");
    if (!/^\d+$/.test(number)) return reject("Number must be digits only");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reject("Invalid email format");

    try {
      const store = await getStore("readwrite"); // ensures DB is ready
      console.log("Got object store:", store);

      const request = store.add({ name, number, email });

      request.onsuccess = () => {
        console.log("Contact added:", { id: request.result, name, number, email });
        resolve({ id: request.result, name, number, email });
      };

      request.onerror = () => {
        console.error("Add contact error:", request.error);
        reject(request.error);
      };
    } catch (err) {
      console.error("Failed to add contact:", err);
      reject(err);
    }
  });
}
