import type {ObjectDirective} from "@vue/runtime-core"
import type {IVnode} from "../../shared/input"
import {getInputElement} from "../../shared/input";

export const inputNumber: ObjectDirective<HTMLInputElement | HTMLTextAreaElement> = {
  created(el, binding, vnode) {
    const iVnode = (vnode as IVnode)
    let input = getInputElement(el,vnode)
    if (!input) {
      return;
    }
    input.addEventListener('compositionstart', () => {
      iVnode.inputLocking = true
    })
    input.addEventListener('compositionend', () => {
      iVnode.inputLocking = false
      input?.dispatchEvent(new Event('input'))
    })
    input.addEventListener("input", () => {
      if (iVnode.inputLocking || !input) {
        return;
      }
      let oldValue = input.value;
      let newValue = input.value;

      newValue = newValue.replace(/[^0-9]/g, '')
      if(newValue!==oldValue){
        input.value = newValue;
        input.dispatchEvent(new Event("input"))
      }
    })
  }
}
