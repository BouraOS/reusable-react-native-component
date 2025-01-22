import { PixelRatio, Platform } from 'react-native';

const fontSize = (size: number): number => {
  return PixelRatio.getFontScale() * size;
};

const Fonts = {
  // Font families
  ...Platform.select({
    ios: {
      PRIMARY: {
        Regular: 'Poppins-Regular',
        Medium: 'Poppins-Medium',
        SemiBold: 'Poppins-SemiBold',
        Bold: 'Poppins-Bold',
        ExtraBold: 'Poppins-ExtraBold',
      },
      SECONDARY: {
        Light: 'Roboto-Light',
        Regular: 'Roboto-Regular',
        Medium: 'Roboto-Medium',
        Bold: 'Roboto-Bold',
        ExtraBold: 'Roboto-ExtraBold',
      },
    },
    android: {
      PRIMARY: {
        Regular: 'PoppinsRegular',
        Medium: 'PoppinsMedium',
        SemiBold: 'PoppinsSemiBold',
        Bold: 'PoppinsBold',
        ExtraBold: 'PoppinsExtraBold',
      },
      SECONDARY: {
        Light: 'RobotoLight',
        Regular: 'RobotoRegular',
        Medium: 'RobotoMedium',
        Bold: 'RobotoBold',
        ExtraBold: 'RobotoExtraBold',
      },
    },
  }),

  // Font sizes
  SIZES: {
    small: fontSize(12),
    regular: fontSize(14),
    medium: fontSize(16),
    large: fontSize(18),
    xLarge: fontSize(20),
    xLarge2: fontSize(24),
    xLarge3: fontSize(30),
    xLarge4: fontSize(36),
    xLarge5: fontSize(48),
  },

  // Font weights
  WEIGHTS: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  },
};

export default Fonts;
