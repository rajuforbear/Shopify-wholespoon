import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import MySlice from './Slice';
import Saga from './saga';
import { createLogger } from 'redux-logger'
const logger=createLogger()
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    data: MySlice,
  },
  middleware: [saga,logger],
});
saga.run(Saga);
export type RootState = ReturnType<typeof store.getState>
export default store;
