import type {ObjectDirective, VNode} from "@vue/runtime-core"

interface IVnode extends VNode {
  inputLocking: boolean
}

type InputElement = HTMLInputElement | HTMLTextAreaElement

export const inputNumber: ObjectDirective<HTMLInputElement | HTMLTextAreaElement> = {
  created(el, binding, vnode) {
    const iVnode = (vnode as IVnode)
    let input = vnode.type === 'input' ? el : el.children.item(0) as InputElement;
    if (input === null || input.tagName !== "INPUT") {
      console.error("请在输入框中绑定")
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
      console.log(input.value)
      if (iVnode.inputLocking || !input) {
        return;
      }
      let oldValue = input.value;
      let newValue = input.value;

      newValue = newValue.replace(/\D/g, '')
      if(+newValue!==+oldValue){
        input.value = newValue;
        input.dispatchEvent(new Event("input"))
      }
    })
  }
}
