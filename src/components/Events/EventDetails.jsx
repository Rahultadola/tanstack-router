import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';

import { useQuery, useMutation } from '@tanstack/react-query';

import { queryClient, fetchEvent, deleteEvent } from '../utils/http.js';

import Header from '../Header.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: event, isLoading, isError, error } = useQuery({
    queryKey: ['events', 'id=' + id],
    queryFn: fetchEvent
  })

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (obj) => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      })
      navigate('/events')
    }
  })

  
  function handleDeleteEvent() {
    mutate({ id })
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
        <div style={{width: 'fit-content', margin: 'auto'}}>
          { isLoading && <LoadingIndicator />}
          {isError && <ErrorBlock title="Failed to load event" message={error.info?.message || "Fetching event data failed."}/> }
        </div>

        {event && <article id="event-details">
          <header>
            <h1>{ event.title }</h1>
            <nav>
              <button onClick={handleDeleteEvent}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${event.image}`} alt={event.title} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{ event.location }</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{ event.date } @ { event.time }</time>
              </div>
              <p id="event-details-description">{ event.description }</p>
            </div>
          </div>
        </article>}
      
    </>
  );
}
