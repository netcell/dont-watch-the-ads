import config from 'config.common';

const POPUP_TYPE = {
  /**
   * Popup thong thuong
   */
  SIMPLE: 'SIMPLE',
  // SLIDE:  'SLIDE',
  /**
   * Popup dai, thap de dang list 2 cai trong cung cua so
   */
  // LIST:   'LIST',
  // HIDDEN: 'HIDDEN',
  // STEPS:  'STEPS'
}

export var ASSETS_LIST = [
  {
    type: POPUP_TYPE.SIMPLE,
    image: '001.jpg',
    imageWidth: 1173,
    imageHeight: 569
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '002.jpg',
    imageWidth: 394,
    imageHeight: 979
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '003.jpg',
    imageWidth: 618,
    imageHeight: 629
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '004.jpg',
    imageWidth: 1933,
    imageHeight: 1119
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '005.jpg',
    imageWidth: 3900,
    imageHeight: 2000
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '006.jpg',
    imageWidth: 1280,
    imageHeight: 720
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '007.jpg',
    imageWidth: 1280,
    imageHeight: 720
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '010.jpg',
    imageWidth: 1280,
    imageHeight: 1564
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '011.jpg',
    imageWidth: 1619,
    imageHeight: 602
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '012.jpg',
    imageWidth: 488,
    imageHeight: 680
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '013.jpg',
    imageWidth: 1280,
    imageHeight: 1228
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '014.jpg',
    imageWidth: 1280,
    imageHeight: 525
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '015.jpg',
    imageWidth: 1280,
    imageHeight: 612
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '016.jpg',
    imageWidth: 1280,
    imageHeight: 724
  },
  {
    type: POPUP_TYPE.SIMPLE,
    image: '017.jpg',
    imageWidth: 1280,
    imageHeight: 1228
  },
    {
    type: POPUP_TYPE.SIMPLE,
    image: '018.jpg',
    imageWidth: 1280,
    imageHeight: 1228
  }
]

ASSETS_LIST.forEach(asset => {
  let maxImageHeight = config.height - 75*3;
  if (asset.imageHeight > maxImageHeight) {
    let scale = maxImageHeight / asset.imageHeight;
    asset.imageHeight = maxImageHeight;
    asset.imageWidth *= scale;
  }
})
