import Flickity from 'flickity';
import utils from 'fizzy-ui-utils';

let transformProperty = ( function () {
  let style = document.documentElement.style;
  if ( typeof style.transform === 'string' ) {
    return 'transform';
  }
  return 'WebkitTransform';
})();

Flickity.prototype.positionSlider = function() {
  let x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  x = x + this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft && transformProperty ? -x : x;
  let value = this.getPositionValue( x );
  // only use 2d rendering
  this.slider.style[ transformProperty ] = 'translateX(' + value + ')';

  // scroll event
  let firstSlide = this.slides[0];
  if ( firstSlide ) {
    let positionX = -this.x - firstSlide.target;
    let progress = positionX / this.slidesWidth;
    this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
  }
};
