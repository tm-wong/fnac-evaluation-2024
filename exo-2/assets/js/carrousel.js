/* carrousel */

const getElementSlider = element => {
  return element.querySelector('.slider');
};

const getThumbnails = sliderItem => {
  return sliderItem.querySelectorAll('.thumbnail');
};

const getThumbnailCount = sliderItem => {
  const thumbnails = getThumbnails(sliderItem);
  return Array.from(thumbnails).length || false;
};

const getElementStyleProp = (element, propName) => {
  return window.getComputedStyle(element)?.[propName] || false;
};

const getSliders = () => {
  return document.querySelectorAll('.slider');
};

const sanitize = strStyle => {
  return parseInt(strStyle.replace('px', ''), 10);
};

const setSliderWidth = () => {
  const sliders = getSliders();
  Array.from(sliders).forEach(sliderItem => {
    const count = getThumbnailCount(sliderItem);
    const thumbnails = getThumbnails(sliderItem);
    const style = getElementStyleProp(thumbnails?.[0], 'width');
    if (count === false || style === false)
      return;
    const width = sanitize(style)
    sliderItem.style.width = (width * count) + 'px';
  })
};

const getTargetSlideable = slider => {
  return parseInt(slider.dataset.slideable, 10);
};

const setTargetSlideable = (e, value) => {
  e.target.dataset.slideable = value;
};

const getHolderWidth = slider => {
  return getElementStyleProp(slider.parentNode, 'width');
};


const getWhere = options => {

  let remains = null;
  let where = null;

  const {
    holderWidth,
    sliderWidth,
    thumbnails,
    widthStyle,
    leftStyle,
    width,
    left,
    multiplier
  } = options;

  if (widthStyle === false || leftStyle === false) {
    return;
  } else if (
    multiplier === -1 &&
    Math.abs(left) + sanitize(holderWidth) + width > sanitize(sliderWidth) && multiplier === -1 &&
    Math.abs(Math.abs(left) + sanitize(holderWidth) - sanitize(sliderWidth)) < width
  ) {
    remains = Math.abs(left) + sanitize(holderWidth) - sanitize(sliderWidth)
    where = left + remains;
  } else if (
    multiplier === 1 &&
    Math.abs(left) < width
  ) {
    where = 0
  } else {
    where = left + width * multiplier;
  }
  return where;
};

const moveOne = (direction, slider) => {

  const options = {
    holderWidth: getHolderWidth(slider),
    sliderWidth: getElementStyleProp(slider, 'width'),
    thumbnails: getThumbnails(slider),
    leftStyle: getElementStyleProp(slider, 'left'),
  };

  options.widthStyle = getElementStyleProp(options.thumbnails?.[0], 'width'),
  options.width = sanitize(options.widthStyle);
  options.left = sanitize(options.leftStyle);
  options.multiplier = direction === 'left' && 1 || -1;

  const where = getWhere(options);

  slider.style.left = `${ where }px`;
};

const init = () => {

  setSliderWidth();

  const leftArrows = document.querySelectorAll('.left-arrow');
  Array.from(leftArrows).forEach(item => {
    item.addEventListener('click', e => {
      const slider = getElementSlider(e.target.parentNode);
      return void moveOne('left', slider);
    }, false);
  });


  const rightArrows = document.querySelectorAll('.right-arrow');
  Array.from(rightArrows).forEach(item => {
    item.addEventListener('click', e => {
      const slider = getElementSlider(e.target.parentNode);
      return void moveOne('right', slider);
    }, false);
  });

};

const docReady = func => {
  document.addEventListener('readystatechange', () => {
    if (event.target.readyState === 'complete')
      return func();
  });
};

docReady(init);
