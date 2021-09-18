const saveSongAndListenerToDatabase = async (
  song,
  artists,
  album,
  preview_url,
  nameOfListener,
  countryOfListener,
  imageURLOfListener,
  sort_by_date
) => {
  let response = {};

  const params = {
    song,
    artists,
    album,
    preview_url,
    nameOfListener,
    countryOfListener,
    imageURLOfListener,
    sort_by_date,
  };

  const bodyInJSON = JSON.stringify(params);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyInJSON,
  };

  if (process.env.NODE_ENV === "development") {
    response = await fetch(
      `http://localhost:5000/spotify/functions/saveSongAndListenerToDatabase`,
      fetchOptions
    );
  } else {
    response = await fetch(
      `/spotify/functions/saveSongAndListenerToDatabase`,
      fetchOptions
    );
  }

  if (response.status === 200) {
    const responseInJSON = await response.json();

    return {
      responseStatus: 200,
      responseInJSON,
    };
  }
};

export default saveSongAndListenerToDatabase;
