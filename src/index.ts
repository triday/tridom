
import WindowWarpper from './window';
import DocumentWarpper from './document';
import DomWarpper from './dom';
export function $(window: Window): WindowWarpper;
export function $(document: Document): DocumentWarpper;
export function $(readyHandler: EventListener): DocumentWarpper;
export function $(tquery: DomWarpper): DomWarpper;
export function $(selectorOrHtmlstring: string): DomWarpper;
export function $(element: HTMLElement | null): DomWarpper;
export function $(elements: ArrayLike<HTMLElement | null>): DomWarpper;

export function $(arg0: any, arg1?: any): any {
    if (typeof arg0 === "function") {
        return new DocumentWarpper(document).ready(arg0);
    } else if (arg0 instanceof Window) {
        return new WindowWarpper(arg0);
    } else if (arg0 instanceof Document) {
        return new DocumentWarpper(arg0);
    } else {
        return new DomWarpper(arg0, arg1);
    }
};

export default $;

