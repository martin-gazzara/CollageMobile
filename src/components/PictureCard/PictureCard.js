import React from 'react';
import { connect } from 'react-redux';
import { removePhoto } from '../../store/actions';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import commonStyles from '../../styles';

class PictureCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalIsShowing: false
    }

  }

  toggleModal = () => {
    this.setState({modalIsShowing: !this.state.modalIsShowing});
  }

  removePhoto = () => {
    const { id, removePhoto } = this.props;
    Alert.alert(
      'Erase photo',
      'You will erase this photo. Are you sure?',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'Ok', onPress: () => {removePhoto(id)}},
      ]
    )
  }

  render(){
    const {id, name, uri} = this.props
    return(
      <React.Fragment>
        
        <Modal
          animationType="fade"      
          visible={this.state.modalIsShowing} 
          transparent
        >
          <View style={styles.modalContainer}/>
          <Image
            source={{uri}}
            style={styles.imagePreview}
          />
          <TouchableOpacity onPress={this.toggleModal} style={styles.closeIcon}>
            <Icon
              name='close'
              size={30}
              color='#fff'
            />
          </TouchableOpacity>
        </Modal>
        
        <TouchableOpacity onPress={this.toggleModal} style={styles.container}>

          <Icon name="picture-o" size={30} color={commonStyles.colors.darkBrown} style={styles.iconPicture}/>
          <Text style={styles.pictureName}>{name}</Text>

          <TouchableOpacity onPress={this.removePhoto}>
            <FontAwesome5Icon name="trash-alt" size={30} color="red"/>
          </TouchableOpacity>

        </TouchableOpacity>

      </React.Fragment>
    )

  }
}

const styles = StyleSheet.create({
  container:{
    height: 80,
    backgroundColor: commonStyles.colors.cream,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: commonStyles.colors.darkBrown,
    borderStyle: 'solid'
  },
  modalContainer:{
    backgroundColor: '#000', 
    flex: 1, 
    opacity: 0.7
  },
  pictureName:{
    flexGrow: 1,
    marginLeft: 10,
    textTransform: 'capitalize',
    color: commonStyles.colors.redBrown,
    ...commonStyles.text,
  },
  imagePreview:{
    width: 200,
    height: 300,
    position: 'absolute',
    top: (Dimensions.get('window').height - 200) / 2,
    left: (Dimensions.get('window').width - 200) / 2,
  },
  closeIcon:{
    position: 'absolute', 
    top: 10, 
    right: 10
  }
})

const mapDispatchToProps = {
  removePhoto
}

export default connect(null, mapDispatchToProps)(PictureCard);