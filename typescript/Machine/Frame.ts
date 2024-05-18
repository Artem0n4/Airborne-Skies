namespace Engineer {
  new SkyBlock("steam_frame", [
    {
      texture: [["steam_frame", 0]],
      name: "block.airborne_skies.steam_frame",
      inCreative: true,
    },
  ], BLOCK_TYPE_ALPHAMODE).create();

  const content = { elements: {} };

  for (let i = 0; i < 9; i++) {
    content.elements["slot_" + i] = {
      type: "slot",
    };
  }

  export const FrameUI = new UI.StandardWindow(content);

  export class Frame extends TileEntityBase {
  
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

