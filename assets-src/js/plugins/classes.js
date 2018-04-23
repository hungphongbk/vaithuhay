class Middleware {
  use(fn) {
    this.go = ((stack) => (next) => stack(() => fn.call(this, next.bind(this))))(this.go);
  }

  go(next) {
    return next()
  }

  wrap(cb) {
    return this.go.bind(null, cb)
  }
}

export {Middleware}
