class Table extends TileEntityBase {
  public static recipe_list: { input: int; output: int; cutted: int }[] = [];
  /**register recipe without cutting */
  public static registerPressRecipe(input: int, output: int): void;
  /**register recipe includes cutted variant of plate*/
  public static registerPressRecipe(input: int, output: int, cutted: int): void;
  public static registerPressRecipe(
    input: int,
    output: int,
    cutted: int = 0
  ): void {
    Table.recipe_list.push({ input, output, cutted });
  }
  public defaultValues = {
    id: 0,
    lock: false,
  };
  public static validateItem(input_id: int): boolean {
    for (const list of Table.recipe_list) {
      if (
        list.input === input_id ||
        input_id === 0 ||
        input_id === Engineer.Mode.METAL_SHEARS.getID()
      )
        return true;
    }
    return false;
  }
  public static resultParticles(coords: Vector, player: int) {
    for (let i = 0; i <= 8; i++) {
      sendParticle(player, {
        type: EParticleType.SMOKE2,
        coords: coords,
        velocity: new Vector3(0, 0.003, 0),
      });
    }
  }
  @BlockEngine.Decorators.NetworkEvent(Side.Client)
  protected updateVisual(data: { id: int; rotation?: int }) {
    const animation = this["animation"] as Animation.Item;
    animation &&
      animation.describeItem({
        id: data.id,
        count: 1,
        data: 0,
        size: 0.4,
        rotation: [Math.PI / 2, 0, MathHelper.radian(data?.rotation || 0)],
      });
    animation.load();
  }
  public lockAction(player: int) {
    if (this.data.lock === false) return;
    const client = Network.getClientForPlayer(player);
    sendTipMessage(client, "message.airborne_skies.table_lock", [
      Native.Color.BOLD,
      Native.Color.RED,
    ]);
    return;
  }

  private updateId(id: int, rotation = MathHelper.randomInt(0, 360)) {
    this.data.id = id;
    this.sendPacket("updateVisual", { id, rotation });
    return;
  }
  protected plateManipulate(item: ItemInstance, player: int) {
    for (const list of Table.recipe_list) {
      if (list.output === this.data.id && list.cutted !== 0) {
        this.updateId(list.cutted);
        Table.resultParticles(
          new Vector3(this.x + 0.5, this.y + 0.2, this.z + 0.5),
          player
        );
        return;
      }
    }
  }
  protected itemManipulate(item: ItemInstance, player: PlayerEntity) {
    const hand_item = player.getCarriedItem().id;
    const table_item = this.data.id;
    if (hand_item !== 0 && table_item !== 0) {
      if (
        Table.recipe_list.some(
          (value) => value.output === table_item && value.output === hand_item
        )
      ) {
        player.addItemToInventory(new ItemStack(table_item, 1, 0));
        this.updateId(0);
      } else {
        player.decreaseCarriedItem(1);
        player.addItemToInventory(new ItemStack(table_item, 1, 0));
        this.updateId(hand_item);
      }
    } else if (hand_item === 0 && table_item !== 0) {
      player.setCarriedItem(new ItemStack(table_item, 1, 0));
      this.updateId(0);
    } else {
      this.updateId(hand_item);
      player.decreaseCarriedItem(1);
    }
    return;
  }
  public onItemUse(
    coords: Callback.ItemUseCoordinates,
    item: ItemStack,
    player: number
  ): any {
    if (
      !Table.validateItem(item.id) ||
      Entity.getSneaking(player) === true ||
      this.data.lock === true
    ) {
      sendParticle(player, {
        type: ESkiesParticle.CROSS,
        coords: new Vector3(coords.x + 0.5, coords.y + 0.2, coords.z + 0.5),
        velocity: new Vector3(0, 0.005, 0),
      });
      this.lockAction(player);
      return;
    }
    if (item.id === Engineer.Mode.METAL_SHEARS.getID()) {
      return this.plateManipulate(item, player);
    } else {
      return this.itemManipulate(item, new PlayerEntity(player));
    }
  }
  clientLoad(): void {
    const animation = (this["animation"] = new Animation.Item(
      this.x + 0.5,
      this.y + 0.2,
      this.z + 0.5
    ) as Animation.Item);
    animation.load();
  }
  clientUnload(): void {
    const animation = this["animation"] as Animation.Item;
    animation && animation.destroy();
  }
  destroy(): any {
    if (this.data.id === 0) return;
    this.sendPacket("updateVisual", { id: 0 });
    this.blockSource.spawnDroppedItem(
      this.x + 0.5,
      this.y + 0.5,
      this.z + 0.5,
      this.data.id,
      1,
      0
    );
    this.data.id = 0;
    return false;
  }
}

const TABLE = new MachineBlock("engineer_table", [
  {
    texture: [["stone_slab_top", 0]],
    name: "block.airborne_skies.engineer_table",
    inCreative: true,
  },
]);

TABLE.createWithRotation();
TABLE.setupModel("engineer_table", "table");
TABLE.setupLogic(new Table());
Table.registerPressRecipe(VanillaItemID.coal, VanillaItemID.diamond);
Table.registerPressRecipe(
  ItemID["brass_ingot"],
  ItemID["copper_ingot"],
  ItemID["zinc_ingot"]
);
