namespace Engineer {

  export const modes: Record<int, boolean> = {};

  export abstract class Mode {
    public static readonly HAMMER: SkyItem = new SkyItem(
      "engineer_hammer",
      "engineer_hammer"
    );
    public static validate(player: int) {
      const name = Entity.getNameTag(player);
      modes[name] ??= { [name]: false };
      if (modes[name] === false) {
          Game.message(
            Native.Color.GREEN +
              Translation.translate(
                "message.airborne_skyes.engineer_mode_false"
              ))
              return false
      }
      return true;
    };
    public static switch(value: boolean, player: int) {
      const name = Entity.getNameTag(player);
      modes[name] = value;
      Game.message(JSON.stringify(modes));
    }

    static {
      Item.registerNameOverrideFunction(
        "engineer_hammer",
        (item, translation, name) =>
          `${Native.Color.GOLD + Translation.translate(name)}${
            Native.Color.GRAY +
            "\n" +
            Translation.translate("message.airborne_skies.hammer")
          }`
      );
    }
  }
}
