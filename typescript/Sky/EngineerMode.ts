namespace Engineer {
  export const modes: Record<int, boolean> = {};

  export abstract class Mode {

    public static readonly HAMMER: SkyItem = new SkyItem(
      "engineer_hammer",
      "engineer_hammer",
      1
    );

    public static readonly METAL_SHEARS: SkyItem = new SkyItem(
      "metal_shears",
      "metal_shears",
      1
    );

    private static readonly sendOffModeText = (player) =>
      BlockEngine.sendUnlocalizedMessage(
        Network.getClientForPlayer(player),
        Native.Color.GREEN +
          Translation.translate("message.airborne_skyes.engineer_mode_false")
      );

    public static validate(player: int, callback: (player?: int) => void) {
      const name = Entity.getNameTag(player);
      modes[name] ??= { [name]: false };
      if (modes[name] !== true) {
        return Mode.sendOffModeText(player);
      }
      return callback();
    }
    public static switch(value: boolean, player: int) {
      const name = Entity.getNameTag(player);
      modes[name] = value;
      Game.message(JSON.stringify(modes));
    }

    static {
      Mode.HAMMER.setupDescription("message.airborne_skies.hammer", Native.Color.GRAY);
    }
  };
}
