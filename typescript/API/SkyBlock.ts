class SkyBlock {
    protected type: string | Block.SpecialType;
    constructor(
      public id: string,
      public data: Block.BlockVariation[],
      type?: string | Block.SpecialType
    ) {
        this.type = type || "stone"
    }
    public create(): this {
      IDRegistry.genBlockID(this.id);
      Block.createBlock(this.id, this.data, this.type);
      return this;
    };
   public createWithRotation(): this {
  IDRegistry.genBlockID(this.id),
      Block.createBlockWithRotation(this.id, this.data, this.type)
      return this;
   };
    public info(text: string, translation?: {}): void {
      translation && Translation.addTranslation(text, translation);
      Item.registerNameOverrideFunction(this.id, function (item, name) {
        if (Entity.getSneaking(Player.getLocal()) === true)
          return (Translation.translate(name) + `\n${Native.Color.GOLD}` + Translation.translate(text));
        else
          return (
            Translation.translate(name) +
            `\n${Native.Color.GRAY}` +
            Translation.translate("message.airborne_skies.unshift")
          );
      });
    }
    public description(text: string, translation?: {}): void {
      translation &&  Translation.addTranslation(text, translation);
       Item.registerNameOverrideFunction(this.id, function (item, name) {
        return Translation.translate(name) + Native.Color.GOLD + Translation.translate(text);
      });
    }
    public setupModel(texture: string, model: string, scale: [int, int, int] = [1, 1, 1]) {
      const mesh = new RenderMesh();
      mesh.setBlockTexture(texture, 0);
      mesh.importFromFile(
        __dir__ + "/resources/models/" + (model || texture) + ".obj",
        "obj",
        {
          translate: [0.5, 0, 0.5],
          scale: scale,
          invertV: false,
          noRebuild: false,
        }
      );
      const render = new ICRender.Model();
      render.addEntry(new BlockRenderer.Model(mesh));
      BlockRenderer.setStaticICRender(BlockID[this.id], 0, render);
    };
  
    public getID() {
      return BlockID[this.id]
    } 
  }
  