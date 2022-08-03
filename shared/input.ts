import type {VNode} from "@vue/runtime-core";

type InputElement = HTMLInputElement | HTMLTextAreaElement

export interface IVnode extends VNode {
  inputLocking: boolean
}

export const getInputElement = (el: HTMLElement, vnode: VNode): InputElement | null => {
  const input = (vnode.type === 'input' ? el : el.children.item(0)) as InputElement;
  if (input === null || input.tagName !== "INPUT") {
    console.error("请在输入框中绑定")
    return null
  }
  return input
}
