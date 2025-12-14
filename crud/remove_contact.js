import { getStore } from "../database/contacts_db.js";

export function removeContact(id) {
  return new Promise((resolve, reject) => {
    if (id === undefined || id === null) {
      return reject("Invalid contact ID");
    }

    const store = getStore("readwrite");
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
