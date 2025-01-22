import { Dimensions, PixelRatio, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const isIOS = Platform.OS === 'ios';
const BASE_WIDTH = 430;
const BASE_HEIGHT = 932;

let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
// SCREEN_HEIGHT = SCREEN_HEIGHT + (!isIOS ? initialWindowMetrics?.insets?.top || 0 : 0);

// // Use initialWindowMetrics to get the initial frame dimensions, including safe area insets
const initialMetrics = initialWindowMetrics?.frame || {
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
};
const ACTUAL_SCREEN_HEIGHT =
  initialMetrics.height + (!isIOS ? initialWindowMetrics?.insets?.top || 0 : 0);
const ACTUAL_SCREEN_WIDTH = initialMetrics.width;

const widthBaseScale = ACTUAL_SCREEN_WIDTH / BASE_WIDTH;
const heightBaseScale = ACTUAL_SCREEN_HEIGHT / BASE_HEIGHT;

const isRetina = PixelRatio.get() >= 2;

function normalize(size: number, based = 'width', forBigScreens = false) {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;

  const shouldScale = isRetina && ACTUAL_SCREEN_WIDTH <= 430;

  return newSize;
}

//for width  pixel
const widthPixel = (size: number, forBigScreens?: boolean) => {
  return normalize(size, 'width', forBigScreens);
}; //for height  pixel
const heightPixel = (size: number, forBigScreens?: boolean) => {
  return normalize(size, 'height', forBigScreens);
}; //for font  pixel
const fontPixel = (size: number, forBigScreens?: boolean) => {
  return heightPixel(size, forBigScreens);
}; //for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number, forBigScreens?: boolean) => {
  return heightPixel(size, forBigScreens);
}; //for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number, forBigScreens?: boolean) => {
  return widthPixel(size, forBigScreens);
};
export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  ACTUAL_SCREEN_HEIGHT,
  ACTUAL_SCREEN_WIDTH,
};
