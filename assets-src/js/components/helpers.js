export const delay = timeout =>
  new Promise(resolve => setTimeout(resolve, timeout));

const responsive = (breakpoint, settings) => ({ breakpoint, settings });
export const slickOptions_ = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 3,
  responsive: [
    responsive(1111, {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: false
    }),
    responsive(768, {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: false,
      arrow: false
    }),
    responsive(426, {
      slidesToShow: 2.33,
      slidesToScroll: 2.33,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 2700
    })
  ]
};

export const createTransform = transforms =>
  Object.entries(transforms)
    .map(([k, v]) => `${k}(${v})`)
    .join(" ");

export const normalizeMoney = money => {
  return typeof money === "number"
    ? money
    : Number(money.replace(/[^0-9\.-]+/g, ""));
};
