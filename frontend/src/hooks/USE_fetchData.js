//

import { useState, useEffect } from "react";

// Custom hook to handle data fetching
export function USE_fetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching data:", error);
        setError(error);
        setLoading(false);
      }
    }

    fetchData();

    // Clean-up function
    return () => {
      setData([]);
      setLoading(true);
      setError(null);
    };
  }, [url]); // Re-run effect whenever the URL changes

  return { data, loading, error };
}
