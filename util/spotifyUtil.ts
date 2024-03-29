import { getCurrentUser, useSpotify } from "@/lib/session";
import spotifyApi from "@/lib/spotify";
import { getAverageColor } from "fast-average-color-node";
import { Session } from "next-auth/core/types";
import types from "spotify-web-api-node/index";
const Vibrant = require("node-vibrant");
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
export async function printAverageColor(image: any) {
  const color = await getAverageColor(image);
  // console.log(color.hex);
  return color.hex;
}

export async function wordMap(artists: SpotifyApi.UsersTopArtistsResponse[]) {
  const wordMap = await Promise.all(
    artists.map(async (artist: any, index: number) => {
      // let color = await printAverageColor(artist.images[0].url);
      let topArtists = index < 5
      let colorV = await Vibrant.from(artist.images[0].url)
        .getPalette()
        .then((palette: any) => {
          // console.log(palette)
          return  [palette.Vibrant.rgb, palette.DarkMuted.rgb];
        });
      let wordSize = 0;
      wordSize = 70 - index * 5;
      if (wordSize < 25) {
        wordSize = 25;
      }
      let finalColor = "rgb(" + colorV[0]?.toString() + ")";
      let shadow = "rgb(" + colorV[1]?.toString() + ")";
      // console.log("c", color);
      return {
        name: artist.name,
        size: wordSize,
        color: finalColor,
        shadow: shadow
      };
    })
  );
  return wordMap;
}
