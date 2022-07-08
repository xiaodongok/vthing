'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('@vue/shared');

function onCompositionStart(e) {
    e.target.composing = true;
}
function onCompositionEnd(e) {
    const target = e.target;
    if (target.composing) {
        target.composing = false;
        target.dispatchEvent(new Event('input'));
    }
}
const vInputNumber = {
    created(el, binding, vnode) {
        el.addEventListener("input", e => {
            let domValue = el.value;
            el.value = shared.toNumber(domValue);
            el.addEventListener('compositionstart', onCompositionStart);
            el.addEventListener('compositionend', onCompositionEnd);
            el.addEventListener('change', onCompositionEnd);
        });
    },
    // set value on mounted so it's after min/max for type="range"
    mounted(el, { value }) {
        el.value = value == null ? '' : value;
    },
    beforeUpdate(el, { value }, vnode) {
        if (el.composing)
            return;
        console.log(value, "value");
        const newValue = value == null ? '' : value;
        if (el.value !== newValue) {
            el.value = newValue;
        }
    }
};

exports.vInputNumber = vInputNumber;
//# sourceMappingURL=vthing.bundle.js.map
