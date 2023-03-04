import { combineEpics } from "redux-observable";

import gistsEpic from "./GistsEpic";

const epics = combineEpics(...gistsEpic);

export default epics;
