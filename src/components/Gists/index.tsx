import React from "react";

// Redux
import { connect, ConnectedProps } from "react-redux";
import { fetchGists, toggleMockApi } from "../../shared/store/actions";
import { RootState } from "../../shared/store/reducers";

// Components
import GistTable from "./GistTable";

// Styles
import styles from "../../style/gists.module.scss";

const mapStateToProps = (state: RootState) => {
  return {
    useMockAPI: state.gists.useMockAPI
  };
};
const connector = connect(mapStateToProps, { fetchGists, toggleMockApi });
type PropsFromRedux = ConnectedProps<typeof connector>;

const Gists: React.FC<PropsFromRedux> = ({
  useMockAPI,
  fetchGists,
  toggleMockApi
}) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    fetchGists(currentPage);
  }, []);

  return (
    <div>
      <div className={styles.toggleContainer}>
        <button
          className={
            `${styles.toggleButton} ` + (!useMockAPI && `${styles.toggleGreen}`)
          }
          onClick={toggleMockApi}
        >
          {useMockAPI ? "Using Mock API" : "Using Real API"}
        </button>
      </div>
      <GistTable
        onFetchGists={() => {
          fetchGists(currentPage + 1);
          setCurrentPage(currentPage + 1);
        }}
      />
    </div>
  );
};

export default connector(Gists);
