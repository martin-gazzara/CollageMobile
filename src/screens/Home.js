import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'

import EmptyPlaceholder from '../components/EmptyPlaceholder/EmptyPlaceholder';
import PictureCard from '../components/PictureCard/PictureCard';

import commonStyles from '../styles';

class Home extends React.Component{

  render(){
    const { photos} = this.props;
    return(
      <View style={styles.container}>
        <FlatList
          data={photos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <PictureCard {...item}/>}
          ListEmptyComponent={<EmptyPlaceholder/>}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={() => this.props.navigation.navigate('Camera')}>
          <Icon 
            name="add-a-photo"
            size={50}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: commonStyles.colors.lightBrown
  },
  iconContainer:{
    backgroundColor: commonStyles.colors.redBrown,
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: commonStyles.colors.darkBrown,
    borderStyle: 'solid',
    paddingBottom: 5
  }
})

const mapStateToProps = (state) => ({
  photos: state.photos
})

export default connect(mapStateToProps)(withNavigation(Home));