import React, { useEffect, useState } from "react";

function Image() {
  const [images, setImages] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/images/");
      const responseData = await response.json();
      setImages(responseData.images);
    }
    fetchData();
  }, []);

  function displayImages(imagesObj) {
    const imageArray = [];

    for (let image of Object.values(imagesObj)) {
      imageArray.push(image.url);
    }

    return (
      <>
        {imageArray.map((image) => {
          return <img src={image} alt="blank"></img>;
        })}
      </>
    );
  }

  return <h1>{displayImages(images)}</h1>;
}

export default Image;
