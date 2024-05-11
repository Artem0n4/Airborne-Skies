namespace Engineer {
  IDRegistry.genBlockID("steam_frame");
  Block.createBlockWithRotation(
    "steam_frame",
    [
      {
        texture: [["steam_frame", 0]],
        name: "block.airborne_skies.steam_frame",
        inCreative: true
      },
    ],
    "stone"
  );

  export interface IComponentDescriptor {
    result: int;
    inputs: int[];
  }

  export class Frame extends TileEntityBase {
    public defaultValues = {};
    onInit(): void {
      this.data.component_list = this.data.component_list || [];
    }
    private static combinations: Array<IComponentDescriptor> = [];
    public static registerCombination(id: string, ...components: string[]) {
      Frame.combinations.push({
        result: BlockID[id],
        inputs: components.map((v) => ItemID[v]),
      });
    };

    private static validateCombination() {}

    public onItemUse(
      coords: Callback.ItemUseCoordinates,
      item: ItemStack,
      player: int
    ): boolean {
      const component_id = ArrayHelper.flatAll(
        ObjectValues(SkyItem.components)
      );
      if (item.id === EMachineTool.HAMMER) {
        Game.message(
          "DEBUG: " + JSON.stringify(component_id)
        );
        if (Mode.validate(player)) {
          Game.message("Working");
          if (component_id.indexOf(item.id) > -1) {
            //...
     alert("совпало!")
            return true;
          }
        }
      }
      if (component_id.indexOf(item.id) > -1) {
        this.data.component_list.push({
          [IDRegistry.getNameByID(item.id)]: false,
        });
        Game.message(JSON.stringify(this.data.component_list));
      }
    }
  }

  TileEntity.registerPrototype(BlockID["steam_frame"], new Frame());
}
