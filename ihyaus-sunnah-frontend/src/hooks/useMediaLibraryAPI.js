// src/hooks/useMediaLibraryAPI.js
// Updated hook using real API instead of mock data

import { useEffect, useState } from "react";
import { mediaAPI, playlistsAPI } from "../services/api";
import { logActivity } from "../data/mock/activityStore";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";

const useMediaLibraryAPI = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshMedia = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await mediaAPI.getAll(filters);
      setMediaItems(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load media:", err);
      setError(err.message);
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshPlaylists = async (filters = {}) => {
    try {
      const response = await playlistsAPI.getAll(filters);
      setPlaylists(response.data || []);
    } catch (err) {
      console.error("Failed to load playlists:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    refreshMedia();
    refreshPlaylists();

    const cleanup = subscribeAdminDataUpdates(() => {
      refreshMedia();
      refreshPlaylists();
    });

    return cleanup;
  }, []);

  const addMedia = async (data, secretKey) => {
    try {
      const response = await mediaAPI.create(data, secretKey);
      logActivity({
        type: "media",
        action: "Added media",
        details: `${data.title} was added to the media library`,
        reference: response.data?._id || null,
      });
      await refreshMedia();
      dispatchAdminDataUpdate({ media: true });
      return response;
    } catch (err) {
      console.error("Failed to add media:", err);
      throw err;
    }
  };

  const editMedia = async (id, data, secretKey) => {
    try {
      const response = await mediaAPI.update(id, data, secretKey);
      logActivity({
        type: "media",
        action: "Updated media",
        details: `${data.title} was updated`,
        reference: id,
      });
      await refreshMedia();
      dispatchAdminDataUpdate({ media: true });
      return response;
    } catch (err) {
      console.error("Failed to edit media:", err);
      throw err;
    }
  };

  const removeMedia = async (id, secretKey) => {
    try {
      const existing = mediaItems.find((item) => item._id === id);
      await mediaAPI.delete(id, secretKey);
      logActivity({
        type: "media",
        action: "Removed media",
        details: `${existing?.title || "A media item"} was deleted`,
        reference: id,
      });
      await refreshMedia();
      dispatchAdminDataUpdate({ media: true });
    } catch (err) {
      console.error("Failed to remove media:", err);
      throw err;
    }
  };

  const addPlaylist = async (data, secretKey) => {
    try {
      const response = await playlistsAPI.create(data, secretKey);
      logActivity({
        type: "playlist",
        action: "Created playlist",
        details: `${data.playlistName} was created`,
        reference: response.data?._id || null,
      });
      await refreshPlaylists();
      dispatchAdminDataUpdate({ playlists: true });
      return response;
    } catch (err) {
      console.error("Failed to add playlist:", err);
      throw err;
    }
  };

  return {
    mediaItems,
    playlists,
    loading,
    error,

    refreshMedia,
    refreshPlaylists,
    addMedia,
    editMedia,
    removeMedia,
    addPlaylist,
  };
};

export default useMediaLibraryAPI;
