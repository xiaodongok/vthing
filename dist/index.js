'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const getInputElement = (el, vnode) => {
    const input = (vnode.type === 'input' ? el : el.children.item(0));
    if (input === null || input.tagName !== "INPUT") {
        console.error("请在输入框中绑定");
        return null;
    }
    return input;
};

const inputNumber = {
    created(el, binding, vnode) {
        const iVnode = vnode;
        let input = getInputElement(el, vnode);
        if (!input) {
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
            if (iVnode.inputLocking || !input) {
                return;
            }
            let oldValue = input.value;
            let newValue = input.value;
            newValue = newValue.replace(/[^0-9]/g, '');
            if (newValue !== oldValue) {
                input.value = newValue;
                input.dispatchEvent(new Event("input"));
            }
        });
    }
};

const isNumber = (value) => typeof value === "number";
const isUndefined = (value) => typeof value === "undefined";

const inputFloat = {
    created(el, binding, vnode) {
        if (!isUndefined(binding.value) && !isNumber(binding.value)) {
            console.error("参数输入错误，请输入number类型");
            return;
        }
        const iVnode = vnode;
        let input = getInputElement(el, vnode);
        if (!input) {
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
            if (iVnode.inputLocking || !input) {
                return;
            }
            let oldValue = input.value;
            let newValue = input.value;
            // 清除"数字"和"."以外的字符
            newValue = newValue.replace(/[^\d.]/g, '');
            // 只保留第一个点, 清除多余的
            newValue = newValue.replace(/(\..*)\./g, "$1");
            // 不能以 0 开头
            newValue = newValue.replace(/^0([0-9])/g, '$1');
            // 第一个字符如果是.号，则补充前缀0
            newValue = newValue.replace(/^\./g, '0.');
            // 去除多余小数位
            if (isNumber(binding.value)) {
                newValue = newValue.replace(new RegExp(`(\\.\\d{0,${binding.value}}).*$`), '$1');
            }
            if (newValue !== oldValue) {
                input.value = newValue;
                input.dispatchEvent(new Event("input"));
            }
        });
    }
};

exports.inputFloat = inputFloat;
exports.inputNumber = inputNumber;
//# sourceMappingURL=index.js.map
