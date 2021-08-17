import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


function Image() {
    const [images, setImages] = useState('');

    // const dispatch = useDispatch()



    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/images/');
        //   console.log("Response", response)
          const responseData = await response.json();
        //   console.log("Response Data", responseData)
          setImages(responseData.images);
        //   console.log(images)
        }
        fetchData();
      }, []);


// const imageComponents = images.map((image) => {
//     return (
//       <li key={image.id}>
//         <NavLink to={`/images/${image.id}`}>{image.username}</NavLink>
//       </li>
//     );
//   });

// {console.log(images[1])}
// console.log(images?.[1])
// * Add looping

function displayImages(imagesObj){
    const imageArray = []
    // console.log(imagesObj)

    for (let image of Object.values(imagesObj)){
        // console.log(image)
        imageArray.push(image.url)
    }

    return (
        <>
            {imageArray.map((image) => {
                return <img src={image} alt="blank"></img>
            })}
        </>
    )
}

return (

    <h1>
        {displayImages(images)}
        {/* { <img src={images?.[1]["url"]} alt={images?.[1]["alt_text"]}></img> }
        { <img src={images?.[2]["url"]} alt={images?.[2]["alt_text"]}></img> } */}
        {/* { <img src={images[].url} alt={images.alt_text}></img> } */}

    </h1>
)

}

export default Image
