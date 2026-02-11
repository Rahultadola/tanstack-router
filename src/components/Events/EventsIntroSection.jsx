import { Link } from 'react-router-dom';

import meetupImg from '../../assets/meetup.jpg';

export default function EventsIntroSection({showAllEvents}) {
  return (
    <section
      className="content-section"
      id="overview-section"
      style={{ backgroundImage: `url(${meetupImg})` }}
    >
      <h2>
        Connect with amazing people <br />
        or <strong>find a new passion</strong>
      </h2>
      <p>Anyone can organize and join events on React Event!</p>
      <p>
        <button onClick={showAllEvents} className="button">
          All Events
        </button>
      </p>
    </section>
  );
}
