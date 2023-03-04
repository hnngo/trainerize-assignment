import { AnyAction } from "redux";
import { Status } from "../../types";
import {
  SAVE_GISTS,
  SET_GISTS_STATUS,
  SET_GISTS_ERROR,
  TOGGLE_MOCK_API
} from "../constants";
import { Gist } from "../../types/Gist";

export interface IGistsState {
  status: Status;
  gists: Array<Gist>;
  error?: Error;
  useMockAPI: boolean;
}

const initialState: IGistsState = {
  status: Status.initial,
  gists: [],
  error: undefined,
  useMockAPI: true
};

const GistsReducer = (state: IGistsState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_GISTS_STATUS:
      return {
        ...state,
        status: payload.status
      };

    case SAVE_GISTS:
      return {
        ...state,
        gists: [...state.gists, ...payload.gists],
        status: Status.success
      };

    case SET_GISTS_ERROR:
      return {
        ...state,
        error: payload.error,
        status: Status.error
      };

    case TOGGLE_MOCK_API:
      return {
        ...state,
        useMockAPI: !state.useMockAPI
      };

    default:
      return state;
  }
};

export default GistsReducer;
