export default class WindowWarpper {
    private window: Window;
    constructor(window: Window) {
        this.window = window;
    }
    public on<K extends keyof WindowEventMap>(event: K, listener: (this: Document, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): WindowWarpper {
        this.window.addEventListener(event, listener, options);
        return this;
    }
}