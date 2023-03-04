import { combineReducers } from "redux";
import GistsReducer, { IGistsState } from "./GistsReducer";

export type RootState = {
  gists: IGistsState;
};

const rootReducer = combineReducers({
  gists: GistsReducer
});

export default rootReducer;
