export default class DocumentWarpper {
    private document: Document;
    constructor(document: Document) {
        this.document = document;
    }
    public on<K extends keyof DocumentEventMap>(event: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): DocumentWarpper {
        this.document.addEventListener(event, listener, options);
        return this;
    }
    public ready(listener: EventListener): DocumentWarpper {
        this.document.addEventListener("DOMContentLoaded", listener, false);
        return this;
        
    }
    
}