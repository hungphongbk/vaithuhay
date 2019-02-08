import styles from "../../sass/fragments/top-panel.m-scss"
import "intersection-observer"
import {deepEqual} from "@/utils/helpers"

export const DarkPanel = (el, {modifiers}) => {
  el.classList.add(styles["dark"])
  if (modifiers.overlay) el.classList.add(styles["overlay"])
}

class VisibilityState {
  observer = null
  el = null
  frozen = false

  constructor(el, vnode) {
    this.el = el
    this.createObserver(vnode)
  }

  createObserver(vnode) {

  }

  destroyObserver() {
  }
}

function bind(el, _, vnode) {
  if (process.env.NODE_ENV==='development' && typeof IntersectionObserver === 'undefined') {
    console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill')
  } else {
    el._vue_visibilityState = new VisibilityState(el, vnode)
  }
}

function update(el, _, vnode) {
  const state = el._vue_visibilityState
  if (state) {
    state.createObserver(vnode)
  } else {
    bind(el, {value}, vnode)
  }
}

function unbind(el) {
  const state = el._vue_visibilityState
  if (state) {
    state.destroyObserver()
    delete el._vue_visibilityState
  }
}

export const ObserverVisible = {
  bind,
  update,
  unbind
}
