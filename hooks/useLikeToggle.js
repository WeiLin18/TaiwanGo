import { useContext, useState } from "react";
import AppContext from "contexts/AppContext";

const useLikeToggle = (ID) => {
  const { likeItemsList } = useContext(AppContext);

  const isLiked = likeItemsList?.current?.some((itemID) => itemID === ID);
  const [isLike, setIsLike] = useState(isLiked);

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    setIsLike(!isLike);

    const prev = likeItemsList.current;
    if (isLike) {
      likeItemsList.current = prev.filter((itemID) => itemID !== ID);
    } else {
      likeItemsList.current = [...prev, ID];
    }

    localStorage.setItem("likedList", JSON.stringify(likeItemsList.current));
  };

  return { isLike, handleLikeToggle };
};

export default useLikeToggle;
