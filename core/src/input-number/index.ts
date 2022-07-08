import {ObjectDirective} from "@vue/runtime-core"
import {
  toNumber,
} from '@vue/shared'

function onCompositionStart(e:Event) {
  (e.target as any).composing = true
}

function onCompositionEnd(e: Event) {
  const target = e.target as any
  if (target.composing) {
    target.composing = false
    target.dispatchEvent(new Event('input'))
  }
}

export const vInputNumber: ObjectDirective<HTMLInputElement | HTMLTextAreaElement> = {
  created(el, binding, vnode) {

    el.addEventListener("input", e => {
      let domValue: string | number = el.value
      el.value = toNumber(domValue)

      el.addEventListener('compositionstart', onCompositionStart)
      el.addEventListener('compositionend', onCompositionEnd)
      el.addEventListener('change', onCompositionEnd)
    })
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, {value}) {
    el.value = value == null ? '' : value
  },
  beforeUpdate(el, {value}, vnode) {
    if ((el as any).composing) return
    console.log(value,"value")
    const newValue = value == null ? '' : value
    if (el.value !== newValue) {
      el.value = newValue
    }
  }
}
