const ru_RU = {
    "armor.airborne_skyes.engineer_glasses": "Очки инженера",
    "message.airborne_skyes.engineer_mode_false": `Я слишком косолап, и могу случайно что-нибудь сломать!
     Возможно, очки инженера поправят ситуацию`,
    "message.airborne_skyes.engineer_glasses": "Увеличивают ваше мастерство!",
    "message.airborne_skies.hammer": "Позволяет мастерить!",
    "message.airborne_skies.unshift": "Используйте SHIFT для получения информации",
    "item.airborne_skies.engineer_hammer": "Инженерный молоток",
    "item.airborne_skies.metal_shears": "Ножницы по металлу",
    "block.airborne_skies.steam_frame": "Корпус"
}

const en_US = {
    "armor.airborne_skyes.engineer_glasses": "Engineer glasses",
    "message.airborne_skyes.engineer_mode_false": "Switch on engineer mode!",
    "message.airborne_skyes.engineer_glasses": "Increases your mastery!",
    "message.airborne_skies.hammer": "Can to create!",
    "message.airborne_skies.unshift": "Try use shift for get info",
    "item.airborne_skies.engineer_hammer": "Engineer Hammer",
    "item.airborne_skies.metal_shears": "Metal shears",
    "block.airborne_skies.steam_frame": "Frame"
}

for(const i in ru_RU) {
 Translation.addTranslation(i, {
    ru: ru_RU[i]
 })
}

//
// const DIRS = FileTools.GetListOfFiles(
//     __dir__ + "resources/translations/",
//     ""
//   );
