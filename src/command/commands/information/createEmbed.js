const globalVaribles = require('../../../common/object/globalVaribles')
const smartEmbed = require('../../../common/useful/smartEmbed')
const startContent = '<'
const endContent = '>'
const fieldSeparator = '++'
const embedParams = [
    'title',
    'description',
    'footer',
    'author',
    'field',
    'image',
    'color'
]

async function getAttribute() {
    for (attribute of embedParams) {
        if (this.contentOfEmbedPart.toLowerCase().trim().startsWith(attribute)) {
            this.attributeEmbed = attribute
            break
        }
    }
}
async function getContent() {
    let startSliceContent = this.contentOfEmbedPart.indexOf(startContent) + startContent.length
    let endSliceContent = this.contentOfEmbedPart.lastIndexOf(endContent)
    this.contentOfEmbedPart = this.contentOfEmbedPart.slice(startSliceContent, endSliceContent)

}
async function setField() {
    let substrField = this.contentOfEmbedPart.indexOf(fieldSeparator)
    let sliceField = substrField + fieldSeparator.length
    let fieldTitle = this.contentOfEmbedPart.substr(0, substrField)
    let fieldContent = this.contentOfEmbedPart.slice(sliceField)
    this.setEmbedPart = {
        [`${this.attributeEmbed}${this.i}`]: { title: fieldTitle, description: fieldContent }
    }
    this.i++
}

async function main(bot, msg, params) {
    this.i = 1
    this.params = params
    this.embedObject = {}
    this.contentOfEmbedPart = ``
    this.contentArray = ``
    this.attributeEmbed = ``

    if (!params[1]) return console.log('I don\'t have params')
    console.log(params[1])
    this.contentArray = msg.content.slice(params[0].length + globalVaribles.PREFIX.length + 1)
    this.contentArray = this.contentArray.split(';;')
    console.log(this.contentArray)
    for (embedPart of this.contentArray) {
        this.contentOfEmbedPart = embedPart
        await getAttribute.call(this)
        if (!this.attributeEmbed) continue
        await getContent.call(this)
        if (!this.contentOfEmbedPart) continue

        if (this.attributeEmbed === ('author' || 'image'))
            this.contentOfEmbedPart = this.contentOfEmbedPart.trim()

        if (this.attributeEmbed === 'color') {
            if (this.contentOfEmbedPart.length === 7 && this.contentOfEmbedPart.startsWith('#'))
                this.contentOfEmbedPart = this.contentOfEmbedPart.trim()
        } else if (this.contentOfEmbedPart.length === 6 && !this.contentOfEmbedPart.startsWith('#'))
            this.contentOfEmbedPart = `#${this.contentOfEmbedPart.trim()}`

        this.setEmbedPart = {}
        if (this.attributeEmbed === 'field') {
            if (!this.contentOfEmbedPart.includes(fieldSeparator)) continue
            await setField.call(this)
        } else
            this.setEmbedPart = {
                [this.attributeEmbed]: this.contentOfEmbedPart
            }

        Object.assign(this.embedObject, this.setEmbedPart)
    }
    if (!this.embedObject) return console.log(`Objekt jest pusty`)
    smartEmbed(bot, msg, this.embedObject)
}

module.exports = {
    method: main
}