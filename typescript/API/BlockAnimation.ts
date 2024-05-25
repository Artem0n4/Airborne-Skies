interface IAnimationParams {
    scale: int;
    material?: string;
}

class BlockAnimation {
  protected animation: Animation.Base;
  public static createRenderMesh(
    model: string,
    importParams: RenderMesh.ImportParams = {
      translate: [0.5, 0, 0.5],
      invertV: false,
      noRebuild: false,
    }
  ): RenderMesh {
    const mesh = new RenderMesh();
    mesh.importFromFile(
      __dir__ + "/resources/assets/models/animation/" + model + ".obj",
      "obj",
      importParams
    );
    return mesh;
  }
  constructor(
    pos: Vector,
    mesh: RenderMesh,
    texture: string,
    params: IAnimationParams = {
        scale: 1,
    }
  ) {
    const animation = new Animation.Base(pos.x, pos.y, pos.z);
    animation.describe({
      mesh,
      skin: "models/animation/" + texture,
      scale: params?.scale ?? 1,
      ...(params?.material && { material: params.material })
    });
    animation.setBlocklightMode();
    this.animation = animation;
  }
  public load(): void {
    this.animation.load();
  }
  public loadCustom(callback: () => void) {
    return this.animation.loadCustom(callback);
  }
  public destroy(): void {
    this.animation.destroy();
  }
  public rotate(x: int, y: int, z: int): void {
    this.animation.load();
    this.animation.transform().rotate(x, y, z);
    this.animation.refresh();
    return;
  }
  public setPos(x, y, z): void {
    return this.animation.setPos(x, y, z);
  }
  public refresh(): void {
    return this.animation.refresh();
  }
  public getAnimationBase(): Animation.Base {
    return this.animation;
  }
}
