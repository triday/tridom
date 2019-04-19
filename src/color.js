"use strict";
exports.__esModule = true;
var ALL_STYLES = {
    'bold': ['\x1B[1m', '\x1B[22m'],
    'italic': ['\x1B[3m', '\x1B[23m'],
    'underline': ['\x1B[4m', '\x1B[24m'],
    'inverse': ['\x1B[7m', '\x1B[27m'],
    'strikethrough': ['\x1B[9m', '\x1B[29m'],
    'white': ['\x1B[37m', '\x1B[39m'],
    'grey': ['\x1B[90m', '\x1B[39m'],
    'black': ['\x1B[30m', '\x1B[39m'],
    'blue': ['\x1B[34m', '\x1B[39m'],
    'cyan': ['\x1B[36m', '\x1B[39m'],
    'green': ['\x1B[32m', '\x1B[39m'],
    'magenta': ['\x1B[35m', '\x1B[39m'],
    'red': ['\x1B[31m', '\x1B[39m'],
    'yellow': ['\x1B[33m', '\x1B[39m'],
    'whiteBG': ['\x1B[47m', '\x1B[49m'],
    'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
    'blackBG': ['\x1B[40m', '\x1B[49m'],
    'blueBG': ['\x1B[44m', '\x1B[49m'],
    'cyanBG': ['\x1B[46m', '\x1B[49m'],
    'greenBG': ['\x1B[42m', '\x1B[49m'],
    'magentaBG': ['\x1B[45m', '\x1B[49m'],
    'redBG': ['\x1B[41m', '\x1B[49m'],
    'yellowBG': ['\x1B[43m', '\x1B[49m']
};
var Color;
(function (Color) {
    /**
     * 无色
     */
    Color[Color["none"] = 0] = "none";
    /**
     * 白色
     */
    Color[Color["white"] = 1] = "white";
    /**
     * 黑色
     */
    Color[Color["black"] = 2] = "black";
    /**
     * 红色
     */
    Color[Color["red"] = 3] = "red";
    /**
     * 绿色
     */
    Color[Color["green"] = 4] = "green";
    /**
     * 蓝色
     */
    Color[Color["blue"] = 5] = "blue";
    /**
     * 黄色
     */
    Color[Color["yellow"] = 6] = "yellow";
    /**
     * 青色
     */
    Color[Color["cyan"] = 7] = "cyan";
    /**
     * 品红色
     */
    Color[Color["magenta"] = 8] = "magenta";
    /**
     * 灰色
     */
    Color[Color["grey"] = 9] = "grey";
})(Color = exports.Color || (exports.Color = {}));
var Style;
(function (Style) {
    /**
     * 粗体
     */
    Style[Style["bold"] = 0] = "bold";
    /**
     * 倾斜体
     */
    Style[Style["italic"] = 1] = "italic";
    /**
     * 下划线
     */
    Style[Style["underline"] = 2] = "underline";
    /**
     * 删除线
     */
    Style[Style["strikethrough"] = 3] = "strikethrough";
    /**
     * 调换前景色和后景色
     */
    Style[Style["inverse"] = 4] = "inverse";
})(Style = exports.Style || (exports.Style = {}));
function build(text, foreColor, backColor) {
    var styles = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        styles[_i - 3] = arguments[_i];
    }
    var keys = styles.map(function (p) { return Style[p]; });
    if (foreColor !== Color.none)
        keys.push(Color[foreColor]);
    if (typeof backColor !== "undefined" && backColor !== Color.none) {
        keys.push(Color[backColor] + "BG");
    }
    return keys.reduce(function (prev, styleKey) {
        var _a = ALL_STYLES[styleKey], before = _a[0], after = _a[1];
        return "" + before + prev + after;
    }, text);
}
exports.build = build;
function hookConsole() {
    var classType = console;
    classType._info = console.info;
    classType._warn = console.warn;
    classType._error = console.error;
    classType._exception = console.exception;
    classType._debug = console.debug;
    classType._trace = console.trace;
    console.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (typeof message === "string") {
            var styleMessage = build(message, Color.yellow, Color.green);
            classType._info.apply(classType, [styleMessage].concat(optionalParams));
        }
        else {
            classType._info.apply(classType, [message].concat(optionalParams));
        }
    };
}
hookConsole();
console.info(2, 5, 8);
// console.log(build("Color.black", Color.black));
// console.log(build("Color.white", Color.white));
// console.log(build("Color.red", Color.red));
// console.log(build("Color.green", Color.green));
// console.log(build("Color.blue", Color.blue));
// console.log(build("Color.cyan", Color.cyan));
// console.log(build("Color.magenta", Color.magenta));
// console.log(build("Color.grey", Color.grey));
// console.log(build("Color.black", Color.red, Color.black));
// console.log(build("Color.white", Color.red, Color.white));
// console.log(build("Color.red", Color.none, Color.red));
// console.log(build("Color.green", Color.none, Color.green));
// console.log(build("Color.blue", Color.none, Color.blue));
// console.log(build("Color.cyan", Color.none, Color.cyan));
// console.log(build("Color.magenta", Color.none, Color.magenta));
// console.log(build("Color.grey", Color.red, Color.grey));
// console.log(build("Color.black", Color.red, Color.black, Style.bold));
// console.log(build("Color.white", Color.red, Color.white, Style.inverse));
// console.log(build("Color.red", Color.none, Color.red, Style.italic));
// console.log(build("Color.green", Color.none, Color.green, Style.strikethrough));
// console.log(build("Color.blue", Color.none, Color.blue, Style.underline));
// console.log(build("Color.cyan", Color.none, Color.cyan, Style.underline, Style.strikethrough));
// console.log(build("Color.magenta", Color.none, Color.magenta, Style.italic, Style.underline, Style.strikethrough));
// console.log(build("Color.grey", Color.red, Color.grey));
