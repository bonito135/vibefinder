import getCurrentListener from "./GetCurrentListener";
import getCurrentlyPlayingSong from "./GetCurrentlyPlayingSong";
import saveSongAndListenerToDatabase from "./SaveSongAndListenerToDatabase";

const getCurrentlyPlayingSongAndListenerAndSaveToDB = async () => {
  const ListenerInfo = await getCurrentListener();
  const SongInfo = await getCurrentlyPlayingSong();

  if (ListenerInfo.responseStatus === 200) {
    return ListenerInfo;
  }

  if (SongInfo.responseStatus !== 200) {
    console.log("No song is playing");
  }

  if (ListenerInfo.responseStatus === 200 && SongInfo.responseStatus === 200) {
    const { display_name, country, images } = ListenerInfo;
    const { name, artists, album, preview_url } = SongInfo;

    const resultOfSaveSongAndListenerToDatabase = await saveSongAndListenerToDatabase(
      name,
      artists,
      album,
      preview_url,
      display_name,
      country,
      images
    );

    if (resultOfSaveSongAndListenerToDatabase.responseStatus === 200) {
      console.log(resultOfSaveSongAndListenerToDatabase.responseInJSON);
    }

    return {
      ListenerInfo: ListenerInfo,
      SongInfo: SongInfo,
    };
  }
};

export default getCurrentlyPlayingSongAndListenerAndSaveToDB;
