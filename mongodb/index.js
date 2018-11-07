const MongoClient = require('mongodb').MongoClient;

const findDocuments = (collection, where = {}) => {
    return new Promise((resolve, reject) => {
        collection.find(where).toArray((err, docs) => {
            if (err) reject(err);
            else resolve(docs);
        });
    });
};

const insertDocuments = (collection, documents = []) => {
    return new Promise((resolve, reject) => {
        if (documents.length == 0) {
            resolve({
                result: {
                    result: {
                        n: 0,
                        ok: 0
                    },
                    ops: []
                },
                db
            });
        }
        collection.insertMany(documents, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const updateDocument = (collection, where, ops) => {
    return new Promise((resolve, reject) => {
        collection.updateOne(where, { $set: ops }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const removeDocument = (collection, where = {}) => {
    return new Promise((resolve, reject) => {
        collection.deleteOne(where, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const indexCollection = (collection, index) => {
    return new Promise((resolve, reject) => {
        collection.createIndex(index, null, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

let client, db;

const connect = (url, dbname) => {
    if (client && db) {
        return Promise.resolve(db);
    }

    return new Promise((resolve, reject) => {
        MongoClient.connect(
            url,
            { useNewUrlParser: true },
            (err, cit) => {
                if (err) reject(err);
                else {
                    client = cit;
                    db = cit.db(dbname);

                    resolve(db);
                }
            }
        );
    });
};

module.exports = {
    default: connect,
    client,
    db,
    findDocuments,
    insertDocuments,
    updateDocument,
    removeDocument,
    indexCollection
};
