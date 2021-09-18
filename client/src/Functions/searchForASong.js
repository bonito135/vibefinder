const searchForASong = async (song) => {
  let response = {};

  const params = { song };

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
      `http://localhost:5000/spotify/functions/searchForASong`,
      fetchOptions
    );
  } else {
    response = await fetch(`/spotify/functions/searchForASong`, fetchOptions);
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

    const responseToReturn = responseInJson.tracks.items;

    return {
      responseToReturn,
      responseStatus: 200,
    };
  }
};

export default searchForASong;
