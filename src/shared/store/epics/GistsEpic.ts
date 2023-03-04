import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import {
  catchError,
  endWith,
  filter,
  mergeMap,
  startWith
} from "rxjs/operators";

import { RootState } from "../reducers";
import { actions, actionType } from "..";
import * as API from "../../services/Api";
import { AnyAction } from "redux";
import { Status } from "../../types";

// epic
export const FetchGistsEpic: Epic<
  AnyAction,
  AnyAction,
  RootState,
  typeof API
> = (action$, store, { getGists }) =>
  action$.pipe(
    ofType(actionType.FETCH_GISTS),
    mergeMap(({ payload: { page } }) =>
      from(getGists(page, store.value.gists.useMockAPI)).pipe(
        // Filter invalid responses from Fetch Gists API
        // (could be due to API rate limiter)
        filter(
          (gists) =>
            !!Array.isArray(gists) &&
            !!gists.length &&
            !!gists[0].id &&
            !!gists[0].owner
        ),
        mergeMap((response) => of(actions.saveGists(response))),
        catchError((e) => of(actions.setGistsError(e))),
        startWith(
          store.value.gists.gists.length > 0
            ? actions.setGistsStatus(Status.loadingMore)
            : actions.setGistsStatus(Status.loading)
        )
      )
    )
  );
export default [FetchGistsEpic];
