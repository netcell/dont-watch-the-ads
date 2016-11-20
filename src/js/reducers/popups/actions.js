import _ from 'lodash';
import config from 'config.common';

import {ADD_POPUP, CLOSE_POPUP} from '.';
import {ASSETS_LIST} from '../../assets';

export const POPUP_TYPE = {
  SIMPLE: 'SIMPLE',
  SLIDE:  'SLIDE',
  LIST:   'LIST',
  HIDDEN: 'HIDDEN',
  STEPS:  'STEPS'
}

export const CLOSE_BUTTON_SIDE = {
  LEFT:  'LEFT',
  RIGHT: 'RIGHT'
}

export const addPopup = dispatch => ({
  position,
  type,
  close_button_side,
  confirm,
  config
}) => {
  dispatch({
    type: ADD_POPUP,
    payload: {
      position,
      type,
      close_button_side,
      confirm,
      config
    } 
  })
};

export const closePopup = dispatch => (id) => {
  dispatch({
    type: CLOSE_POPUP,
    payload: id
  })
};

export const generatePopup = dispatch => (numberOfPopupSinceBegining) => {
  let image = _.sample(ASSETS_LIST);
  let type = _.sample([POPUP_TYPE.SIMPLE, POPUP_TYPE.SLIDE]);
  let scale = _.random(50, 100)/100;

  let width = image.imageWidth * scale;
  let height = image.imageHeight * scale + 75;
  if (width < 270) {
    type = POPUP_TYPE.SIMPLE;
  }

  if (type == POPUP_TYPE.SLIDE) height += 75;

  let close_button_side = _.sample(CLOSE_BUTTON_SIDE);
  addPopup(dispatch)({
    type, close_button_side,
    confirm: _.random(0, 1),
    position: {
      x: _.random(0, config.width-width),
      y: _.random(0, config.height-75-height)
    },
    config: {
      size: {
        width, height
      },
      image: image.image
    }
  })
}