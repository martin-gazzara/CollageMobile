import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ActivityIndicator, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { savePhoto} from '../store/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera'

import commonStyles from '../styles';

class Camera extends React.Component {

  constructor(props){
    super(props);
    this.state={
      modalIsShowing: false,
      readingImage: false,
      flashActivated: false,
      frontalCamera: false,
      img: null,
      value: ''
    }
  }

  toggleModal = () => {
    this.setState({modalIsShowing: !this.state.modalIsShowing})
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, width: 200, height: 300 };
      this.setState({modalIsShowing: !this.state.modalIsShowing, readingImage: true});
      const data = await this.camera.takePictureAsync(options);
      this.setState({img: data.uri, readingImage: false});
    }
  };

  handleBack = (props) => {
    this.props.navigation.goBack()
  }

  handleIgnore = (props) => {
    this.setState({
      modalIsShowing: !this.state.modalIsShowing,
      img: null
    })
  }

  handleSave = () => {
    const { value, img } = this.state;
    this.props.savePhoto(value,img);
    this.props.navigation.navigate('Home')
    this.setState({img: null, value: ''});
  }

  handleActiveFlash = () => {
    this.setState({flashActivated: !this.state.flashActivated})
  }

  handleCameraSwapping = () => {
    this.setState({frontalCamera: !this.state.frontalCamera});
  }

  render(){
    const {
      img, 
      readingImage, 
      flashActivated, 
      frontalCamera,
      keyboardOpen
    } = this.state;
    return(
      <View style={styles.container}>
        {/* CAMERA */}
        <RNCamera
          ref={ (ref) => {
            this.camera = ref;
          }}
          style={styles.camera}
          flashMode={RNCamera.Constants.FlashMode[flashActivated ? 'on' : 'off']}
          fixOrientation
          type={frontalCamera ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
        />

        {/* MODAL */}
        <Modal
          visible={this.state.modalIsShowing}
        >
          <View style={styles.modalContainer}>

            {readingImage ? 
            <ActivityIndicator size="large"/> : 
            
            <Fragment>
              <Image
                source={{uri: img}}
                style={keyboardOpen ? styles.smallerImagePreview : styles.imagePreview}
              />

              <TextInput
                placeholder="Write the image's name"
                placeholderTextColor={commonStyles.colors.redBrown}
                value={this.state.value}
                onChangeText={ text => this.setState({value: text})}
                style={styles.textInput}
              />

              <View style={styles.buttonsContainer}>

                <TouchableOpacity onPress={this.handleSave} style={styles.saveButton}>
                  <Icon 
                    name="save"
                    size={40}
                    color="#fff"
                  />
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={this.handleIgnore} style={styles.ignoreButton}>
                  <Icon 
                    name="close"
                    size={40}
                    color="#fff"
                  />
                  <Text style={styles.buttonText}>Ignore</Text>
                </TouchableOpacity>

              </View>
            </Fragment>
            }
          </View>
        </Modal>

        {/* HUD */}
            {/* TURN CAMERA FRONT/BACK */}
        <TouchableOpacity onPress={this.handleCameraSwapping} style={styles.swapCamera}>
          <Icon 
              name={'loop'}
              size={35}
              color='#ccc'
            />
        </TouchableOpacity>
            {/* FLASH */}
        <TouchableOpacity onPress={this.handleActiveFlash} style={styles.flashIcon}>
          <Icon 
              name={flashActivated ? 'flash-on' : 'flash-off'}
              size={35}
              color='#ccc'
            />
        </TouchableOpacity>
            {/* BACK */}
        <TouchableOpacity onPress={this.handleBack} style={styles.backIcon}>
          <Icon 
              name='keyboard-arrow-left'
              size={35}
              color='#ccc'
            />
        </TouchableOpacity>
            {/* CAPTURE */}
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
          <Icon 
            name='photo-camera'
            size={50}
            color='#ccc'
          />
        </TouchableOpacity>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer:{
    backgroundColor: commonStyles.colors.lightBrown, 
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  buttonsContainer:{
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-around'
  },
  saveButton:{
    backgroundColor: '#008744', 
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
    borderRadius: 5, 
    width: 100
  },
  ignoreButton:{
    backgroundColor: '#d62d20', 
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
    borderRadius: 5, 
    width: 100
  },
  buttonText: {
    ...commonStyles.text.fontSize,
    fontSize: 14,
    color: '#fff'
  },
  camera:{
    flex: 1,
    width: '100%'
  },
  textInput:{
    backgroundColor: commonStyles.colors.cream,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    ...commonStyles.text,
    color: commonStyles.colors.redBrown
  },
  imagePreview:{
    width: 200,
    height: 300
  },
  smallerImagePreview:{
    width: 150,
    height: 225
  },
  backIcon:{
    position: 'absolute',
    top: 10,
    left: 10
  },
  capture:{
    position: 'absolute',
    bottom: 10
  },
  flashIcon:{
    position: 'absolute',
    top: 10,
    right: 10
  },
  swapCamera:{
    position: 'absolute',
    left: 10,
    bottom: 10
  }
});

const mapDispatchToProps = {
  savePhoto
}

const ConnectedComponent = connect(null, mapDispatchToProps)(Camera)

export default withNavigation(ConnectedComponent)