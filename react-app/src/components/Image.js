import React, { useEffect, useState } from 'react';

function Image() {
    const [images, setImages] = useState([]);


    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/images/');
          console.log("Response", response)
          const responseData = await response.json();
          console.log("Response Data", responseData)
        //   setImages(responseData.images);
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

return (

    <h1>{images[0]}</h1>
)

}

export default Image
