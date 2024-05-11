class MachineBlock extends SkyBlock {
  constructor(id: string, data: Block.BlockVariation[]) {
    super(id, data);
  }
  protected destroyIfCondition() {
    Block.registerClickFunction(this.id, (coords, item, block, player) => {
      if (Entity.getSneaking(player) === true) {
        alert("Debug")
        const region = BlockSource.getDefaultForActor(player);
        for (let i = 0; i < 8; i++) {
          const vel = Math.random() / i;
          Particles.addParticle(
            EParticleType.CRIT,
            coords.x + Math.random(),
            coords.y + Math.random(),
            coords.z + Math.random(),
            vel,
            vel,
            vel
          );
        }
        const entity = new PlayerEntity(player);
        entity.getCarriedItem().id === 0
          ? entity.setCarriedItem({ id: block.id, count: 1, data: 0 })
          : entity.addItemToInventory({
              id: block.id,
              count: 1,
              data: 0,
            });
            region.destroyBlock(coords.x, coords.y, coords.z, false);
        Entity.setSneaking(player, false);
      }
    });
  }
  public createWithRotation(): this {
    super.createWithRotation();
    Block.setDestroyTime(this.id, -1);
    this.destroyIfCondition();
    return this;
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
  },
]).createWithRotation();
