class SkyItem {
  public static components: Record<component, Array<int>> = {
    brass: [],
    iron: [],
    gold: [],
    copper: [],
    zinc: [],
  };

  constructor(id: string, texture: string);
  constructor(id: string, texture: animation_texture_descriptor);
  constructor(
    protected readonly id: string,
    protected readonly texture?: item_texture<string | animation_texture_descriptor>,
    stack?: int
  ) {
    texture ??= id;
    IDRegistry.genItemID(id);
    Item.createItem(
      id,
      "item.airborne_skies." + id,
      {
        name: typeof texture === "string" ? texture : texture.texture,
        meta: 0,
      },
      { stack: stack || 64 }
    );
    texture instanceof Object &&
      IAHelper.makeAdvancedAnim(
        ItemID[id],
        texture.texture,
        texture.time,
        range(texture.frame)
      );
  };
  public setupComponentType(component: component) {
    SkyItem.components[component].push(ItemID[this.id]);
    Item.registerNameOverrideFunction(this.id, (item, translation, name) => {
      return (
        Translation.translate(name) +
        "\n§7" +
        Translation.translate("type: ") +
        Translation.translate(component)
      );
    });
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
  };
  public setItemModel(model_name: string, texture: string, import_params?) {
    const model = ItemModel.getForWithFallback(ItemID[this.id], 0);
    model.setModel(this.model(model, import_params), "models/" + texture);
  };
  public setInventoryModel(
    model_name: string,
    texture: string,
    import_params?: {},
    rotation: [int, int, int] = [0, 0, 0]
  ) {
    const mesh = this.model(model_name, import_params) as RenderMesh;
    mesh.rotate(rotation[0], rotation[1], rotation[2]);
    const model = ItemModel.getForWithFallback(ItemID[this.id], 0);
    model.setUiModel(mesh, "models/" + texture);
  }
};


new SkyItem("brass_ingot", "brass_ingot").setupComponentType("brass");
new SkyItem("copper_ingot", "copper_ingot_as").setupComponentType("copper");
new SkyItem("zinc_ingot", "zinc_ingot");

Translation.addTranslation("item.airborne_skies.brass_ingot", {
  ru: Native.Color.GOLD + "Латунный слиток",
  en: Native.Color.GOLD + "Brass ingot"
});

Translation.addTranslation("item.airborne_skies.copper_ingot", {
  ru: Native.Color.GOLD + "Медный слиток",
  en:Native.Color.GOLD + "Copper ingot",
});

Translation.addTranslation("item.airborne_skies.zinc_ingot", {
  ru: Native.Color.AQUA + "Цинк",
  en:Native.Color.AQUA + "Zinc",
});