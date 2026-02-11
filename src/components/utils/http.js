import { QueryClient } from '@tanstack/react-query';

import SERVER_URL from "../../host.js";

export const queryClient = new QueryClient();


// const SERVER_URL = hostURL + '/events';



export async function fetchEvents({searchText, max, signal}) {
	let url = SERVER_URL;

	if( searchText && max) {
		url += '?search=' + searchText + '&max=' + max
	} else if ( searchText ) {
		url += '?search=' + searchText
	} else if ( max ) {
		url += '?max=' + max
	}

	console.log("fetching events: ", url)
	const response = await fetch(url, signal)

	if (!response.ok) {
		const error = new Error('An error occurred while fetching the events');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const { events } = await response.json();
	return events;
}





export async function fetchFormImages({ signal }) {
	const response = await fetch(SERVER_URL + '/images', { signal })

	if (!response.ok) {
		const error = new Error('An error occurred while fetching the images');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const { images } = await response.json();
	return images;
}





export async function createNewEvent(formData) {
	const response = await fetch(SERVER_URL, {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	console.log("Response", await response.json())
}


export async function fetchEvent({queryKey, signal}) {
	const response = await fetch(SERVER_URL + '/' + queryKey[1].split('=')[1], { signal })

	if (!response.ok) {
		const error = new Error('An error occurred while fetching the images');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const { event } = await response.json();
	return event;
}



export async function deleteEvent({id}) {
	const response = await fetch(SERVER_URL + '/' + id, {
		method: 'DELETE'
	})

	if (!response.ok) {
		const error = new Error('An error occurred while fetching the images');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	return await response.json();
}



export async function updateEvent({id, event}) {

	const response = await fetch(SERVER_URL + '/' + id, {
		method: 'PUT',
		body: JSON.stringify({ event }),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	if (!response.ok) {
		const error = new Error('An error occurred while fetching the images');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const res = await response.json();


	// const qcObj = queryClient.fetchQuery({
	// 	queryKey: ['events', 'id=' + id],
	// 	queryFn: fetchEvent,
	// 	staleTime: 5000
	// })

	console.log(res)

	return res;
}