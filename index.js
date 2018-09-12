'use strict'

module.exports = function AutoTrasher(mod) {
  let items = null
  
  mod.command.add('trash', () => {
		mod.settings.enabled = !mod.settings.enabled
		mod.command.message((mod.settings.enabled ? 'en' : 'dis') + 'abled')
  })
  
  mod.hook('S_INVEN', 14, event => {
    items = event.first ? event.items : inven.concat(event.items)

    if (!mod.settings.enabled || event.more)
      return

    for (let item in items) {
      if (item.slot < 40)
        continue

      if (mod.settings.items.includes(item.id))
        mod.toServer('C_DEL_ITEM', 2, {
          gameId: mod.game.me.gameId,
          slot: item.slot - 40,
          amount: item.amount
        })
    }
  })
}