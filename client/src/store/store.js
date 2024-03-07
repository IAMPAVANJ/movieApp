import {configureStore,combineReducers} from '@reduxjs/toolkit';
import storage  from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 

} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { mainSlice } from './slices/mainSlice';

const persistConfig = {
    key:'root',
    storage,
    stateReconciler:autoMergeLevel2,
    whitelis:['main']
}


const cReducers = combineReducers({
    mainSlice:mainSlice.reducer
})

const pReducer = persistReducer(persistConfig,cReducers)

export const store = configureStore({
    reducer:pReducer,
    middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
				ignoredPaths: []
			},
			
		})
})

export const persistore = persistStore(store);