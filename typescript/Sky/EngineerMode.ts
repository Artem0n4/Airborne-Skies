namespace Engineer {
  export const modes: Record<int, [boolean, UI.Container]> = {};
  export const UIMode = new UI.Window({
    location: {
      x: 0,
      y: 0,
      width: 1000,
      height: 560,
    },
    drawing: [
      {
        type: "background",
        color: android.graphics.Color.argb(218, 142, 29, 0.35),
      },
    ],
  });

  export class Mode {
    public static validate(player: int) {
      const name = Entity.getNameTag(player);
      Game.message("before: " + JSON.stringify(modes[name])); //DEBUG
      modes[name] ??= { [name]: false };
      Game.message("after: " + JSON.stringify(modes[name])); //DEBUG
      if (modes[name][0] === false) {
        Network.getClientForPlayer(player).sendMessage(
          Native.Color.GREEN +
            Translation.translate("message.airborne_skyes.engineer_mode_false")
        );
        alert("Debug");
        return false;
      }
      return true;
    };

    public static switch(value: boolean, player: int) {
      const name = Entity.getNameTag(player);
      modes[name] = [value, new UI.Container()];
    };
    public static getContainer(player): UI.Container | null {
        const name = Entity.getNameTag(player);
       return modes[name][1] as UI.Container || null;
    }
  }

  Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
    if(item.id === VanillaItemID.stick) {
        Mode.validate(player);
    }
  });

  ItemRegistry.createArmor("engineer_glasses", {
      name: "armor.airborne_skyes.engineer_glasses",
      icon: "engineer_glasses",
      type: "helmet",
      defence: 0,
      texture: "armor/engineer_glasses.png"
  });

 Item.registerNameOverrideFunction("engineer_glasses", (item, translation, name) => {
    return Native.Color.GOLD + Translation.translate(name) + Native.Color.GRAY + "\n" + Translation.translate("message.airborne_skyes.engineer_glasses")
 });

 Armor.registerOnTakeOnListener(ItemID["engineer_glasses"], (item, slot, player) => {
    alert("Я родился!");
    Mode.switch(true, player);
    Mode.getContainer(player) && Mode.getContainer(player).openAs(UIMode);
 });

 Armor.registerOnTakeOffListener(ItemID["engineer_glasses"], (item, slot, player) => {
    alert("Я снят!");
    Mode.switch(false, player);
    Mode.getContainer(player) && Mode.getContainer(player).close();
 })
   
}
