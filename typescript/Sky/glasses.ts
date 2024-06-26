namespace Engineer {
    
  export let UIOpen = false;
  export const UIContainer = new UI.Container();
 
  export const UIMode = new UI.Window({
    drawing: [
      {
        type: "background",
        color: android.graphics.Color.argb(0.1, 162/256, 81/256, 0.9),
      },
      // {
      //   type: "bitmap",
      //   x: (1000 / 2) + (16*3/2),
      //   y: (UI.getScreenHeight() / 2) + (16*3/2),
      //   bitmap: "cross",
      //   scale: 3
      // },
      // {"type": "text", "text": "???", "x": 500, "y": UI.getScreenHeight() / 2 * 0.5, "font": {"size": 30, "color": 7}}
    ],
  });

  UIMode.setTouchable(false);
  UIMode.setAsGameOverlay(true);

  ItemRegistry.createArmor("engineer_glasses", {
    name: "armor.airborne_skies.engineer_glasses",
    icon: "engineer_glasses",
    type: "helmet",
    defence: 0,
    texture: "armor/engineer_glasses.png"
});

Item.registerNameOverrideFunction("engineer_glasses", (item, translation, name) => {
  return Native.Color.GOLD + Translation.translate(name) + Native.Color.GRAY + "\n" + Translation.translate("message.airborne_skies.engineer_glasses")
});

Armor.registerOnTakeOnListener(ItemID["engineer_glasses"], (item, slot, player) => {
  Mode.switch(true, player);
  Entity.addEffect(player, EPotionEffect.NIGHT_VISION, 5, 2147483647, false, false);
  UIOpen = true;
});

Armor.registerOnTakeOffListener(ItemID["engineer_glasses"], (item, slot, player) => {
  Mode.switch(false, player);
  Entity.clearEffect(player, EPotionEffect.NIGHT_VISION)
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