import {
  ViewProps,
  TouchableHighlightProps,
  ViewStyle,
  View,
  TouchableHighlight,
  StyleSheet,
  StyleSheetProperties,
  StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React,{FunctionComponent, useState, Props, StyleHTMLAttributes} from 'react';

export interface IMorphProps extends ViewProps, TouchableHighlightProps {
  size?: number;
}

export const NMorph: FunctionComponent<IMorphProps> = ({children, style}) => {
  return (
    <View style={[styles.topShadow, styles.cardMorph]}>
      <View style={styles.bottomShadow}>
        <View style={[styles.inner, style]}>{children}</View>
      </View>
    </View>
  );
};

export const NMorphHighlightable: FunctionComponent<IMorphProps> = ({
  children,
  size,
  style,
  onPress,
}) => {
  const [highlighted, setHighlighted] = useState(false);
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={'transparent'}
      style={{opacity: 1}}
      onHideUnderlay={() => setHighlighted(false)}
      onShowUnderlay={() => setHighlighted(true)}>
      <View
        style={[ styles.cardMorph, highlighted ? styles.invertedTopShadow : styles.convexTopShadow]}>
        <View
          style={
            highlighted
              ? styles.invertedBottomShadow
              : styles.convexBottomShadow
          }>
          <View style={[styles.inner, style]}>
            <LinearGradient
              colors={
                highlighted ? ['#c9d4cf', '#effbf6'] : ['#effbf6', '#c9d4cf']
              }
              style={{
                width: size || 32,
                height: size || 32,
                borderRadius: (size || 32) / 2,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              useAngle={true}
              angle={145}>
              {children}
            </LinearGradient>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
    cardMorph: {
        alignSelf: 'stretch',
        borderRadius: 10,
        
        flex: 1,
    },
    inner: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#dfebe6',
      margin: 10,
      flex: 1,
    },
    topShadow: {
      shadowOffset: {
        width: -4,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: '#ecf9f4',
    },
    bottomShadow: {
      shadowOffset: {
        width: 4,
        height: -4,
      },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowColor: '#d2ddd8',
    },
    invertedTopShadow: {
      shadowOffset: {
        width: -9,
        height: -9,
      },
      shadowOpacity: 0.8,
      shadowRadius: 6,
      shadowColor: '#f8ffff',
    },
    invertedBottomShadow: {
      shadowOffset: {
        width: 9,
        height: 9,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      shadowColor: '#c6d1cd',
      //9px 9px 30px #c6d1cd,
    },
    convexTopShadow: {
      shadowOffset: {
        width: -9,
        height: -9,
      },
      shadowOpacity: 0.7,
      shadowRadius: 6,
      shadowColor: '#ecf9f4',
    },
    convexBottomShadow: {
      shadowOffset: {
        width: 9,
        height: 9,
      },
      shadowOpacity: 0.7,
      shadowRadius: 10,
      shadowColor: '#d2ddd8',
      //9px 9px 30px #c6d1cd,
    },
  });