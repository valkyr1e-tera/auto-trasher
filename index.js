module.exports = function AutoTrasher(mod) {
  mod.game.initialize('inventory')

  mod.command.add('trash', () => {
		mod.settings.enabled = !mod.settings.enabled
		mod.command.message((mod.settings.enabled ? 'en' : 'dis') + 'abled')
  })

  mod.hook('S_INVEN', 'raw', () => {
    if (!mod.settings.enabled)
      return

    for (const item of mod.game.inventory.items) {
      if (item.slot < 40)
        continue

      if (mod.settings.items.includes(item.id))
        mod.send('C_DEL_ITEM', 2, {
          gameId: mod.game.me.gameId,
          slot: item.slot - 40,
          amount: item.amount
        })
    }
  })
}