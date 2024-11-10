import { createReducer, Reducer } from '@reduxjs/toolkit';

import { SourceActionType } from '../../utils/ActionsHelper';
import { defaultVsc } from '../ApplicationTypes';
import { VscState } from '../types/VscTypes';
import VscActions from '../actions/VscActions';

export const VscReducer: Reducer<VscState, SourceActionType> = (
  state = defaultVsc,
  action
) => {
  state = newVscReducer(state, action);
  return state;
};

const newVscReducer = createReducer(defaultVsc, builder => {
  builder
    .addCase(VscActions.setVsc, (state) => {
      return { ...state, ...{isVsc: true} };
    });
});
