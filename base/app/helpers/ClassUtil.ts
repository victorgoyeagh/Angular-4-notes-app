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
