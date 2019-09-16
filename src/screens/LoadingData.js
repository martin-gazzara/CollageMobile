import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { retrieveStoredPhotos } from '../store/actions';

import commonStyles from '../styles';

class LoadingData extends React.Component{

  componentDidMount(){
    this.props.retrieveStoredPhotos();
  }

  componentDidUpdate(prevProps){
    if (prevProps.retrievingPhotos && !this.props.retrievingPhotos){
      this.props.navigation.navigate('Home');
    }
  }

  render(){
    const { retrievingPhotos } = this.props;
    return(
    <View style={styles.container}>
      <Text style={styles.title}>Retrieving photos...</Text>
      {retrievingPhotos && <ActivityIndicator size="large" color={commonStyles.colors.brown}/>}
    </View>
    )}

}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: commonStyles.colors.lightBrown
  },
  title: {
    ...commonStyles.text, 
    color: commonStyles.colors.redBrown, 
    marginBottom: 40
  }
})

const mapStateToProps = (state) => ({
  retrievingPhotos: state.retrievingPhotos
})

const mapDispatchToProps = {
  retrieveStoredPhotos
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoadingData));