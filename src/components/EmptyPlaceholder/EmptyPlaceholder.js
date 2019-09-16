import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import commonStyles from '../../styles';

const EmptyPlaceholder = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>There is not any photo to show</Text>
      <View styles={styles.iconContainer}>
        <Icon name="add-a-photo" size={50} color={'#ccc'}/>
      </View>
      <Text style={styles.text}>Press the camera icon to add a new photo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200
  },
  iconContainer:{
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 50
  },
  text: {
    ...commonStyles.text,
    color: commonStyles.colors.darkBrown
  }
});

export default EmptyPlaceholder;