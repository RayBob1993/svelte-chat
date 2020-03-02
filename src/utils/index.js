import defaultsDeep from 'lodash/defaultsDeep'
import CustomEvent from './CustomEvent'

/**
 * @function
 * @name getTime
 * @description - Получить текущее время.
 * @return {string}
 * @example '14:01'
 */
function getTime () {
  const date = new Date()

  return `${date.getHours()}:${date.getMinutes()}`
}

/**
 * @function
 * @name getElement
 * @description - Получить DOM элемент.
 * @param {string|HTMLElement} element - Селектор или HTMLElement
 * @return {HTMLElement}
 */
function getElement (element) {
  return element
    ? typeof element === 'string' ? document.querySelector(element) : element
    : null
}

/**
 * @function
 * @name scrollTo
 * @description - Проскролить до нужного элемента.
 * @param {string|HTMLElement} container - Селектор или HTMLElement скроллбара
 * @param {string|HTMLElement} target - Селектор или HTMLElement элемента к которому нужно проскролить
 */
function scrollTo (container, target) {
  container = getElement(container)
  target = getElement(target)

  container.scrollTop = target.offsetTop
}

/**
 * @function
 * @name noop
 * @description - Пустая функция
 */
function noop () {}

export {
  getTime,
  scrollTo,
  noop,
  defaultsDeep,
  CustomEvent,
}
