import { forEach } from "@angular/router/src/utils/collection";

export class ClassUtil { 

    constructor() { 
    }

    static GetClassById(index, element) {
        return element.className.trim().split(/\s+/)[index];
    }
    static ContainsClass(name, element) {
        let classes = element.className.trim().split(/\s+/);
        return classes.indexOf(name) !== -1;
    }
    static AddClass(name, element) {
        let classes = element.className.trim().split(/\s+/);
        if (classes.indexOf(name) === -1) {
            classes.push(name);
            element.className = classes.join(' ');
        }
    }
    static SwapClass(currClass, newClass, element) {
        let obj = new ClassHelper(element);
        if (obj.containsClass(currClass)) {
            obj.removeClass(currClass);
        }
        obj.addClass(newClass);
        obj = null;
    }
    static RemoveClass(name, element) {
        let classes = element.className.trim().split(/\s+/);
        let ix = classes.indexOf(name);
        if (ix !== -1) {
            classes.splice(ix, 1);
            element.className = classes.join(' ');
        }
    }
    static RemoveClasses(names: Array<string>, element) {
        names.forEach((name) => ClassUtil.RemoveClass(name, element));
    }
    static ToggleClass(name, element) {
        let classes = element.className.trim().split(/\s+/);
        let ix = classes.indexOf(name);
        if (ix !== -1)
            classes.splice(ix, 1);
        else
            classes.push(name);
        element.className = classes.join(' ');
    } 
}

export class ClassHelper {
    private element: HTMLElement;

    constructor(element) {
        this.element = element;
    }

    item(ix) {
        return this.element.className.trim().split(/\s+/)[ix];
    }
    containsClass(name) {
        let classes = this.element.className.trim().split(/\s+/);
        return classes.indexOf(name) !== -1;
    }
    addClass(name) {
        let classes = this.element.className.trim().split(/\s+/);
        if (classes.indexOf(name) === -1) {
            classes.push(name);
            this.element.className = classes.join(' ');
        }
    }
    swapClass(currClass, newClass) {
        let obj = new ClassHelper(this.element);
        if (obj.containsClass(currClass)) {
            obj.removeClass(currClass);
        }
        obj.addClass(newClass);
        obj = null;
    }
    removeClass(name) {
        let classes = this.element.className.trim().split(/\s+/);
        let ix = classes.indexOf(name);
        if (ix !== -1) {
            classes.splice(ix, 1);
            this.element.className = classes.join(' ');
        }
    }
    toggleClass(name) {
        let classes = this.element.className.trim().split(/\s+/);
        let ix = classes.indexOf(name);
        if (ix !== -1)
            classes.splice(ix, 1);
        else
            classes.push(name);
        this.element.className = classes.join(' ');
    }

    CheckElement(){
        console.log(this.element)
        return this.element;
    }
}
