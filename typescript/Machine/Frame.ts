namespace Engineer {
  new SkyBlock("steam_frame", [
    {
      texture: [["steam_frame", 0]],
      name: "block.airborne_skies.steam_frame",
      inCreative: true,
    },
  ]).create();

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
      return FrameUI;
    }
    public defaultValues = {
      slot: 0, //0 -> 8
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
    }

    private static validateCombination() {}

    public onItemUse(
      coords: Callback.ItemUseCoordinates,
      item: ItemStack,
      player: int
    ): any {
      const component_id = ArrayHelper.flatAll(
        ObjectValues(SkyItem.components)
      );
      const valid = Mode.validate(player);
      if (item.id === EMachineTool.HAMMER) {
        if (!!valid) {
          if (component_id.includes(item.id)) {
            let slot: ItemInstance;
            let index: int;
            for (let i = 0; i < 9; i++) {
              slot = this.container.getSlot("slot_" + i);
              index = i;
              Game.message("slot id:" + slot.id + " | num: " + i);
              if (slot.count === 0) break;
            }
            slot &&
              index &&
              this.container.setSlot(
                "slot_" + index,
                slot.id,
                slot.count,
                slot.data,
                slot.extra
              );

            return;
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
    public static setModel() {
      const height = 3 / 16;
      const model = BlockRenderer.createModel();
      const render = new ICRender.Model();
      const frame_shape = new ICRender.CollisionShape();
      const entry = frame_shape.addEntry();

      model.addBox(0, 0, 0, 1, height, 1, "frame_as", 0);
      entry.addBox(0, 0, 0, 1, height, 1);
      render.addEntry(model);
      return (
        BlockRenderer.setCustomCollisionShape(BlockID["steam_frame"], -1, frame_shape),
        BlockRenderer.setStaticICRender(BlockID["steam_frame"], -1, render)
      );
    }
  }

  TileEntity.registerPrototype(BlockID["steam_frame"], new Frame());
  Frame.setModel();
}

