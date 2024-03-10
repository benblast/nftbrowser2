import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterContext";
import styles from "./ImageBrowser.module.css";

function ImageBrowser() {
  const { dispatch, filteredImages } = useFilterContext();

  const maxImages = filteredImages.length;
  // console.log(`maxImages:${maxImages}`);

  useEffect(
    function () {
      setNumImages(Math.min(60, maxImages));
    },
    [maxImages]
  );

  const [numImages, setNumImages] = useState(Math.min(60, maxImages));

  // console.log(`numImages: ${numImages}`);

  const remainingImages = maxImages - numImages < 0 ? 0 : maxImages - numImages;
  const addedImages = remainingImages >= 60 ? 60 : remainingImages;

  function handleScroll(e) {
    const distanceFromBottom =
      e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
    if (distanceFromBottom <= 200 && maxImages > numImages)
      setNumImages(numImages + addedImages);
  }

  const addLength = (num, added) => setNumImages(num + added);
  {
    /* <button
        className={styles.loadImagesButton}
        onClick={() => {
          handleScroll();
        }}
      ></button> */
  }

  return (
    // <div className={styles.imageBrowserGrid}>
    <div className={styles.imageBrowserGrid} onScroll={handleScroll}>
      {Array.from({ length: numImages }, (_, i) => (
        <img
          key={i}
          src={filteredImages[i]}
          className={styles.smallImage}
          onClick={
            // (e) => console.log(e)
            (e) =>
              dispatch({ type: "selectImage", payload: e.target.currentSrc })
          }
        ></img>
      ))}
      {maxImages > numImages ? (
        <button
          className={styles.loadImagesButton}
          onClick={() => {
            addLength(numImages, addedImages);
          }}
        >
          Load More Images
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          All {maxImages} Images Meeting this Filter have been Loaded
        </div>
      )}
    </div>
  );
}

export default ImageBrowser;
