import React from "react";

// Redux
import { RootState } from "../../shared/store/reducers";
import { connect, ConnectedProps } from "react-redux";

// Component
import GistRow from "./GistRow";
import Spinner from "../Spinner";

// Hook
import useIntersectionObserver from "../../shared/hook/useIntersectionObserver";

// Constants
import { Status } from "../../shared/types";

// Styles
import styles from "../../style/gists.module.scss";

const mapStateToProps = (state: RootState) => {
  return {
    gists: state.gists.gists,
    status: state.gists.status
  };
};
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type OwnProps = { onFetchGists: () => void };

const GistTable: React.FC<PropsFromRedux & OwnProps> = ({
  gists,
  status,
  onFetchGists
}) => {
  useIntersectionObserver({ gists, onFetchGists });

  return (
    <div className={styles.tableContainer}>
      {gists.length > 0 ? (
        <div>
          {gists.map((gist, index) => (
            <GistRow
              key={gist.id}
              id={gist.id}
              index={index + 1}
              avatarUrl={gist.owner.avatar_url}
              fileName={Object.keys(gist.files)[0]}
            />
          ))}
          {status === Status.loadingMore && <Spinner />}
        </div>
      ) : status === Status.loading ? (
        <Spinner />
      ) : (
        <div>No Gists (Potentially API Rate limiting)</div>
      )}
    </div>
  );
};

export default connector(GistTable);
