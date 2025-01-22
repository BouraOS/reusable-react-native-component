import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CloseIcon from '../../../assets/icons/svg/closeIcon';
import InfoIcon from '../../../assets/icons/svg/InfoIcons';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '../../theme/normalize';
import Fonts from '../../theme/fonts';

const Tooltip = ({ message, onClose, width = widthPixel(250) }) => {
  return (
    <View style={styles.tooltipContainer}>
      <View style={styles.tooltipArrow} />
      <View style={[styles.tooltip, { width }]}>
        <InfoIcon width={widthPixel(19)} height={heightPixel(19)} />
        <View style={styles.tooltipContent}>
          <Text style={[styles.tooltipText]}>{`${message}`}</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.tooltipClose}>
          <CloseIcon width={widthPixel(19)} height={heightPixel(19)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tooltip;

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    top: pixelSizeVertical(21),
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999999,
    backgroundColor: 'steelblue',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: widthPixel(10),
    borderRightWidth: widthPixel(10),
    borderBottomWidth: widthPixel(10),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F5D7DE',
    marginBottom: pixelSizeVertical(-1), // Slight overlap to remove gaps
  },
  tooltip: {
    zIndex: 9999999,
    minHeight: 'auto',
    // width: widthPixel(350),
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelSizeHorizontal(10),
    backgroundColor: 'rgba(245, 215, 222, 0.8)',
    paddingHorizontal: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeVertical(10),
    borderRadius: heightPixel(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightPixel(3.17),
    },
    shadowOpacity: 0.15,
    shadowRadius: heightPixel(6),
  },
  tooltipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: pixelSizeHorizontal(5),
    flex: 1, // Ensures the text takes up available space
  },
  tooltipText: {
    fontFamily: Fonts.Regular,
    fontSize: fontPixel(10),
    lineHeight: fontPixel(19),
    color: '#651515',
    fontWeight: '500',
  },
  tooltipClose: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPixel(19),
    height: '100%',
  },
  infoIcon: {
    height: heightPixel(19),
    width: widthPixel(19),
  },
});
