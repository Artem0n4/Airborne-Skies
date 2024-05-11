class MachineBlock extends SkyBlock {
  constructor(id, data) {
    super(id, data);
    this.createWithRotation();
    Block.setDestroyTime(this.id, -1), this.destroyIfCondition();
  }
  protected destroyIfCondition() {
    Block.registerClickFunction(this.id, (coords, item, block, player) => {
      const entity = new PlayerEntity(player);
      if (
        Entity.getSneaking(player) === true &&
        entity.getCarriedItem().id === 0
      ) {
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
        entity.setCarriedItem({ id: block.id, count: 1, data: 0 });
        region.setBlock(coords.x, coords.y, coords.z, 0, 0);
        Entity.setSneaking(player, false);
      }
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
