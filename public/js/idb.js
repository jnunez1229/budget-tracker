let db;
const request = indexedDB.open('budget_tracker',1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_input', {autoIncrement: true});
};

// upon a successful 
request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run uploadinput() function to send all local db data to api
    if (navigator.onLine) {
      // we haven't created this yet, but we will soon, so let's comment it out for now
      // uploadinput();
    }
  };
  
  request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
  };

  // This function will be executed if we attempt to submit a new budget input and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_input'], 'readwrite');
  
    // access the object store for `new_input`
    const inputObjectStore = transaction.objectStore('new_input');
  
    // add record to your store with add method
    inputObjectStore.add(record);
  }