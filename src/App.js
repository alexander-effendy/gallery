import React, {useState, useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //after fetching set to false
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(2);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&per_page=21&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]); 
        setIsLoading(false);
      })
      .catch(err => console.log(err));
      console.log('kimak')
  }

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&per_page=21&page=1`)
      .then(res => res.json())
      .then(data => {
        // hits is anm array of 20 images and put them into our image state
        setImages(data.hits); 
        setIsLoading(false);
        console.log('cibai')
      })
      .catch(err => console.log(err));
  }, [term])

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>}

      {isLoading ? 
        <h1 className="text-6xl text-center mx-auto mt-32">
          Images are being loaded
        </h1> : 
        <div className="grid grid-cols-3 gap-4">
          {/* mag images */}
          {images.map(image => (
            <ImageCard key={image.id} image={image}/>
          ))}
        </div>}


        <button 
          className="w-full bg-purple-500 rounded-lg mt-3 mb-2 text-white"
          onClick={handleLoadMore}
        >
          load more
        </button>
    </div>
  );
}

export default App;
