import React, {useState, useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { data } from 'autoprefixer';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //after fetching set to false
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&per_page=21&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setImages(prevImages => [...prevImages, ...data.hits]); 
          setIsLoading(false);
          setHasMore(data.hits.length > 0);
        }, 500)
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&per_page=21&page=1`)
      .then(res => res.json())
      .then(data => {
        // hits is anm array of 20 images and put them into our image state
        setPage(1);
        setImages(data.hits); 
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term])

  useEffect(() => {

  }, [page])

  return (
    <div className="container mx-auto flex flex-col">
      <div className="fixed w-full bg-white flex justify-center">
        <ImageSearch searchText={(text) => setTerm(text)} />
      </div>
      
      <div className="px-20" style={{ marginTop: '155px' }}>
      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>}
        {isLoading ? 
          <h1 className="text-6xl text-center mx-auto">
            Images are being loaded
          </h1> : 

          <InfiniteScroll
            className='pb-5'
            dataLength={images.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <div className="grid grid-cols-3 gap-4">
              {/* mag images */}
              {images.map((image, index) => (
                <ImageCard key={index} image={image}/>
              ))}
            </div>
          </InfiniteScroll>
        } 
        <h1 className="text-3xl w-full text-center mb-5">End of results</h1>
      </div>
      
    </div>
  );
}

export default App;
