import {
  SAVE_PHOTO,
  RETRIEVE_STORED_PHOTOS,
  RETRIEVE_STORED_PHOTOS_SUCCESS,
  REMOVE_PHOTO
} from './actions';

const initialState = {
  retrievingPhotos: false,
  photos: [],
  nextId: 0
}

export default function rootReducer(state = initialState, { type, payload }){
  switch(type){
    case SAVE_PHOTO:
      return{
        ...state,
        photos: [ ...state.photos, { id: state.nextId, name: payload.name, uri: payload.uri}],
        nextId: state.nextId + 1,
      }
    case RETRIEVE_STORED_PHOTOS:
      return{
        ...state,
        retrievingPhotos: true
      }
    case RETRIEVE_STORED_PHOTOS_SUCCESS:
      console.log(payload);
      return{
        ...state,
        retrievingPhotos: false,
        photos: payload.photos,
        nextId: payload.nextId
      }
    case REMOVE_PHOTO:
      return{
        ...state,
        photos: state.photos.filter( photo => photo.id !== payload.id)
      }
    default:
      return{
        ...state
      }
  }
}