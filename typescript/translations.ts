const ru_RU = {
    "durability: ": "прочность: ",
    "message.airborne_skies.table_lock": "Это опасно!",
    "message.airborne_skies.debug.full_information": "Полная информация: ",
    "message.airborne_skies.debug.mode_list": "Список игроков с режимом инженера и их значения: ",
    "message.airborne_skies.debug.engineer_mode": "Булевое значение вашего режима инженера: ",
    "message.airborne_skies.debug.table_lock.false": "Стол разблокирован",
    "message.airborne_skies.debug.table_lock.true": "Стол заблокирован",
    "armor.airborne_skies.engineer_glasses": "Очки инженера",
    "message.airborne_skies.engineer_mode_false": `Кажется, у меня не получится. Мне нужны специальные очки`,
    "message.airborne_skies.engineer_glasses": "Увеличивают ваше мастерство!",
    "message.airborne_skies.hammer": "Позволяет мастерить!",
    "message.airborne_skies.unshift": "Используйте SHIFT для получения информации",
    "item.airborne_skies.engineer_hammer": "Инженерный молоток",
    "item.airborne_skies.debug_engineer_tool": "Предмет для отладки",
    "item.airborne_skies.metal_shears": "Ножницы по металлу",
    "block.airborne_skies.steam_frame": "Корпус",
    "block.airborne_skies.engineer_table": "Инженерный стол",
    "block.airborne_skies.engineer_press": "Механический пресс",
    "type: ": "тип: ",
    "brass": "латунь",
    "zinc": "цинк",
    "copper": "медь",
    "gold": "золото",
    "iron": "железо"
}

const en_US = {
    "message.airborne_skies.debug.full_information": "Full information: ",
    "message.airborne_skies.table_lock": "It is danger!",
    "message.airborne_skies.debug.mode_list": "Player engineer modes list: ",
    "message.airborne_skies.debug.engineer_mode": "Your engineer mode value: ",
    "armor.airborne_skies.engineer_glasses": "Engineer glasses",
    "message.airborne_skies.debug.table_lock.false": "Table is unlocked",
    "message.airborne_skies.debug.table_lock.true": "Table is locked",
    "message.airborne_skies.engineer_mode_false": "Switch on engineer mode!",
    "message.airborne_skies.engineer_glasses": "Increases your mastery!",
    "message.airborne_skies.hammer": "Can to create!",
    "message.airborne_skies.unshift": "Try use shift for get info",
    "item.airborne_skies.engineer_hammer": "Engineer Hammer",
    "item.airborne_skies.metal_shears": "Metal shears",
    "item.airborne_skies.debug_engineer_tool": "Item for debugging",
    "block.airborne_skies.engineer_press": "Mechanic press",
    "block.airborne_skies.engineer_table": "Engineer table",
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
