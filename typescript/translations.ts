const ru_RU = {
    "armor.airborne_skyes.engineer_glasses": "Очки инженера",
    "message.airborne_skyes.engineer_mode_false": "Активируйте режим инженера!",
    "message.airborne_skyes.engineer_glasses": "Увеличивает ваше мастерство!"
}

const en_US = {
    "armor.airborne_skyes.engineer_glasses": "Engineer glasses",
    "message.airborne_skyes.engineer_mode_false": "Switch on engineer mode!",
    "message.airborne_skyes.engineer_glasses": "Increases your mastery!",
}

for(const i in ru_RU) {
 Translation.addTranslation(i, {
    ru: ru_RU[i]
 })
}

// const DIRS = FileTools.GetListOfFiles(
//     __dir__ + "resources/translations/",
//     ""
//   );
