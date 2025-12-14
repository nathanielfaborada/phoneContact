import { getStore } from "../database/contacts_db.js";

export function getAllContacts() {
  return new Promise((resolve, reject) => {
    const store = getStore("readonly");
    const contacts = [];

    const request = store.openCursor();

    request.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        contacts.push(cursor.value);
        cursor.continue();
      } else {
        resolve(contacts); // done
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
