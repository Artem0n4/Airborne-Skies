interface IAnimationParams {
  model: RenderMesh.ImportParams;
  animation?: {
    scale: int;
    material?: string;
  };
}

class BlockAnimation {
  protected animation: Animation.Base;
  constructor(
    pos: Vector,
    model: string,
    texture: string,
    params: IAnimationParams = {
      model: {
        invertV: false,
        noRebuild: false,
      },
      animation: {
        scale: 1,
      },
    }
  ) {
    const mesh = new RenderMesh();
    mesh.importFromFile(
      __dir__ + "/resources/assets/models/animation/" + model + ".obj",
      "obj",
      params.model
    );
    const animation = new Animation.Base(pos.x, pos.y, pos.z);
    animation.describe({
      mesh,
      skin: "models/animation/" + texture,
      scale: params?.animation?.scale ?? 1,
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
