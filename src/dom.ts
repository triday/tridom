import * as utils from './utils';
type ATTR_SETVALUE_TYPE = string | number | boolean | null;
type ATTR_GETVALUE_TYPE = string | null;
export default class DomWarpper {
    private elements: Element[] = [];
    constructor(warpper: DomWarpper);
    constructor(element: Element | null);
    constructor(elements: ArrayLike<Element>);
    constructor(selector: string, context?: Element | DomWarpper);
    constructor(elementString: string, ownerDocument?: Document);
    constructor(elementString: string, attributes?: { [key: string]: ATTR_SETVALUE_TYPE });
    constructor(arg1: any, arg2?: any) {
        if (arg1 instanceof DomWarpper) {
            this.elements = [...arg1.elements];
        } else if (arg1 instanceof Element) {
            this.elements = [arg1];
        } else if (arg1 === null) {
            this.elements = []
        } else if (utils.isArrayLike<Element>(arg1)) {
            this.elements = utils.uniqueItems(arg1);
        } else if (arg2 instanceof Element) {
            this.elements = utils.getElementsBySelector(arg1, arg2);
        } else if (arg2 instanceof DomWarpper) {
            this.elements = utils.getElementsBySelector(arg1, arg2.elements[0]);
        } else if (arg2 instanceof Document) {
            this.elements = utils.parseElements(arg1, arg2);
        } else if (typeof arg2 === "object" && arg2 !== null) {
            this.elements = utils.parseElements(arg1);
            //set attributes
            this.attr(arg2);
        } else if (utils.isElementString(arg1)) {
            this.elements = utils.parseElements(arg1);
        } else {
            this.elements = utils.getElementsBySelector(arg1);
        }
    }




    //#region 基础方法
    /**
     * 获取选择的所有元素
     */
    public getElements(): Readonly<Element[]> {
        return this.elements.slice();
    }
    /**
     * 根据回调函数遍历处理每一个元素
     * @param func 回调函数
     */
    public each<E extends Element>(func: (item: E, index: number, array: E[]) => void): DomWarpper {
        if (func) {
            this.elements.forEach(func);
        }
        
        return this;
    }
    /**
     * 根据取值函数获取第一个元素的值
     * @param func 取值函数
     */
    public firstValue<T>(func: (item: Element, index: number, array: Element[]) => T): T | null {
        if (this.elements.length > 0) {
            return func(this.elements[0], 0, this.elements);
        }
        return null;
    }
    /**
     * 根据取值函数获取最后一个元素的值。
     * @param func 取值函数
     */
    public lastValue<T, E extends Element =Element>(func: (item: E, index: number, array: E[]) => T): T | null {
        if (this.elements.length > 0) {
            let index = this.elements.length - 1;
            return func(this.elements[index] as E, index, this.elements as E[]);
        }
        return null;

        let v = this.lastValue<string, HTMLElement>(p => p.innerText)
    }
    /**
     * 根据取值函数映射所有元素的值。
     * @param func 取值函数
     */
    public mapValues<T>(func: (item: Element, index: number, array: Element[]) => T): T[] {
        return this.elements.map(func);
    }
    //#endregion

    public merge(other: DomWarpper): DomWarpper {
        let othersElements = other ? other.elements : [];
        return new DomWarpper([...this.elements, ...othersElements]);
    }
    public clone(): DomWarpper {
        return new DomWarpper([...this.elements]);
    }

    //#region add
    /**
     * 添加元素到匹配的元素集合。
     * @param warpper 
     */
    public add(warpper: DomWarpper): DomWarpper;
    public add(element: Element | null): DomWarpper;
    public add(elements: ArrayLike<Element>): DomWarpper;
    public add(selector: string, context?: Element | DomWarpper): DomWarpper;
    public add(elementString: string, ownerDocument?: Document): DomWarpper;
    public add(elementString: string, attributes?: { [key: string]: ATTR_SETVALUE_TYPE }): DomWarpper;

    public add(arg1: any, arg2?: any): DomWarpper {
        let other = new DomWarpper(arg1, arg2);
        return this.merge(other);
    }
    //#endregion


    //#region 串写方法
    public first(): DomWarpper {

        return new DomWarpper(this.elements.slice(0, 1));
    }
    public last(): DomWarpper {
        return new DomWarpper(this.elements.slice(-1));
    }
    public parent(): DomWarpper {
        let parents = this.mapValues(p => p.parentElement).filter(p => p !== null) as HTMLElement[];
        return new DomWarpper(parents);
    }

    //#endregion



    //#region attr
    /**
     * 获取匹配的元素集合中的第一个元素的属性的值。
     * @param attributeName 要获取的属性名称  
     */
    public attr(attributeName: string): ATTR_GETVALUE_TYPE;
    /**
     * 设置每一个匹配元素的指定属性的值。
     * @param attributeName 要设置的属性名称 
     * @param attributeValue 要设置的属性的值 
     */
    public attr(attributeName: string, attributeValue: ATTR_SETVALUE_TYPE): DomWarpper;
    /**
     * 设置每一个匹配元素的属性为指定的键值对对象。
     *  @param attributes 要设置的属性的键值对
     */
    public attr(attributes: { [key: string]: ATTR_SETVALUE_TYPE }): DomWarpper;
    /**
     * 根据回调函数的返回值设置每一个匹配元素的指定属性。
     * @param attributeName 要设置的属性名称 
     * @param callback 要设置的属性值的回调函数
     */
    public attr(attributeName: string, callback: (index: number, oldValue: ATTR_GETVALUE_TYPE) => ATTR_SETVALUE_TYPE): DomWarpper;

    public attr(arg1: any, arg2?: any): any {
        if (typeof arg2 === "undefined") {
            if (typeof arg1 === "string") {
                return this.firstValue(p => p.getAttribute(arg1));
            } else if (typeof arg1 === "object") {
                return this.each(ele => {
                    setElementAttributes(ele, arg1);
                })
            }
        } else if (typeof arg2 === "function") {
            return this.each((ele, index) => {
                let oldValue = ele.getAttribute(arg1);
                let newValue = arg2(index, oldValue);
                setElemetAttribute(ele, arg1, newValue);
            });
        } else {
            return this.each((ele) => {
                setElemetAttribute(ele, arg1, arg2);
            });
        }
        function setElemetAttribute(ele: Element, name: string, value: ATTR_SETVALUE_TYPE) {
            if (value === null) {
                ele.removeAttribute(name);
            } else {
                ele.setAttribute(name, String(value));
            }
        }
        function setElementAttributes(ele: Element, attributes: { [key: string]: ATTR_SETVALUE_TYPE }) {
            Object.keys(attributes || {}).forEach(p => {
                setElemetAttribute(ele, p, attributes[p])
            });
        }
    }
    //#endregion



    //#region text
    public text(): string | null;
    public text(innerText: string): DomWarpper;
    public text(innerText?: string): string | null | DomWarpper {
        if (typeof innerText === "undefined") {
            return this.firstValue(p => p.innerText);
        } else {
            return this.each(p => p.innerText = innerText);
        }
    }
    //#endregion

    //#region html
    public html(): string | null;
    public html(innerHTML: string): DomWarpper;
    public html(innerHTML?: string): string | null | DomWarpper {
        if (typeof innerHTML === "undefined") {
            return this.firstValue(p => p.innerHTML);
        } else {
            return this.each(p => p.innerHTML = innerHTML);
        }
    }
    //#endregion

    //#region val
    public val(): string | null;
    public val(valueText: string): DomWarpper;
    public val(valueText?: string): string | null | DomWarpper {
        if (typeof valueText === "undefined") {
            return this.firstValue(p => (p as HTMLInputElement).value);
        } else {
            return this.each(p => (p as HTMLInputElement).value = valueText);
        }
    }
    //#endregion

    //#region css
    public css(propertyname: keyof CSSStyleDeclaration): any;
    public css(propertyname: keyof CSSStyleDeclaration, value: any): DomWarpper;
    public css(styles: Pick<CSSStyleDeclaration, keyof CSSStyleDeclaration>): DomWarpper
    public css(propertynameOrStyles: any, value?: any): DomWarpper | any {
        if (typeof value === "undefined") {
            if (typeof propertynameOrStyles === "string") {
                return this.firstValue(p => getComputedStyle(p)[propertynameOrStyles as keyof CSSStyleDeclaration]);
            } else {
                return this.each(p => Object.assign(p.style, propertynameOrStyles));
            }
        } else {
            return this.each(p => p.style[propertynameOrStyles] = value);
        }
    }
    //#endregion

    //#region show hide
    public isShown(): boolean {
        return this.css("display") !== "none";
    }
    public isHidden(): boolean | null {
        return this.css("display") === "none";
    }

    public show(): DomWarpper {
        return this.each(p => utils.showElement(p));
    }
    public hide(): DomWarpper {
        return this.each(p => utils.hideElement(p));
    }
    public toggle(): DomWarpper {
        return this.each(p => utils.toggleElement(p));
    }
    //#endregion
}