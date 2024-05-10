namespace Engineer {
    export class Frame extends TileEntityBase {
        public defaultValues = {
            
        };
        onInit(): void {
            this.data.component_list = this.data.component_list || [];
        }
       private static combinations: Map<string[], typeof BlockID[string]> = new Map();
       public static registerCombination(id: string, ...components: string[]) {
           Frame.combinations.set(components, BlockID[id]);
       };
       private static validateCombination() {
       };

       public onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, player: int): boolean {
        const component_id = ArrayHelper.flatAll(ObjectValues(SkyItem.components))
           if(item.id === EMachineTool.HAMMER) {
            Game.message("DEBUG: " + ArrayHelper.flatAll(ObjectValues(SkyItem.components)))
            if(Mode.validate(player)) {
                Game.message("Working")
                if(component_id.indexOf(item.id) > -1) {
                    //...
   
                    return true;
                }
            };
           };
           if(component_id.indexOf(item.id) > -1) {
            this.data.component_list.push({[IDRegistry.getNameByID(item.id)]: false});
            Game.message(JSON.stringify(this.data.component_list))
           }
       }
    };

    IDRegistry.genBlockID("steam_frame");
    BlockRegistry.createBlockWithRotation("steam_frame", [{
       texture: [["steam_frame", 0]],
       name: "block.airborne_skies.steam_frame",
    }], "stone");
    TileEntity.registerPrototype(BlockID["steam_frame"], new Frame())
}
