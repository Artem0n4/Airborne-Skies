IMPORT("BlockEngine");
IMPORT("ItemAnimHelper")
type int = number;
type universal<T extends string | int> = T
type animation_texture_descriptor = {texture: string, frame: int, time?: int}
type item_texture<T extends string | animation_texture_descriptor> = T;
type component = 'brass' | 'iron' | 'gold' | 'copper' | 'zinc'

const models_dir = __dir__ + "resources/assets/models/";

enum EMachineTool {
    HAMMER = ItemID["engineer_hammer"],
};

enum EDestroyLevel {
    HAND = 0,
    WOOD = 1,
    STONE = 2,
    IRON = 3,
    DIAMOND = 4
};

const cross = Particles.registerParticleType({
    texture: "cross",
    render: 2,
    size: [1.7, 2],
    lifetime: [40, 60],
    animators: {
        alpha: {
            fadeIn: .1, fadeOut: .2
        },
        size: {
            fadeOut: 0, fadeIn: 0, start: 0.2, end: 0
        }
    }
});

enum ESkiesParticle {
    CROSS = cross as int
};

const BLOCK_TYPE_ALPHAMODE = Block.createSpecialType({
    explosionres: 0.5,
    lightopacity: 1,
    destroytime: .4,
    renderlayer: 1,
});