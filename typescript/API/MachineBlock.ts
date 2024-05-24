class MachineBlock extends SkyBlock {
  public static machine_list = [];
  constructor(id, data) {
    super(id, data);
    this.createWithRotation();
    Block.setDestroyTime(this.id, -1), this.destroyIfCondition();
    MachineBlock.machine_list.push(BlockID[this.id]);
  };
  public static takeParticles(coords: Callback.ItemUseCoordinates | Vector) {
    const particle_list = MathHelper.randomValue(
      EParticleType.REDSTONE,
      EParticleType.CRIT
    );
    for (let i = 0; i < 8; i++) {
      const velocity = Math.random() / i;
      Particles.addParticle(
        particle_list,
        coords.x + Math.random(),
        coords.y + Math.random(),
        coords.z + Math.random(),
        velocity,
        velocity,
        velocity
      );
    }
  }
  public static crossParticles(
    coords: Callback.ItemUseCoordinates | Vector
  ) {
        Particles.addParticle(
        ESkiesParticle.CROSS,
        coords.x + Math.random() / 10,
        coords.y + 0.9,
        coords.z + Math.random() / 10,
        0,
        0.01,
        0
      );
  }
  protected destroyIfCondition() {
    Block.registerClickFunction(this.id, (coords, item, block, player) => {
      const entity = new PlayerEntity(player);
      const carried_item = entity.getCarriedItem()
      if (
        Entity.getSneaking(player) === true &&
        carried_item.id === 0 || (carried_item.id === block.id && carried_item.count < 64)
      ) {
        const region = BlockSource.getDefaultForActor(player);
        entity.setCarriedItem({ id: block.id, count: 1, data: 0});
        region.setBlock(coords.x, coords.y, coords.z, 0, 0);
        MachineBlock.takeParticles(coords);
    }
  });

  };
  public setupLogic(prototype: TileEntityBase) {
      return TileEntity.registerPrototype(BlockID[this.id], prototype)
  };
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
    const model = ItemModel.getForWithFallback(BlockID[this.id], 0);
    model.setHandModel(
      this.model(model_name, import_params),
      "models/" + texture
    );
  }
  public setItemModel(model_name: string, texture: string, import_params?: RenderMesh.ImportParams) {
    const model = ItemModel.getForWithFallback(BlockID[this.id], 0);
    model.setModel(this.model(model_name, import_params), "models/" + texture);
  };
  public setInventoryModel(
    model_name: string,
    texture: string,
    import_params?: RenderMesh.ImportParams,
    rotation: [rx: int, ry: int, rz: int] = [0, 0, 0]
  ) {
    const mesh = this.model(model_name, import_params) as RenderMesh;
    mesh.rotate(rotation[0], rotation[1], rotation[2]);
    const model = ItemModel.getForWithFallback(BlockID[this.id], 0);
    model.setUiModel(mesh, "models/" + texture);
  };
  static {
    Callback.addCallback("DestroyBlockContinue", (coords, block, player) => {
      if (MachineBlock.machine_list.includes(block.id) && MathHelper.randomInt(0, 100) < 5)
        return MachineBlock.crossParticles(coords)
    });
  }
}

new MachineBlock("particle_collector", [
  {
    name: "block.airborne_skies.particle_collector",
    texture: [
      ["particle_collector", 0],
      ["particle_collector", 0],
      ["particle_collector", 0],
      ["particle_collector", 0],
      ["particle_collector", 0],
      ["particle_collector", 0],
    ],
    inCreative: true,
  },
]);
