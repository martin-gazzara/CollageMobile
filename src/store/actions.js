export const SAVE_PHOTO = 'SAVE_PHOTO';
export const REMOVE_PHOTO = 'REMOVE_PHOTO';
export const RETRIEVE_STORED_PHOTOS = 'RETRIEVE_STORED_PHOTOS';
export const RETRIEVE_STORED_PHOTOS_SUCCESS = 'RETRIEVE_STORED_PHOTOS_SUCCESS';

export const savePhoto = (name, uri) => {
  return {
    type: SAVE_PHOTO,
    payload: {
      uri,
      name
    }
  }
}

export const removePhoto = id => {
  return{
    type: REMOVE_PHOTO,
    payload:{
      id
    }
  }
}

export const retrieveStoredPhotos = () => {
  return {
    type: RETRIEVE_STORED_PHOTOS
  }
}