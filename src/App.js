import React, {useState, useEffect} from 'react';
import Form from './components/Form';
import ImageList from './components/ImageList';
import imagen from './image01.png';
import Error from './components/Error';

  function App() {

    // State App

    const [search, saveSearch]= useState('');
    const [images, saveImages] = useState([]);
    const [page, savePage] = useState(1);
    const [totalpage, saveTotalPage] = useState(5);
    const [error, saveError] = useState(false);
    
    useEffect ( () => {

      const ConsultAPI = async () => {

        if(search === '') return;

      const ImagesbyPage = 30;
      const key = '15309538-d75fce94a0987dd37a816cc1b';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${ImagesbyPage}&page=${page}`;
      const reply = await fetch(url);
      const result = await reply.json();

      saveImages(result.hits);

      // Validate results

      if (result.hits.length === 0){
        saveError(true);
        return;
      }

      saveError(false);

      //Total Pages

      const calculateTotalPages = Math.ceil(result.totalHits / ImagesbyPage);

      saveTotalPage(calculateTotalPages);

      //Scroll up

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'});

      }

      ConsultAPI();
      

    }, [search, page]);

    //Previous page

    const previouspage = () => {

      const newPage = page - 1;

      if(newPage === 0) return;

      savePage(newPage);

    }

    //Next page


    const nextpage = () => {

      const newPage = page + 1;

      if(newPage > totalpage) return;
  
      savePage(newPage);

    }

    return (
      <div className="container mt-4">
        <div >
          <img src={imagen} alt="logo" className=" img-l"/>
        </div>
        <div className="jumbotron">
          <h1 className="lead">Pic Catcher</h1>
          <Form
            saveSearch={saveSearch}/>
        </div>
        <div className="row justify-content-center">
          {error ? <Error message="No Results"/> : null}
          <ImageList
          images={images}
          />

          {(page === 1 || error)
            ? null
            :(
              <button
                type="button"
                className="btn btn-info mr-1 p-2"
                onClick={previouspage}
              > &laquo; Previous</button>
          )}
          
          {(page === totalpage || search === '' || error)
            ? null
            :(
              <button
                type="button"
                className="btn btn-info p-2"
                onClick={nextpage}
              >Next &raquo;</button>
          )}

        </div>
      </div>
    );
  }

export default App;
