import { getStore } from "../database/contacts_db.js";

export function updateContact(id, updates = {}) {
  return new Promise((resolve, reject) => {
    if (!id) return reject("Invalid contact ID");

    const store = getStore("readwrite");
    const getReq = store.get(id);

    getReq.onerror = () => reject(getReq.error);

    getReq.onsuccess = () => {
      const contact = getReq.result;
      if (!contact) return reject("Contact not found");

      // Partial updates
      if (updates.name !== undefined) {
        if (!updates.name.trim()) return reject("Name cannot be empty");
        contact.name = updates.name.trim();
      }

      if (updates.number !== undefined) {
        if (!/^\d+$/.test(updates.number))
          return reject("Number must be digits only");
        contact.number = updates.number;
      }

      if (updates.email !== undefined) {
        contact.email = updates.email;
      }

      const putReq = store.put(contact);

      putReq.onsuccess = () => resolve(contact);
      putReq.onerror = () => reject(putReq.error);
    };
  });
}
