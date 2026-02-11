import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query'

import { fetchEvents } from '../utils/http.js';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function NewEventsSection() {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: ({signal}) => fetchEvents({signal, max:3})
  })

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    console.log(error)
    content = (
      <ErrorBlock title="An error occurred" message="Failed to fetch events" />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
