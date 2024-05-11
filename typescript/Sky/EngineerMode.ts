namespace Engineer {
  export const modes: Record<int, boolean> = {};
  export const UIMode = new UI.Window({
    drawing: [
      {
        type: "background",
        color: android.graphics.Color.argb(0.15, 162/256, 81/256, 0.9),
      },
      {
        type: "bitmap",
        x: (1000 / 2) / (16*3/2),
        y: (UI.getScreenHeight() / 2) / (16*3/2),
        bitmap: "cross",
        scale: 3
      }
    ],
  });
  UIMode.setTouchable(false);
  UIMode.setAsGameOverlay(false);

  export let UIOpen = false;
 export const UIContainer = new UI.Container();


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
      modes[name] = value
      Game.message(JSON.stringify(modes))
    };
  }


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
    Mode.switch(true, player);
    UIOpen = true;
 });

 Armor.registerOnTakeOffListener(ItemID["engineer_glasses"], (item, slot, player) => {
    Mode.switch(false, player);
    UIOpen = false;
 })

 Callback.addCallback("NativeGuiChanged", function (screenName) {
    if (screenName == "in_game_play_screen" && UIOpen === true && UIContainer.isOpened() === false) {
      UIContainer.openAs(UIMode);
    } else {
      UIContainer.close();
    }
  });


}