abstract class DebugTool {
  public static ITEM = new SkyItem(
    "debug_engineer_tool",
    "debug_engineer_tool",
    1
  );
  public static list: Record<int, Callback.ItemUseLocalFunction> = {};
  public static registerBlock(
    id: int,
    func: Callback.ItemUseLocalFunction
  ): void {
    DebugTool.list[id] = func;
  };
  static {
    DebugTool.ITEM.onUse((coords, item, block, player) => {
      const client = Network.getClientForPlayer(player);
      for (const i in DebugTool.list) {
        if (block.id === Number(i)) {
          return DebugTool.list[i](coords, item, block, player);
        }
      }
      if (Entity.getSneaking(player) === true) {
        BlockEngine.sendUnlocalizedMessage(
          client,
          Native.Color.GREEN +
            Translation.translate(
              "message.airborne_skies.debug.full_information"
            ) +
            "\n" +
            Translation.translate("message.airborne_skies.debug.mode_list") +
            JSON.stringify(Engineer.modes)
        );
      }
      BlockEngine.sendUnlocalizedMessage(
        client,
        Native.Color.GREEN +
          Translation.translate("message.airborne_skies.debug.engineer_mode") +
          Native.Color.UNDERLINE +
          Native.Color.GOLD +
          Engineer.modes[Entity.getNameTag(player)]
      );
    });
  }
}

DebugTool.registerBlock(
  BlockID["engineer_table"],
  (coords, item, block, player) => {
    const tile = TileEntity.getTileEntity(coords.x, coords.y, coords.z);
    if (!tile || !tile.data) return;
    const client = Network.getClientForPlayer(player);
    if (tile.data.lock === true) {
      tile.data.lock = false;
      BlockEngine.sendUnlocalizedMessage(
        client,
        Native.Color.RED +
          Translation.translate("message.airborne_skies.debug.table_lock.false")
      );
    } else {
      tile.data.lock = true;
      BlockEngine.sendUnlocalizedMessage(
        client,
        Native.Color.GREEN +
          Translation.translate("message.airborne_skies.debug.table_lock.true")
      );
    };
    return;
  }
);
