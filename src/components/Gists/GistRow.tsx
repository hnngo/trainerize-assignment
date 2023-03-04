import React from "react";

// Constants
import { RESULTS_PER_PAGE } from "../../shared/services/Api";

// Styles
import styles from "../../style/gists.module.scss";

type Props = { id: string; index: number; avatarUrl: string; fileName: string };
const GistRow: React.FC<Props> = ({
  id,
  index,
  avatarUrl,
  fileName
}: Props) => {
  return (
    <>
      <div id={id} className={styles.rowContainer}>
        <img
          className={styles.rowAvatarImg}
          src={avatarUrl}
          alt="github_avatar"
        />
        <div className={styles.rowFilename}>{fileName}</div>
      </div>
      {index % RESULTS_PER_PAGE === 0 ? (
        <div className={styles.rowPages}>Page {index / RESULTS_PER_PAGE}</div>
      ) : null}
    </>
  );
};

export default GistRow;
