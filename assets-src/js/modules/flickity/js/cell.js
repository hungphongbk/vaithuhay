import getSize from 'get-size/get-size'
import fastdom from 'fastdom'

function Cell(elem, parent) {
  this.element = elem
  this.parent = parent

  this.create()
}

var proto = Cell.prototype

proto.create = function () {
  this.element.style.position = 'absolute'
  this.element.setAttribute('aria-hidden', 'true')
  this.x = 0
  this.shift = 0
}

proto.destroy = function () {
  // reset style
  this.unselect()
  this.element.style.position = ''
  var side = this.parent.originSide
  this.element.style[side] = ''
}

proto.getSize = function () {
  this.size = getSize(this.element)
}

proto.setPosition = function (x) {
  this.x = x
  this.updateTarget()
  this.renderPosition(x)
}

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function () {
  var marginProperty = this.parent.originSide === 'left' ? 'marginLeft' : 'marginRight'
  this.target = this.x + this.size[marginProperty] +
    this.size.width * this.parent.cellAlign
}

proto.renderPosition = function (x) {
  // render position of cell with in slider
  var side = this.parent.originSide
  fastdom.mutate(() => {
    this.element.style[side] = this.parent.getPositionValue(x)
  })
}

proto.select = function () {
  this.element.classList.add('is-selected')
  this.element.removeAttribute('aria-hidden')
}

proto.unselect = function () {
  this.element.classList.remove('is-selected')
  this.element.setAttribute('aria-hidden', 'true')
}

/**
 * @param {Integer} factor - 0, 1, or -1
 **/
proto.wrapShift = function (shift) {
  this.shift = shift
  this.renderPosition(this.x + this.parent.slideableWidth * shift)
}

proto.remove = function () {
  this.element.parentNode.removeChild(this.element)
}

module.exports = Cell
