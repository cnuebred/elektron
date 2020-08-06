const { connectionToDatabase } = require('./connect/connectDatabase')

module.exports.update = async (collection, filter, schema) => {
    return new Promise(async (resolve, reject) => {
        const status = await connectionToDatabase(collection, filter);
        if (status.length === 0) return reject('array is empty');
        const mongo = await connectionToDatabase(collection, false);
        await resolve(await mongo.updateOne(filter, {
            $set: schema
        })
        );
    });
};
