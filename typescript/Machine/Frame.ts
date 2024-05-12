namespace Engineer {

  new SkyBlock(
    "steam_frame",
    [
      {
        texture: [["steam_frame", 0]],
        name: "block.airborne_skies.steam_frame",
        inCreative: true
      },
    ]
  ).create();

  
  const content = { elements: {} };

  for (let i = 0; i < 9; i++) {
    content.elements["slot_" + i] = {
      type: "slot",
    };
  }

  export const FrameUI = new UI.StandardWindow(content);



  export interface IComponentDescriptor {
    result: int;
    inputs: int[];
  }

  export class Frame extends TileEntityBase {
    public override useNetworkItemContainer: true;
    public getScreenByName() {
        return FrameUI
    }
    public defaultValues = {
        slot: 0 //0 -> 8
    };
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
    ): any {
      const component_id = ArrayHelper.flatAll(
        ObjectValues(SkyItem.components)
      );
      if (item.id === EMachineTool.HAMMER) {
        if (Mode.validate(player)) {
          if (component_id.indexOf(item.id) > -1) {
        const container = this.container.getSlot(this.data.slot);
        //...
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
