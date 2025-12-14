import { getStore } from "../database/contacts_db.js";

export function addContact({ name, number, email }) {
  return new Promise((resolve, reject) => {
    if (!name || !number) {
      return reject("Name and number are required");
    }

    if (!/^\d+$/.test(number)) {
      return reject("Number must be digits only");
    }

    const store = getStore("readwrite");
    const request = store.add({ name, number, email });

    request.onsuccess = () => {
      resolve(request.result); // returns new ID
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
