const mongoose = require('mongoose');
const gv = require('../../object/globalVaribles');

module.exports.connectionToDatabase = async (collection, filter, db = gv.DB_NAME) => {
    const connection = await mongoose.connections[0].client.db(db).collection(`${collection}s`)
    if (!filter) {
        return connection
    }
    const connectionToSpecifiDatabase = connection.find(filter)
    return await connectionToSpecifiDatabase.toArray()
};