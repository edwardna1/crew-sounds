import { useSpotify } from "@/lib/session";
import spotifyApi from "@/lib/spotify";
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
    }
    catch (err) {
        console.log(err)
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
    }
    catch (err) {
        console.log(err)
        return {};
    }

}