'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const inputNumber = {
    created(el, binding, vnode) {
        const iVnode = vnode;
        let input = vnode.type === 'input' ? el : el.children.item(0);
        if (input === null || input.tagName !== "INPUT") {
            console.error("请在输入框中绑定");
            return;
        }
        input.addEventListener('compositionstart', () => {
            iVnode.inputLocking = true;
        });
        input.addEventListener('compositionend', () => {
            iVnode.inputLocking = false;
            input?.dispatchEvent(new Event('input'));
        });
        input.addEventListener("input", () => {
            console.log(input.value);
            if (iVnode.inputLocking || !input) {
                return;
            }
            let oldValue = input.value;
            let newValue = input.value;
            newValue = newValue.replace(/\D/g, '');
            if (+newValue !== +oldValue) {
                input.value = newValue;
                input.dispatchEvent(new Event("input"));
            }
        });
    }
};

exports.inputNumber = inputNumber;
//# sourceMappingURL=index.js.map
