namespace Engineer {
  /**
   * list of players with his modes   
   * {int: boolean}
   */
  export const modes: Record<string, boolean> = {};

  export abstract class Mode {
    public static readonly HAMMER: SkyItem = new SkyItem(
      "engineer_hammer",
      "engineer_hammer",
      1,
      true
    );

    public static readonly METAL_SHEARS: SkyItem = new SkyItem(
      "metal_shears",
      "metal_shears",
      1
    );

    private static readonly sendOffModeText = (player: int) =>
      BlockEngine.sendUnlocalizedMessage(
        Network.getClientForPlayer(player),
        Native.Color.RED +
          Translation.translate("message.airborne_skies.engineer_mode_false")
      );

    public static validate(player: int, callback: (player?: int) => void) {
      const name = Entity.getNameTag(player);
      modes[name] ??= false;
      if (modes[name] !== true) {
        return Mode.sendOffModeText(player);
      }
      return callback();
    }
    public static switch(value: boolean, player: int) {
      const name = Entity.getNameTag(player);
      modes[name] = value;
    }
    static {
      Item.addToCreative(Mode.HAMMER.getID(), 1, 250);
      Item.registerNameOverrideFunction(Mode.HAMMER.getID(), (item, translation, name) => {
        const durability_color = item.data >= 125 ? Native.Color.GREEN : item.data >= 50 ? Native.Color.RED : Native.Color.DARK_RED  
        return Translation.translate(name) + "\n" + Native.Color.GRAY + Translation.translate("message.airborne_skies.hammer") + "\n" + Translation.translate("durability: ") + durability_color + item.data 
      })
    }
  }

  export abstract class Hammer {
    protected constructor() {}
    private static list: { before: int; after: int }[] = [];
    public static registerUpdateBlock(before: int): void;
    public static registerUpdateBlock(before: int, after: int): void
    public static registerUpdateBlock(before: int, after: int = 0) {
      this.list.push({ before, after });
    };
    private static destroyHammer(item: ItemInstance, player: int) {
      const entity = new PlayerEntity(player);
      const pos = Entity.getPosition(player);
      MachineBlock.crossParticles({x: pos.x, y: pos.y + 1, z: pos.z}, player);
      entity.decreaseCarriedItem();
      return;
    };
    private static update(
      coords: Callback.ItemUseCoordinates,
      item: ItemInstance,
      block: Tile,
      player: int
    ) {
      if(item.data <= 0) return this.destroyHammer(item, player);
      for (const list of Hammer.list) {
        if (block.id === list.before) {
          const region = BlockSource.getDefaultForActor(player);
          Entity.setCarriedItem(player, item.id, item.count, item.data - 1, item.extra);
          region.destroyBlock(coords.x, coords.y, coords.z, false);
          region.setBlock(coords.x, coords.y, coords.z, list.after, 0);
          return;
        }
      }
      MachineBlock.takeParticles(coords, player);
    }
    static {
      Item.registerUseFunctionForID(
        Mode.HAMMER.getID(),
        (coords, item, block, player) => {
         return Mode.validate(player, () => {
            return this.update(coords, item, block, player);
          })
        }
      );
    }
  }
  //stone
  Hammer.registerUpdateBlock(VanillaBlockID.stone, VanillaBlockID.cobblestone);
  Hammer.registerUpdateBlock(VanillaBlockID.cobblestone, VanillaBlockID.gravel);
  Hammer.registerUpdateBlock(VanillaBlockID.mossy_cobblestone, VanillaBlockID.gravel);
  Hammer.registerUpdateBlock(VanillaBlockID.sandstone, VanillaBlockID.sand);
  Hammer.registerUpdateBlock(VanillaBlockID.stonebrick, VanillaBlockID.cobblestone);
  Hammer.registerUpdateBlock(VanillaBlockID.smooth_stone, VanillaBlockID.cobblestone);

  //nature
  Hammer.registerUpdateBlock(VanillaBlockID.grass, VanillaBlockID.dirt)
  Hammer.registerUpdateBlock(VanillaBlockID.farmland, VanillaBlockID.dirt);
  Hammer.registerUpdateBlock(VanillaBlockID.mycelium, VanillaBlockID.dirt);
  Hammer.registerUpdateBlock(VanillaBlockID.grass_path, VanillaBlockID.dirt);
  Hammer.registerUpdateBlock(VanillaBlockID.ice, VanillaBlockID.flowing_water);
  Hammer.registerUpdateBlock(VanillaBlockID.blue_ice, VanillaBlockID.flowing_water);
  Hammer.registerUpdateBlock(VanillaBlockID.packed_ice, VanillaBlockID.flowing_water);
  Hammer.registerUpdateBlock(VanillaBlockID.frosted_ice, VanillaBlockID.flowing_water);

  //glass
  Hammer.registerUpdateBlock(VanillaBlockID.glass);
  Hammer.registerUpdateBlock(VanillaBlockID.glass_pane);
  Hammer.registerUpdateBlock(VanillaBlockID.hard_glass);
  Hammer.registerUpdateBlock(VanillaBlockID.hard_glass_pane);
  Hammer.registerUpdateBlock(VanillaBlockID.stained_glass);
  Hammer.registerUpdateBlock(VanillaBlockID.stained_glass_pane);
}
