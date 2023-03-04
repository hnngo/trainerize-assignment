import { AnyAction } from "redux";
import { Status } from "../../types";
import {
  SET_GISTS_STATUS,
  FETCH_GISTS,
  SAVE_GISTS,
  SET_GISTS_ERROR,
  TOGGLE_MOCK_API
} from "../constants";

// action creators

/**
 * Set Gist reducer status
 * @param {enum} status the status to set, defined in shared/types
 */
export const setGistsStatus = (status: Status): AnyAction => ({
  type: SET_GISTS_STATUS,
  payload: { status }
});

/**
 * Save Gists to the redux store
 * @param {Array<Gist>} gists array of gists retrieved from API 
 */
export const saveGists = (gists: unknown): AnyAction => ({
  type: SAVE_GISTS,
  payload: { gists }
});

/**
 * Set the redux state to error
 * @param {Error} error error received from API
 */
export const setGistsError = (error: Error) => ({
  type: SET_GISTS_ERROR,
  payload: { error }
});

/**
 * Toggle the boolean using Mock API
 */
export const toggleMockApi = (): AnyAction => ({
  type: TOGGLE_MOCK_API,
})

// epic action

/**
 * Calls epic to fetch array of gists through Github public API
 * @param {number} page page number to fetch - default to page 1
 */
export const fetchGists = (page: number = 1): AnyAction => ({
  type: FETCH_GISTS,
  payload: { page }
});
