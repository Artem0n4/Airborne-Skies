class Press extends TileEntityBase {
  public static REDSTONE_SIGNAL_VALUE = 15;
  public static PROGRESS_MAX = 50;
  public static ANIMATION_VALUE_MAX = 64;
  public defaultValues = {
    active: false,
    progress: 0,
    animation_value: 0,
  };
  constructor(public strength: int) {
    super();
  }
  onRedstoneUpdate(signal: number): void {
    if (this.data.active !== true && signal === Press.REDSTONE_SIGNAL_VALUE) {
      this.data.active = true;
    } else {
      this.data.active = false;
    }
  }
  protected validateTable(tile: TileEntity) {
    if (
      this.blockSource.getBlockId(this.x, this.y - 1, this.z) ===
        TABLE.getID() &&
      tile
    ) {
      return true;
    }
  }
  protected decreaseProgress(tile: TileEntity) {
    if (tile.data.id === 0 && this.data.progress > 0) {
      this.data.progress--;
      Game.message("Minus: " + this.data.progress);
      return;
    }
    return;
  }
  protected increaseProgress(tile: TileEntity) {
    if (
      Table.recipe_list.some((value) => value.input === tile.data.id) &&
      this.data.progress < Press.PROGRESS_MAX
    ) {
      this.data.progress++;
      Game.message("Plus: " + this.data.progress);
      return;
    }
    return;
  }
  private particles() {
    for (let i = 0; i <= 6; i++) {
      Particles.addParticle(
        EParticleType.FLAME,
        this.x + 0.5,
        this.y - 1.9 + Math.random() / i,
        this.z + 0.5,
        0,
        0.1,
        0
      );
    }
  }
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
  }
  onTick(): void {
    if (this.data.active !== true) return;
    const tile = TileEntity.getTileEntity(this.x, this.y - 1, this.z);
    if (this.validateTable(tile)) {
      if (World.getThreadTime() % 5 === 0) {
        this.networkData.putInt("progress", this.data.progress);
        this.networkData.putInt("animation_value", this.data.animation_value);
        this.decreaseProgress(tile);
        tile.data.id !== 0 && this.increaseProgress(tile);
      }
      this.releaseRecipe(tile);
    }
  }

  clientLoad(): void {
    const mesh = new RenderMesh();
    mesh.importFromFile(
      __dir__ + "/resources/assets/models/press_piston.obj",
      "obj",
      {
        invertV: false,
        noRebuild: false,
      }
    );
    const animation = (this["animation"] = new Animation.Base(
      this.x + 0.5,
      this.y,
      this.z + 0.5
    ) as Animation.Base);
    animation.describe({
      mesh,
      skin: "models/press",
    });
    animation.setBlocklightMode();
  }
  clientUnload(): void {
    const animation = this["animation"] as Animation.Base;
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
