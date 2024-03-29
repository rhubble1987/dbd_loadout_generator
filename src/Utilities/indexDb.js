const dbName = "dbd_buildout_db";
export const objectStores = [
  "survivorsNotAllowed",
  "survivorsCurrentSelection",
  "killersNotAllowed",
  "killersCurrentSelection",
  "survivorPerksNotAllowed",
  "survivorPerksCurrentSelection",
  "survivorItemsNotAllowed",
  "survivorItemsCurrentSelection",
  "survivorItemAddOnsNotAllowed",
  "survivorItemAddOnsCurrentSelection",
  "survivorOfferingsNotAllowed",
  "survivorOfferingsCurrentSelection",
  "killerPerksNotAllowed",
  "killerPerksCurrentSelection",
  "killerOfferingsNotAllowed",
  "killerOfferingsCurrentSelection",
  "killerAddOnsNotAllowed",
  "killerAddOnsCurrentSelection"
]

export const initIndexDb = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      reject("IndexedDB error: " + event.target.errorCode);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      objectStores.forEach((objectStore) => {
        if (!db.objectStoreNames.contains(objectStore)) {
          db.createObjectStore(objectStore, { keyPath: 'id' });
        }
      })
    };
  });
};

export const insertData = (db, storeName, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    store.get(data.id).onsuccess = (event) => {
      if (event.target.result) {
        resolve("Data already exists")
      } else {
        store.add(data).onsuccess = () => {
          resolve("Data added")
        }

        store.onerror = (event) => {
          reject("Error updating data: " + event.target.errorCode);
        };
      }
    }
  });
};

export const clearObjectStore = (db, storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite")
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onsuccess = () => {
      resolve(`${storeName} cleared`)
    }

    request.onerror = (event) => {
      reject("Error clearing data", event.target.errorCode)
    }
  })
}

export const deleteData = (db, storeName, key) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite")
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    request.onsuccess = () => {
      resolve("Data successfully deleted");
    };

    request.onerror = (event) => {
      reject("Error updating data: " + event.target.errorCode);
    };
  });
}

export const getAllData = (db, storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite")
    const store = transaction.objectStore(storeName)
    const request = store.getAll()

    request.onsuccess = () => {
      let allObjects = request.result; // array of all objects in the store
      resolve(allObjects); // do something with the objects
    };

    request.onerror = () => {
      // Handle errors
      reject("Error in retrieving data: ", request.error);
    };
  })
}

export const getData = (db, storeName, id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "read")
    const store = transaction.objectStore(storeName)
    const request = store.get(id)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject("Error in retrieving data: ", request.error)
    }
  })
}
