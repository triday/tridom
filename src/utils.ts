let cacheData: { [key: string]: string } = {};

export function getDefaultDisplay(tagName: keyof HTMLElementTagNameMap): string {
    if (tagName in cacheData) {
        return cacheData[tagName];
    } else {
        return cacheData[tagName] = getDisplayValueInternal(tagName);
    }
    function getDisplayValueInternal(tagName: keyof HTMLElementTagNameMap) {
        let element = document.createElement(tagName);
        document.appendChild(element);
        let displayValue = getComputedStyle(element).display || ''
        document.removeChild(element);
        return displayValue;
    }
}

export function parseElements(elementString: string, doc: Document = document): Element[] {
    let root = doc.createElement('div');
    root.innerHTML = elementString || '';
    return Array.prototype.slice.apply(root.children);
}

export function isElementString(elementString: string): boolean {
    if (!elementString) return false;
    return elementString.slice(0, 1) === '<' && elementString.slice(-1) === '>';
}
export function uniqueItems<T>(items:ArrayLike<T>):T[]{
    let itemsArray = Array.prototype.slice.apply(items).filter(p => p) as T[];
    return [...new Set(itemsArray)];

}
export function isArrayLike<T>(object: any):object is ArrayLike<T>{
    return typeof object==="object" && length in object;
}

export function getElementsBySelector(selector: string, context?: Element): Element[] {
    let elements = context ?
        context.querySelectorAll(`:scope ${selector}`) :
        document.querySelectorAll(selector);
    return Array.prototype.slice.apply(elements);
}

export function hideElement(element: HTMLElement): void {
    let computedStyle = getComputedStyle(element);
    if (computedStyle.display === "none") return;
    if (element.style.display) {
        setData(element, 'old_display', element.style.display);
    }
    element.style.display = "none";
}
export function showElement(element: HTMLElement): void {
    let computedStyle = getComputedStyle(element);
    if (computedStyle.display !== "none") return;
    let old_display = getData(element, 'old_display');
    if (old_display) {
        element.style.display = old_display;
    } else {
        if (element.style.display === "none") {
            element.style.display = "";
        }
        let computedStyle2 = getComputedStyle(element);
        if (computedStyle2.display === "none") {
            element.style.display = getDefaultDisplay(element.tagName as any);
        }
    }



}
export function toggleElement(element: HTMLElement): void {
    let computedStyle = getComputedStyle(element);
    if (computedStyle.display === "none") {
        showElement(element);
    } else {
        hideElement(element);
    }
}

export function getData(element: HTMLElement, key: string): any {
    return element.dataset[key]
}
export function setData(element: HTMLElement, key: string, value: string) {
    element.dataset[key] = value;
}