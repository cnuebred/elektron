const globalVaribles = require("../../../../common/object/globalVaribles")
const load = require("../../../../common/database/load")
const smartEmbed = require("../../../../common/useful/smartEmbed")
const Tool = require("../../../../common/object/toolObject")
const globalMethods = require("../../../../common/useful/globalMethods")


module.exports = async (bot, msg, params) => {
    const tool = new Tool(msg, { std: 'stdg', folder: `configuration.${msg.configurationOption}` })
    const toolBasic = new Tool(msg, { std: 'stdg', folder: `configuration.basic` })
    let embedObject = {}
    let index = 1
    for (permissionRole of globalVaribles.PERMISSIONS_ROLES) {
        let permissionFolder = await load(msg, tool)
        console.log(permissionFolder)
        let roleCommands = permissionFolder[`${permissionRole}-commands`]

        if (!roleCommands) return roleCommands = 'rola nie posiada uprawnień'
        else roleCommands.join(`**,**`)

        let role = await load(msg, toolBasic)
        role = await globalMethods.findRole(msg, role[permissionRole])
        if (!role) role = '**Nie przypisano roli**'

        let field = {
            [`field${index++}`]: {
                title: `Uprawnienia roli **${permissionRole}**`,
                description: `${role}\nLista uprawnień: \n **${roleCommands}**`
            }
        }
        Object.assign(embedObject, field)
    }
    await smartEmbed(bot, msg, Object.assign({
        title: `Ustawienia uprawnień`
    },
        embedObject
    ))
}