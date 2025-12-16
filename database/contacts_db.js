let db = null;

export function openDB() {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db); // Already opened

    const request = indexedDB.open("contacts_db", 1);

    request.onupgradeneeded = event => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains("contacts")) {
        const store = database.createObjectStore("contacts", {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("name", "name", { unique: false });
        store.createIndex("number", "number", { unique: false });
        store.createIndex("email", "email", { unique: false });
        console.log("Object store 'contacts' created");
      }
    };

    request.onsuccess = event => {
      db = event.target.result;

      // Handle version change from other tabs
      db.onversionchange = () => {
        db.close();
        alert("Database is outdated, please reload the page.");
      };

      console.log("Database opened successfully:", db);
      resolve(db);
    };

    request.onerror = event => {
      console.error("Failed to open database:", event.target.error);
      reject(event.target.error);
    };

    request.onblocked = () => {
      console.warn("Database upgrade blocked. Close other tabs.");
    };
  });
}

// Always ensures DB is ready before returning object store
export async function getStore(mode = "readonly") {
  if (!db) await openDB();
  const tx = db.transaction("contacts", mode);
  const store = tx.objectStore("contacts");
  return store;
}
