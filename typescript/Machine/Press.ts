class Press extends TileEntityBase {
  public static REDSTONE_SIGNAL_VALUE = 15;
  public static PROGRESS_MAX = 50;
  public defaultValues = {
    active: false,
    progress: 0,
    animation_value: 0,
  };
  constructor(public strength: int) {
    super();
  };
  @BlockEngine.Decorators.NetworkEvent(Side.Client)
  protected movePiston(data: Vector): void {
    const animation = this["animation"] as BlockAnimation;
    animation && animation.setPos(data.x, data.y, data.z);
    animation.refresh();
  };
  public onRedstoneUpdate(signal: number): void {
    if (this.data.active === false && signal === Press.REDSTONE_SIGNAL_VALUE) {
      this.data.active = true;
    } else {
      this.data.active = false;
    }
  };
  protected validateTable(tile: TileEntity) {
    if (
      this.blockSource.getBlockId(this.x, this.y - 1, this.z) ===
        TABLE.getID() &&
      tile
    ) {
      return true;
    }
  };
  protected decreaseProgress(tile: TileEntity) {
    if (this.data.progress > 0) {
      this.data.progress--;
      this.sendPacket("movePiston", new Vector3(this.x, this.y + (this.data.progress / 60 * -1), this.z));
      return;
    }
  };
  protected increaseProgress(tile: TileEntity) {
    if (this.data.progress < Press.PROGRESS_MAX) {
      this.data.progress++;
      this.sendPacket("movePiston", new Vector3(this.x, this.y - this.data.progress / 60, this.z));
      return;
    }
  };
  private particles() {
    for (let i = 0; i <= 6; i++) {
      Particles.addParticle(
        EParticleType.FLAME,
        this.x + 0.5,
        this.y - 1.9 + Math.random() / i,
        this.z + 0.5,
        0.003,
        0.1,
        0.003
      );
    }
  };
  protected releaseRecipe(tile: TileEntity) {
    if (this.data.progress >= Press.PROGRESS_MAX) {
      for (const list of Table.recipe_list) {
        if (tile.data.id === list.input) {
          tile.data.id = list.output;
          this.particles();
          return tile.sendPacket("updateVisual", { id: list.output });
        }
      }
    }
  };
  onTick(): void {
    if (this.data.active === false) return;
    const tile = TileEntity.getTileEntity(this.x, this.y - 1, this.z);
    if (this.validateTable(tile)) {
      if (World.getThreadTime() % 1 === 0) {
        this.networkData.putInt("progress", this.data.progress);
        this.networkData.putInt("animation_value", this.data.animation_value);
        if (Table.recipe_list.some((value) => value.input === tile.data.id)) {
          return this.increaseProgress(tile), this.releaseRecipe(tile);
        } else {
          return this.decreaseProgress(tile);
        }
      }
    }
  };
  clientLoad(): void {
    const animation = (this["animation"] = new BlockAnimation(
      new Vector3(this.x, this.y, this.z),
      "press_piston",
      "press",
      {
        model: {
          invertV: false,
          noRebuild: false,
          translate: [0.5, 0, 0.5],
        },
      }
    ));
    animation.load();
  };
  clientUnload(): void {
    const animation = this["animation"] as BlockAnimation;
    animation && animation.destroy();
  };
};

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
