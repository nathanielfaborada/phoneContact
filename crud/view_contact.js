import { getStore } from "../database/contacts_db.js";

export function getAllContacts() {
  return new Promise(async (resolve, reject) => {
    try {
      const store = await getStore("readonly");
      console.log("Got object store for fetching all contacts:", store);

      const request = store.getAll();

      request.onsuccess = () => {
        console.log("Fetched all contacts:", request.result);
        resolve(request.result);
      };
      request.onerror = () => {
        console.error("Error fetching all contacts:", request.error);
        reject(request.error);
      }
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      reject(err);
    } 
  });
} 