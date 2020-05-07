define(() => {
    class Component {
        constructor() {}
        toString() {
            return this.render();
        }
        render() {}
    }
    return Component;
});
