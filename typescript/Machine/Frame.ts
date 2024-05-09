namespace Engineer {
    export class Frame extends TileEntityBase {
       private static combinations: Map<string[], typeof BlockID[string]> = new Map();
       public static registerCombination(id: string, ...components: string[]) {
           Frame.combinations.set(components, BlockID[id]);
       };
       public onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, player: number): boolean {
           if(item.id === EMachineTool.HAMMER) {
            Game.message("DEBUG: " + ArrayHelper.flatAll(ObjectValues(SkyItem.components)))
            if(Mode.validate(player)) {
                if(ArrayHelper.flatAll(ObjectValues(SkyItem.components)).indexOf(item.id) > -1) {
                    //...
                    return true;
                }
            };
           }
       }
    }
}
