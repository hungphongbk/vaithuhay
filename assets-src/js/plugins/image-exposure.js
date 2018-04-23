const getImageBrightness = el => new Promise(resolve => {
  el.crossOrigin = "Anonymous";
  el.onload = function () {
    const {width, height} = this,
      canvas = document.createElement('canvas');
    Object.assign(canvas, {width, height});

    const ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);

    const imgData = ctx.getImageData(0, 0, width, height),
      data = imgData.data;
    let colorSum = 0;
    for (let x = 0, len = data.length; x < len; x += 4) {
      let r = data[x],
        g = data[x + 1],
        b = data[x + 2];
      colorSum += (r + g + b) / 3;
    }
    resolve(colorSum / (width * height));
  }
});

export default function (el, {value}) {
  // console.log(value);
  getImageBrightness(el)
    .then(brightness => value(el, brightness))
}
