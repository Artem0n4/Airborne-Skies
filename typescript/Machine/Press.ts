class Press extends TileEntityBase {
  public static REDSTONE_SIGNAL_VALUE = 15;
  public static PROGRESS_MAX = 80;
  public static PISTON_MODEL = BlockAnimation.createRenderMesh("press_piston");
  public defaultValues = {
    active: false,
    progress: 0,
    animation_value: 0,
  };
  constructor(public strength: int) {
    super();
  }
  @BlockEngine.Decorators.NetworkEvent(Side.Client)
  protected movePiston(data: Vector): void {
    const animation = this["animation"] as BlockAnimation;
    animation.setPos(data.x, data.y, data.z);
  }
  public onRedstoneUpdate(signal: number): void {
    if (this.data.active === false && signal === Press.REDSTONE_SIGNAL_VALUE) {
      this.data.active = true;
    } else {
      this.data.active = false;
    }
  }
  protected validateTable(tile: TileEntity) {
    return (
      this.blockSource.getBlockId(this.x, this.y - 1, this.z) ===
        TABLE.getID() && tile
    );
  }

  protected decreaseProgress(tile: TileEntity) {
    if (this.data.progress > 0) {
      this.data.progress--;
      this.sendPacket(
        "movePiston",
        new Vector3(this.x, this.y + (this.data.progress / 100) * -1, this.z)
      );
      if(tile.data.lock === true && this.data.progress < Press.PROGRESS_MAX / 4) {
        tile.data.lock = false;
      }
      return;
    }
  }
  protected increaseProgress(tile: TileEntity) {
    if (this.data.progress < Press.PROGRESS_MAX) {
      if(tile.data.lock === false) {
        tile.data.lock = true;
      }
      this.data.progress++;
      this.sendPacket(
        "movePiston",
        new Vector3(this.x, this.y - this.data.progress / 100, this.z)
      );
      return;
    }
  }
  private particles() {
    for (let i = 0; i <= 6; i++) {
      sendParticle(Player.getLocal(), {
        type: EParticleType.FLAME,
        coords: new Vector3(
          this.x + 0.5,
          this.y - 1.9 + Math.random() / i,
          this.z + 0.5
        ),
        velocity: new Vector3(0.003, 0.1, 0.003),
      });
    }
  }
  protected releaseRecipe(tile: TileEntity) {
    if (this.data.progress >= Press.PROGRESS_MAX) {
      for (const list of Table.recipe_list) {
        if (tile.data.id === list.input) {
          tile.data.id = list.output;
          this.particles();
          tile.sendPacket("updateVisual", {
            id: list.output,
            rotation: MathHelper.randomInt(1, 360),
          });
          return;
        }
      }
    }
  }
  onTick(): void {
    if (this.data.active === false) return;
    const tile = TileEntity.getTileEntity(this.x, this.y - 1, this.z);
    if (this.validateTable(tile)) {
      if (Table.recipe_list.some((value) => value.input === tile.data.id)) {
        return this.increaseProgress(tile), this.releaseRecipe(tile);
      } else {
        return this.decreaseProgress(tile);
      }
    }
  }
  clientLoad(): void {
    const animation = (this["animation"] = new BlockAnimation(
      new Vector3(this.x, this.y, this.z),
      Press.PISTON_MODEL,
      "press"
    ));
    animation.load();
  }
  clientUnload(): void {
    const animation = this["animation"] as BlockAnimation;
    animation && animation.destroy();
  }
}

const PRESS = new MachineBlock("engineer_press", [
  {
    texture: [["stone_slab_top", 0]],
    name: "block.airborne_skies.engineer_press",
    inCreative: true,
  },
]);

PRESS.createWithRotation();
PRESS.setupModel("press", "press_base");
PRESS.setupLogic(new Press(125));
PRESS.setInventoryModel("item/press_full", "animation/press", {
  translate: [0.5, 0.04, 0.5],
  scale: [0.7, 0.7, 0.7],
  invertV: false,
  noRebuild: false,
});
