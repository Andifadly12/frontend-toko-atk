import { useState } from "react";

const useSearch = (data = [], keys = []) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(item => {
    return keys.some(key =>
      String(item[key] || "")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  });

  return {
    search,
    setSearch,
    filteredData,
  };
};

export default useSearch;
