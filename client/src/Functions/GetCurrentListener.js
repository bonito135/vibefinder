const getCurrentListener = async () => {
  let response = {};

  if (process.env.NODE_ENV === "development") {
    response = await fetch(
      `http://localhost:5000/spotify/functions/getCurrentListener`
    );
  } else {
    response = await fetch(`/spotify/functions/getCurrentListener`);
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
    const { country, display_name, external_urls, images } = responseInJson;

    return {
      country,
      display_name,
      external_urls,
      images,
      responseStatus: 200,
    };
  }
};

export default getCurrentListener;
