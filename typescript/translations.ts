const ru_RU = {
    "armor.airborne_skyes.engineer_glasses": "Очки инженера",
    "message.airborne_skyes.engineer_mode_false": "Активируйте режим инженера!",
    "message.airborne_skyes.engineer_glasses": "Увеличивают ваше мастерство!",
    "message.airborne_skies.hammer": "Позволяют мастерить!",
    "item.airborne_skies.engineer_hammer": "Инженерный молот",
    "block.airborne_skies.steam_frame": "Корпус"
}

const en_US = {
    "armor.airborne_skyes.engineer_glasses": "Engineer glasses",
    "message.airborne_skyes.engineer_mode_false": "Switch on engineer mode!",
    "message.airborne_skyes.engineer_glasses": "Increases your mastery!",
    "message.airborne_skies.hammer": "Can to create!",
    "item.airborne_skies.engineer_hammer": "Engineer Hammer",
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
