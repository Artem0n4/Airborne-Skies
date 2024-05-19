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
    id: string,
    texture: item_texture<string | animation_texture_descriptor>,
    stack?: int
  );
  constructor(
    public readonly id: string,
    protected readonly texture?: item_texture<
      string | animation_texture_descriptor
    >,
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
  }
  public setupComponentType(component: component) {
    SkyItem.components[component].push(ItemID[this.id]);
    return this.setupDescription("type: " + component);
  }
  protected model(model: string, import_params: RenderMesh.ImportParams) {
    const mesh = new RenderMesh();
    mesh.importFromFile(
      models_dir + model + ".obj",
      "obj",
      import_params || null
    );
    return mesh;
  }
  public setHandModel(model_name: string, texture: string, import_params?: RenderMesh.ImportParams) {
    const model = ItemModel.getForWithFallback(ItemID[this.id], 0);
    model.setHandModel(
      this.model(model_name, import_params),
      "models/" + texture
    );
  }
  public setItemModel(model_name: string, texture: string, import_params?: RenderMesh.ImportParams) {
    const model = ItemModel.getForWithFallback(ItemID[this.id], 0);
    model.setModel(this.model(model_name, import_params), "models/" + texture);
  }
  public setInventoryModel(
    model_name: string,
    texture: string,
    import_params?: RenderMesh.ImportParams,
    rotation: [rx: int, ry: int, rz: int] = [0, 0, 0]
  ) {
    const mesh = this.model(model_name, import_params) as RenderMesh;
    mesh.rotate(rotation[0], rotation[1], rotation[2]);
    const model = ItemModel.getForWithFallback(ItemID[this.id], 0);
    model.setUiModel(mesh, "models/" + texture);
  }
  public onUse(
    callback: (
      coords: Callback.ItemUseCoordinates,
      item: ItemInstance,
      block: Tile,
      player: int
    ) => void
  ) {
    Item.registerUseFunction(this.id, (coords, item, block, player) =>
      callback(coords, item, block, player)
    );
  }
  public setupDescription(
    description: string,
    colors?: Native.Color | [name: Native.Color, description: Native.Color]
  ) {
    const _colors = {
      name: colors && Array.isArray(colors) ? colors[0] : Native.Color.WHITE,
      description: colors && Array.isArray(colors) ? colors[1] : colors || Native.Color.GRAY,
    };
    Item.registerNameOverrideFunction(this.id, (item, translation, name) => {
      return (
        _colors.name + Translation.translate(name) +
        "\n" +
        _colors.description +
        Translation.translate(description)
      );
    });
  };
  public getID() {
    return ItemID[this.id]
  }
}

new SkyItem("brass_ingot", "brass_ingot").setupComponentType("brass");
new SkyItem("copper_ingot", "copper_ingot_as").setupComponentType("copper");
new SkyItem("zinc_ingot", "zinc_ingot").onUse((c, i, b, p) =>
  Engineer.Mode.validate(p, () => {
    Game.message("Work engineer mode");
  })
); //It is work, so good

Translation.addTranslation("item.airborne_skies.brass_ingot", {
  ru: Native.Color.GOLD + "Латунный слиток",
  en: Native.Color.GOLD + "Brass ingot",
});

Translation.addTranslation("item.airborne_skies.copper_ingot", {
  ru: Native.Color.GOLD + "Медный слиток",
  en: Native.Color.GOLD + "Copper ingot",
});

Translation.addTranslation("item.airborne_skies.zinc_ingot", {
  ru: Native.Color.AQUA + "Цинк",
  en: Native.Color.AQUA + "Zinc",
});
