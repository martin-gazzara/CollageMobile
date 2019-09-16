import {
  SAVE_PHOTO, 
  RETRIEVE_STORED_PHOTOS,
  RETRIEVE_STORED_PHOTOS_SUCCESS,
  REMOVE_PHOTO
} from './actions';

import { takeEvery, put, all, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

//            WORKERS

function* savePhotoWorker(){
  try{
    const photos = yield select( state => state.photos);
    yield AsyncStorage.setItem(`photos`, JSON.stringify(photos));
  }catch(e){
    console.log(e);
  }
}

function* retrieveStoredPhotosWorker(){
  try{
    const storedData = yield AsyncStorage.getItem('photos');
    const photos = JSON.parse(storedData) || [];
    yield put({
      type: RETRIEVE_STORED_PHOTOS_SUCCESS,
      payload:{
        photos,
        nextId: photos.length ? photos[photos.length - 1].id + 1 : 0
      }
    });
  }catch(e){
    console.log(e);
  }
}


//            WATCHERS
function* savePhotoWatcher(){
  yield takeEvery(SAVE_PHOTO, savePhotoWorker);
}

function* retrieveStoredPhotosWatcher(){
  yield takeEvery(RETRIEVE_STORED_PHOTOS, retrieveStoredPhotosWorker)
}


function* retrieveRemovePhotosWatcher(){
  yield takeEvery(REMOVE_PHOTO, savePhotoWorker)
}

export default function* rootSaga(){
  yield all([
    savePhotoWatcher(),
    retrieveStoredPhotosWatcher(),
    retrieveRemovePhotosWatcher()
  ])
}