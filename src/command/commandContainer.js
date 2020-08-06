const load = require("../common/database/load")
const Tool = require("../common/object/toolObject")


const getCommandContainer = {
    getContainer: async function () {
        const container = await load(null, new Tool(null, {
            collection: 'container',
            filter: { category: 'commandContainer' },
            folder: 'permissionsFolder',
            type: 'mongo'
        }))
        return container
    }
}

module.exports = getCommandContainer.getContainer