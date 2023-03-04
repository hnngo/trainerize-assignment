import React from "react";

// Constants
import { Gist } from "../../shared/types/Gist";

/**
 * Custom Hook to do the intersection observer on the last item of gists
 * @param Array<Gist> gists: an array of gists
 * @param function onFetchGists: action to fetch gists
 */
type OwnProps = { gists: Array<Gist>; onFetchGists: () => void };
const useIntersectionObserver = ({ gists, onFetchGists }: OwnProps) => {
  const [observer, setObserver] = React.useState<IntersectionObserver>();

  const destroyObserver = () => {
    if (observer) {
      observer.disconnect();
    }
  };

  React.useEffect(() => {
    // If there is current observer, then stop watching
    destroyObserver();

    // Nothing to watch
    if (gists.length === 0) {
      return;
    }

    setTimeout(() => {
      // Assign a new observer for the last item in new list of fetched gists
      const newObserver = new IntersectionObserver(
        (entries) => {
          const lastRow = entries[0];
          if (lastRow.isIntersecting) {
            onFetchGists();
          }
        },
        {
          threshold: 1
        }
      );
      const element = document.getElementById(gists[gists.length - 1].id);

      if (element) {
        newObserver.observe(element);
      }

      setObserver(newObserver);

      return () => {
        destroyObserver();
      };
    }, 100);
  }, [gists]);
};

export default useIntersectionObserver;
