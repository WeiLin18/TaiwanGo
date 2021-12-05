import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const useAddList = () => {
  const [page, setPage] = useState(0);

  const handleScroll = useDebouncedCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1200) {
      setPage((_page) => _page + 1);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return { page, setPage };
};

export default useAddList;
