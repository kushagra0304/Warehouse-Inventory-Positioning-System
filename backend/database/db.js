const { JSONFileSync } = require('lowdb/node');
const { LowSync } = require('lowdb');

const adapter = new JSONFileSync('./database/db.json');
const db = new LowSync(adapter, {
        "tags": {
            
        },
        "scanner": {
          "lat": "",
          "long": "",
          "lastStart": ""
        }
});

db.read();

db.data.tags = {};

db.data.scanner = {
    lat: "",
    long: "",
    lastStart: ""
}

db.write();

// this database instance will be cached by cjs.
module.exports = db;