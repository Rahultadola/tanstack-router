import { useState, useEffect, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchEvents } from '../utils/http.js';

import EventItem from './EventItem.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';




export default function FindEventSection({allEvents}) {
  const searchElement = useRef();
  const searchTimeRef =  useRef();

  const [searchText, setSearchText] = useState();

  const {data, isLoading, isError, error} = useQuery({
    queryKey:['events', 'search='+ searchText], 
    queryFn: ({signal}) => fetchEvents({signal, searchText}),
    enabled: searchText !== undefined
  })

  // console.log(searchText)

  function handleSubmit(event) {
    event.preventDefault();
    setSearchText(searchElement.current.value);
  }

  useEffect(() => {
    setSearchText(allEvents ? "" : undefined)
  }, [allEvents])


  let content = <p>Please enter a search term and to find events.</p>

  if( isError ) {
    content = <ErrorBlock title="Error occured searching event" message={error.info.message}/>
  }

  if( isLoading ) {
    content = <LoadingIndicator />
  }

  if( data ) {
    // console.log("init data: ", data)
    content = <ul className="events-list">
      { data.map((ev) => <li key={ev.id}><EventItem event={ev}/></li>) }
    </ul>
  }  

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      { content }
    </section>
  );
}
