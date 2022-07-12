import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const InputText = ({
  onChangeText,
  iconPosition,
  icon,
  style,
  value,
  label,
  error = '',
  blurColor,
  paddingVertical,
  ...props
}) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const [focused, setFocused] = React.useState(false);
  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return 'red';
    }

    if (focused) {
      return blurColor;
    } else {
      return theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR;
    }
  };
  return (
    <View style={{ paddingVertical: paddingVertical }}>
      {label && (
        <Text style={{ color: theme.PRIMARY_TEXT_COLOR }}>{label}</Text>
      )}

      <View
        style={[
          styles.wrapper,
          { alignItems: icon ? 'center' : 'baseline' },
          { borderColor: getBorderColor(), flexDirection: getFlexDirection() },
          { backgroundColor: theme.mode === 'light' ? '#FFFCFB' : '#313133' },
        ]}
      >
        <View>{icon && icon}</View>

        <TextInput
          style={[styles.textInput, style, { color: theme.PRIMARY_TEXT_COLOR }]}
          placeholderTextColor="#8E8E8E"
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>

      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    marginTop: 15,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 15,

    width: 300,
    height: 50,

    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 13,
    borderWidth: 1,
  },

  textInput: {
    flex: 1,
    width: '100%',
  },

  error: {
    color: 'red',
    paddingTop: 4,
    fontSize: 12,
  },
});
