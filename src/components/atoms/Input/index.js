import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../../res';

const Input = ({
  type,
  label,
  height,
  width,
  fontSize,
  placeholder,
  value,
  password,
  onChangeText,
  error,
  onBlur,
  keyboardType,
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [data, setData] = useState(null);

  if (type === 'textarea') {
    return (
      <View style={styles.container}>
        <Text style={styles.label(fontSize)}>{label}</Text>
        <TextInput
          style={styles.inputTextArea(fontSize)}
          placeholder={placeholder}
          multiline
          numberOfLines={4}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
        {error ? (
          <Text style={{color: 'red', fontSize: 12, textAlign: 'right'}}>
            {error}
          </Text>
        ) : null}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label}</Text>
      <TextInput
        onBlur={onBlur}
        style={styles.input(fontSize, width, height)}
        placeholder={placeholder}
        value={value}
        secureTextEntry={password ? true : false}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {error ? (
        <Text style={{color: 'red', fontSize: 12, textAlign: 'right'}}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: fontSize => ({
    fontSize: fontSize ? fontSize : 18,
  }),
  input: (fontSize, width, height) => ({
    width: width ? width : '100%',
    height: height ? height : 30,
    fontSize: fontSize ? fontSize : 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    paddingLeft: 10,
  }),
  inputTextArea: fontSize => ({
    // width: '100%',
    height: 100,
    fontSize: fontSize ? fontSize : 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    paddingLeft: 10,
    textAlignVertical: 'top',
  }),
});
