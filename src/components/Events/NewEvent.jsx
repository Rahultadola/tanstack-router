import { Link, useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { queryClient, createNewEvent } from '../utils/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';

export default function NewEvent() {
  const navigate = useNavigate();
  
  const { mutate, isPending } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      console.log("function executed!")
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events')
    }
  });

  function handleSubmit(formData) {
    mutate({ event: formData })
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        { isPending && "Submitting..." }
        { !isPending && 
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        }
      </EventForm>
    </Modal>
  );
}
