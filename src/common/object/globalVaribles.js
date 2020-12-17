module.exports = {
  PREFIX: ';',
  OWNER_ID: '371292844708724736',
  OWNER_TAG: 'cube#9455',
  DB_NAME: 'elektron',
  OPTIONS_CONFIGURATION: ['basic', 'emoji', 'permission', 'greeting'],
  OPTIONS_PROFILE: {
    OPTIONS_PROFILE_COMMAND: ['set'],
    OPTIONS_PROFILE_SET: ['name', 'profession'],
    OPTIONS_PROFILE_SET_LINKS: ['github', 'gitlab', 'linkedin', 'facebook']
  },
  OPTIONS_ROLE: ['add', 'remove', 'kick', 'info'],
  OPTIONS_MESSAGE: ['global', 'users', 'owners'],
  PERMISSIONS_ROLES: ['mod', 'helper'],
  NAME_SETTINGS_ROLE: ['mod', 'helper'],
  NAME_SETTINGS_CHANNEL: ['info', 'greeter', 'level', 'rate'],
  EVENTS: {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
  },
  EMOJIS: {
    GREEN_MARK: '716931643755069460',
    RED_MARK: '716931643755069480',
    CLICK: '694639052946800772'
  }
};
