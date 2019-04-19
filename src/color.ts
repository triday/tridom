const ALL_STYLES: { [key: string]: string[] } = {
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
}
type ForeColor = 'white' | 'black' | 'red' | 'green' | 'blue' | 'yellow' | 'cyan' | 'magenta' | 'grey';
type BackColor = 'whiteBG' | 'blackBG' | 'redBG' | 'greenBG' | 'blueBG' | 'yellowBG' | 'cyanBG' | 'magentaBG' | 'greyBG';
type TextStyle='bold'|'italic'|'underline'|'strikethrough'|'inverse';
export enum Color {
    /**
     * 无色
     */
    none,
    /**
     * 白色
     */
    white,
    /**
     * 黑色
     */
    black,

    /**
     * 红色
     */
    red,
    /**
     * 绿色
     */
    green,
    /**
     * 蓝色
     */
    blue,
    /**
     * 黄色
     */
    yellow,
    /**
     * 青色
     */
    cyan,
    /**
     * 品红色
     */
    magenta,
    /**
     * 灰色
     */
    grey
}
export enum Style {
    /**
     * 粗体
     */
    bold,
    /**
     * 倾斜体
     */
    italic,
    /**
     * 下划线
     */
    underline,
    /**
     * 删除线
     */
    strikethrough,
    /**
     * 调换前景色和后景色
     */
    inverse
}
export function build(text: string, foreColor: Color, backColor?: Color, ...styles: Style[]) {
    let keys: string[] = styles.map(p => Style[p]);
    if (foreColor !== Color.none) keys.push(Color[foreColor]);
    if (typeof backColor !== "undefined" && backColor !== Color.none) {
        keys.push(`${Color[backColor]}BG`);
    }
    return keys.reduce((prev, styleKey) => {
        let [before, after] = ALL_STYLES[styleKey];
        return `${before}${prev}${after}`;
    }, text);
}
function hookConsole() {
    let classType: any = console;
    classType._info = console.info;
    classType._warn = console.warn;
    classType._error = console.error;
    classType._exception = console.exception;
    classType._debug = console.debug;
    classType._trace = console.trace;


    console.info = function (message: any, ...optionalParams: any[]) {
        if (typeof message === "string") {
            let styleMessage = build(message, Color.yellow, Color.green);
            classType._info(styleMessage, ...optionalParams);
        } else {
            classType._info(message, ...optionalParams);
        }
    }

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