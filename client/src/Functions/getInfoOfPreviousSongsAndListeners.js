const getInfoOfPreviousSongsAndListeners = async (limit) => {
  let response = {};

  if (limit) {
    if (process.env.NODE_ENV === "development") {
      response = await fetch(
        `http://localhost:5000/spotify/functions/getInfoOfPreviousSongsAndListeners?limit=${limit}`
      );
    } else {
      response = await fetch(
        `/spotify/functions/getInfoOfPreviousSongsAndListeners?limit=${limit}`
      );
    }
  } else {
    if (process.env.NODE_ENV === "development") {
      response = await fetch(
        `http://localhost:5000/spotify/functions/getInfoOfPreviousSongsAndListeners`
      );
    } else {
      response = await fetch(
        `/spotify/functions/getInfoOfPreviousSongsAndListeners`
      );
    }
  }

  if (response.status === 200) {
    const responseInJSON = await response.json();

    return {
      responseStatus: 200,
      responseInJSON,
    };
  } else if (response.status === 204) {
    return { responseStatus: 204 };
  }
};

export default getInfoOfPreviousSongsAndListeners;
