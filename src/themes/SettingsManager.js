/**
 * Brackets Themes Copyright (c) 2014 Miguel Castillo.
 *
 * Licensed under MIT
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, define, require */

define(function (require) {
    "use strict";

    var _                   = require("thirdparty/lodash"),
        PreferencesManager  = require("preferences/PreferencesManager"),
        DefaultSettings     = require("themes/DefaultSettings"),
        SettingsDialog      = require("themes/ThemeSettingsDialog"),
        PREFERENCES_KEY     = "brackets-themes",
        _settings           = PreferencesManager.getExtensionPrefs(PREFERENCES_KEY);


    function Settings() {
    }

    Settings.open = function() {
        SettingsDialog.open(Settings);
    };

    Settings.close = function() {
        SettingsDialog.close();
    };

    Settings.getValue = function() {
        return _settings.get.apply(_settings, arguments);
    };

    Settings.setValue = function() {
        _settings.set.apply(_settings, arguments);
        $(Settings).trigger("change", arguments);
        $(Settings).trigger("change:" + arguments[0], [arguments[1]]);
    };

    Settings.getAll = function() {
        var pathLength = _settings.prefix.length;
        var prefix = _settings.prefix;

        return _.transform(_settings.base._scopes.user.data, function(result, value, key) {
            if ( key.indexOf(prefix) === 0 ) {
                result[key.substr(pathLength)] = value;
            }
        });
    };

    Settings.reset = function() {
        Settings.setValue("theme",  DefaultSettings.theme);
        Settings.setValue("fontSize", DefaultSettings.fontSize + "px");
        Settings.setValue("lineHeight", DefaultSettings.lineHeight);
        Settings.setValue("fontType", DefaultSettings.fontType);
        Settings.setValue("customScrollbars", DefaultSettings.customScrollbars);
    };


    function init() {
        return PreferencesManager.ready.then(function() {
            if ( Settings.getValue("theme") === undefined ) {
                Settings.setValue("theme",  DefaultSettings.theme);
            }

            if ( Settings.getValue("fontSize") === undefined ) {
                Settings.setValue("fontSize", DefaultSettings.fontSize + "px");
            }

            if ( Settings.getValue("lineHeight") === undefined ) {
                Settings.setValue("lineHeight", DefaultSettings.lineHeight);
            }

            if ( Settings.getValue("fontType") === undefined ) {
                Settings.setValue("fontType", DefaultSettings.fontType);
            }

            if ( Settings.getValue("customScrollbars") === undefined ) {
                Settings.setValue("customScrollbars", DefaultSettings.customScrollbars);
            }

            return Settings;
        }).promise();
    }


    Settings.ready = init();
    return Settings;
});
