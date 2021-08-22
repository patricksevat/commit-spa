export function setInputValueAndTriggerOnChange(selector, value) {
  return browser.execute(
    (selector, value) => {
      const input = document.querySelector(selector)
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
      nativeInputValueSetter.call(input, value)

      var ev2 = new Event('input', { bubbles: true })
      input.dispatchEvent(ev2)
    },
    selector,
    value
  )
}
