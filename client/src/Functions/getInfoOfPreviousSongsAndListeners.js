import fetch from "node-fetch";

const getInfoOfPreviousSongsAndListeners = async () => {
  let response = "";

  if (process.env.NODE_ENV === "development") {
    response = await fetch(
      `http://localhost:5000/spotify/functions/getInfoOfPreviousSongsAndListeners`
    );
  } else {
    response = await fetch(
      `/spotify/functions/getInfoOfPreviousSongsAndListeners`
    );
  }

  if (response.status === 200) {
    const responseInJSON = await response.json();
    console.log(responseInJSON);

    return {
      responseStatus: 200,
      responseInJSON,
    };
  } else {
    console.log(response);
  }
};

export default getInfoOfPreviousSongsAndListeners;
