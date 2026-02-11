import { Link, Outlet } from 'react-router-dom';

import { useState } from 'react';

import Header from '../Header.jsx';
import EventsIntroSection from './EventsIntroSection.jsx';
import FindEventSection from './FindEventSection.jsx';
import NewEventsSection from './NewEventsSection.jsx';

export default function Events() {
  const [allEvents, setAllEvents] = useState(false)
  
  function handleAllEventToggle() {
    setAllEvents((prevState) => !prevState)
  }
  
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events/new" className="button">
          New Event
        </Link>
      </Header>
      <main>
        <EventsIntroSection showAllEvents={handleAllEventToggle}/>
        {!allEvents && <NewEventsSection />}
        <FindEventSection allEvents={allEvents}/>
      </main>
    </>
  );
}
