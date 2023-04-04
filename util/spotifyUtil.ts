import { useSpotify } from "@/lib/session";
import spotifyApi from "@/lib/spotify";
import types from "spotify-web-api-node/index";
export class SpotifyService {
  async getPlaylistData() {
    try {
      if (spotifyApi.getAccessToken()) {
        console.log("im here");
        return await spotifyApi.getUserPlaylists().then((data: any) => {
          console.log("success");
          return data.body.items;
        });
        // return playlistData
      }
    } catch (err) {
      console.log(err);
      return {};
    }
  }
  async getTopTracks() {
    try {
      if (spotifyApi.getAccessToken()) {
        console.log("im here");
        return await spotifyApi.getMyTopTracks().then((data: any) => {
          console.log("success");
          return data.body.items;
        });
        // return playlistData
      }
    } catch (err) {
      console.log(err);
      return {};
    }
  }
  async getTopArtists(
    timeFrame: "long_term" | "medium_term" | "short_term" | undefined
  ) {
    try {
      if (spotifyApi.getAccessToken()) {
        console.log("im here");
        return await spotifyApi
          .getMyTopArtists({ time_range: timeFrame })
          .then((data: any) => {
            console.log("success");
            return data.body.items;
          });
        // return playlistData
      }
    } catch (err) {
      console.log(err);
      return {};
    }
  }
}
export async function getPlaylistData() {
  try {
    if (spotifyApi.getAccessToken()) {
      console.log("im here");
      return await spotifyApi.getUserPlaylists().then((data: any) => {
        console.log("success");
        return data.body.items;
      });
      // return playlistData
    }
  } catch (err) {
    console.log(err);
    return {};
  }
}

export async function getTopTracks() {
  try {
    if (spotifyApi.getAccessToken()) {
      console.log("im here");
      return await spotifyApi.getMyTopTracks().then((data: any) => {
        console.log("success");
        return data.body.items;
      });
      // return playlistData
    }
  } catch (err) {
    console.log(err);
    return {};
  }
}
