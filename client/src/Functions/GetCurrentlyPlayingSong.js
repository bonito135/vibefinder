const getCurrentlyPlayingSong = async () => {
  let response = {};

  if (process.env.NODE_ENV === "development") {
    response = await fetch(
      `http://localhost:5000/spotify/functions/getCurrentlyPlayingSong`
    );
  } else {
    response = await fetch(`/spotify/functions/getCurrentlyPlayingSong`);
  }

  if (response.status === 401) {
    return {
      responseStatus: 401,
    };
  } else if (response.status === 204) {
    return {
      responseStatus: 204,
    };
  } else if (response.status === 200) {
    const responseInJson = await response.json();

    const { name, artists, album, preview_url } = await responseInJson;

    return {
      name,
      artists,
      album,
      preview_url,
      responseStatus: 200,
    };
  }
};

export default getCurrentlyPlayingSong;
