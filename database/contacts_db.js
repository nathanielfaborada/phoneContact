let db = null;

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("contacts_db", 1);

    request.onupgradeneeded = event => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("contacts")) {
        const store = db.createObjectStore("contacts", {
          keyPath: "id",
          autoIncrement: true
        });

        // Optional indexes (future-proof)
        store.createIndex("name", "name", { unique: false });
        store.createIndex("number", "number", { unique: false });
        store.createIndex("email", "email", { unique: false });
      }
    };

    request.onsuccess = event => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = event => {
      reject(event.target.error);
    };

    request.onblocked = () => {
      console.warn("DB upgrade blocked. Close other tabs.");
    };
  });
}

export function getStore(mode = "readonly") {
  if (!db) {
    throw new Error("Database not initialized. Call openDB() first.");
  }
  return db.transaction("contacts", mode).objectStore("contacts");
}
