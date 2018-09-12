"use strict"

const DefaultSettings = {
    "enabled": true,
    "items": [
        6452, 6453, 6454, 6522, 6523, 6524, 6525, //連合補給刻印
        70060, 70061, 70062, 70046, 80078, 80079, 80089, 80090 //祝祭
    ]
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
    if (from_ver === undefined) {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings);
    } else if (from_ver === null) {
        // No config file exists, use default settings
        return DefaultSettings;
    } else {
        if(from + 1 < to) {
            settings = MigrateSettings(from_ver, from_ver + 1, settings);
            return MigrateSettings(from_ver + 1, to_ver, settings);
        }

        switch (to) {
            default:
                settings = Object.assign(DefaultSettings, settings);
                break;
        }

        return settings;
    }
}
