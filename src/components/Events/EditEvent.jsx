import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchEvent, updateEvent, queryClient } from '../utils/http.js';

import Modal from '../UI/Modal.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import EventForm from './EventForm.jsx';


export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: event, isLoading, isError, error } = useQuery({
    queryKey: ['events', 'id=' + id],
    queryFn: fetchEvent
  })


  const { mutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const queryId = ["events", "id=" + id]
      const newEvent = data.event;

      await queryClient.cancelQueries({
        queryKey: queryId
      });

      const prevEvent = queryClient.getQueryData(queryId)       
      queryClient.setQueryData(queryId, newEvent)

      return {prevEvent, queryId} 
    },

    onError: (error, data, context) => {
      queryClient.setQueryData(context.queryId, context.prevEvent)
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
    }
  })



  function handleSubmit(formData) {
    mutate({id, event: formData});
    navigate('../')
  }



  function handleClose() {
    navigate('../');
  }


  if( isLoading ) {
    return <Modal onClose={handleClose}>
      <LoadingIndicator />
    </Modal>
  }

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={event} onSubmit={handleSubmit}>
        { updateLoading && "Submitting..."}
        { !updateLoading && <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </>}
      </EventForm>
    </Modal>
  );
}
