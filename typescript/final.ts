const DEBUG_TOOL = new SkyItem("debug_engineer_tool", "debug_engineer_tool", 1);
DEBUG_TOOL.onUse((coords, item, block, player) => {
  const client = Network.getClientForPlayer(player);
  if (Entity.getSneaking(player) === true) {
    return BlockEngine.sendUnlocalizedMessage(
      client,
      Native.Color.GREEN + Translation.translate("message.airborne_skies.debug.full_information") +
        "\n" +
        Translation.translate("message.airborne_skies.debug.mode_list") +
        JSON.stringify(Engineer.modes)
    );
  }
  return BlockEngine.sendUnlocalizedMessage(
    client,
    Native.Color.GREEN + Translation.translate("message.airborne_skies.debug.engineer_mode") + Native.Color.UNDERLINE + Native.Color.GOLD + Engineer.modes[Entity.getNameTag(player)]
  );
});
