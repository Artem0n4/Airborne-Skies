class SkyItem {

    public static components: Record<component, Array<int>> = {
        brass: [],
        iron: [],
        gold: [],
        copper: [],
        zinc: []
    };

    constructor(id: string, texture: string);
    constructor(id: string, texture: animation_texture_descriptor);
    constructor(public id: string, public texture?: item_texture<string | animation_texture_descriptor>, stack?: int) {
      texture ??= id;
      ItemRegistry.createItem(id, {
          name: "item.airborne_skies." + id,
          icon: typeof texture === 'string' ? texture : texture.texture,
          stack: stack || 64
      });
      texture instanceof Object && IAHelper.makeAdvancedAnim(ItemID[id], texture.texture, texture.time, range(texture.frame))
    };

    public setupComponentType(component: component) {
       SkyItem.components[component].push(ItemID[this.id]);
       Item.registerNameOverrideFunction(this.id, (item, translation, name) => {
        return Translation.translate(name) + "\n§7" + Translation.translate("type: ") + Translation.translate(component) 
       })
    };

    protected model(model, import_params) {
        const mesh = new RenderMesh();
        mesh.importFromFile(
          models_dir + model + ".obj",
          "obj",
          import_params || null
        );
        return mesh;
      };
    
      public setHandModel(model_name: string, texture: string, import_params?) {
        const model = ItemModel.getForWithFallback(ItemID[this.id], 0);
        model.setHandModel(
          this.model(model_name, import_params),
          "models/" + texture
        );
    
      }
      public setItemModel(model_name: string, texture: string, import_params?) {
        const model = ItemModel.getForWithFallback(ItemID[this.id], 0);
        model.setModel(
          this.model(model, import_params),
          "models/" + texture
        );
    
      }
      public setInventoryModel(
        model_name: string,
        texture: string,
        import_params?: {},
        rotation: [int, int, int] = [0, 0, 0]
      ) {
        const mesh = this.model(model_name, import_params) as RenderMesh;
        mesh.rotate(
          rotation[0],
          rotation[1],
          rotation[2]
        );
       const model = ItemModel.getForWithFallback(ItemID[this.id], 0);
       model.setUiModel(mesh, "models/" + texture);
      };

}