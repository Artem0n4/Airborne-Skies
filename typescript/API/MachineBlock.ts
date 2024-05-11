class MachineBlock extends SkyBlock {
    public static machine_list = []
  constructor(id, data) {
    super(id, data);
    this.createWithRotation();
    Block.setDestroyTime(this.id, -1), 
    this.destroyIfCondition();
    MachineBlock.machine_list.push(BlockID[this.id])
  }; 
 public static particles (coords: Callback.ItemUseCoordinates) {
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
 }

  protected destroyIfCondition() {
    Block.registerClickFunction(this.id, (coords, item, block, player) => {
      const entity = new PlayerEntity(player);
      if (
        Entity.getSneaking(player) === true &&
        entity.getCarriedItem().id === 0
      ) {
        const region = BlockSource.getDefaultForActor(player);
        entity.setCarriedItem({ id: block.id, count: 1, data: 0 });
        region.setBlock(coords.x, coords.y, coords.z, 0, 0);
        Entity.setSneaking(player, false);
        return MachineBlock.particles(coords)
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

Callback.addCallback("BuildBlock", (coords,block,player) => {
    Game.message(JSON.stringify(MachineBlock.machine_list) + "\n" + block.id + "\n" + MachineBlock.machine_list.includes(block.id))
    if(MachineBlock.machine_list.indexOf(block.id) > -1) return MachineBlock.particles(coords);
})