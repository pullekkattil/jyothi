import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Scroll() {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    // Cleanup the listener when the component unmounts
    return () => {
      unlisten();
    };
  }, [history]);

  return null; // This component doesn't render anything
}

export default Scroll;
