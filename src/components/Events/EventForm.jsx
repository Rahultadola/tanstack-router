import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchFormImages } from '../utils/http.js';

import ImagePicker from '../ImagePicker.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';


export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);


  const {data: images, isLoading, isError, error } = useQuery({
    queryKey: ['form-images'],
    queryFn: fetchFormImages
  })

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data, image: selectedImage });
  }

  let imagesContent

  if( isLoading ) {
    imagesContent = <LoadingIndicator />
  }

  if( isError ) {
    imagesContent = <ErrorBlock title='' message="Error loading images."/>
  }


  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? 'Music Festival'}
        />
      </p>

      <div className="control">
        { !images && imagesContent }
        { images && <ImagePicker
          images={images}
          onSelect={handleSelectImage}
          selectedImage={selectedImage}
        />}

      </div>

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? 'A new music festival in indore.'}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? '05-02-2026'}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? '05:00 pm'}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? 'Indore'}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
