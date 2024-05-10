namespace Engineer {
  export const modes: Record<int, boolean> = {};
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
        color: android.graphics.Color.argb(0.15, 162/256, 81/256, 0.9),
      },
      {
        type: "bitmap",
        x: UI.getScreenHeight() / 2,
        y: UI.getScreenHeight() / 4,
        bitmap: "cross",
        scale: 3
      }
    ],
  });
  
  export let UIOpen = false;
 export const UIContainer = new UI.Container();

 UIMode.setTouchable(false);
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

  Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
    if(item.id === VanillaItemID.stick) {
        Mode.validate(player);
        
  const bitmap = new android.graphics.Canvas();
  const paint = new android.graphics.Paint()
  paint.setARGB(0.5,0,0,0);
bitmap.drawBitmap(FileTools.ReadImage(__dir__ + "resources/assets/misc/cross.png"), bitmap.getHeight() / 2, bitmap.getWidth() / 2, paint)
alert("Тест!");
bitmap.scale(0.5, 0.5);

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