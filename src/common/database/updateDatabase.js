const { connectionToDatabase } = require('./connect/connectDatabase')

module.exports.update = async (collection, filter, schema, mode = 'set') => {
    return new Promise(async (resolve, reject) => {
        const status = await connectionToDatabase(collection, filter);
        if (status.length === 0) return reject('array is empty');
        const mongo = await connectionToDatabase(collection, false);
        if (mode == 'set') {
            await resolve(await mongo.updateOne(filter, {
                $set: schema
            })
            );
        }
        else if (mode == 'mod') {
            await resolve(await mongo.updateOne(filter, {
                $mod: schema
            })
            );
        }
    });
};
