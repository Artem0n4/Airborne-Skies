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
}