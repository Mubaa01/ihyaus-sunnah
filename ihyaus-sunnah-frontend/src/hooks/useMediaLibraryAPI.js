// src/hooks/useMediaLibraryAPI.js
// Updated hook using real API instead of mock data

import { useEffect, useState } from "react";
import { mediaAPI, playlistsAPI } from "../services/api";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";
import { logAdminActivity } from "../utils/activityLogger";

const useMediaLibraryAPI = (initialFilters = {}) => {
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
    refreshMedia(initialFilters);
    refreshPlaylists();
  }, [JSON.stringify(initialFilters)]);

  useEffect(() => {
    const cleanup = subscribeAdminDataUpdates(() => {
      refreshMedia(initialFilters);
      refreshPlaylists();
    });

    return cleanup;
  }, []);

  const categories = Array.from(
    new Set(mediaItems.map((item) => item.mediaCategory).filter(Boolean))
  ).sort();

  const addMedia = async (data, secretKey) => {
    try {
      const response = await mediaAPI.create(data, secretKey);
      await logAdminActivity({
        type: "media",
        action: "Uploaded media",
        details: `${data.title || "A media item"} was added to the library.`,
        reference: response?.data?._id || response?.data?.id || "",
      });
      await refreshMedia();
      dispatchAdminDataUpdate({ media: true, activities: true });
      return response;
    } catch (err) {
      console.error("Failed to add media:", err);
      throw err;
    }
  };

  const editMedia = async (id, data, secretKey) => {
    try {
      const response = await mediaAPI.update(id, data, secretKey);
      await logAdminActivity({
        type: "media",
        action: "Updated media",
        details: `${data.title || "A media item"} was updated.`,
        reference: id,
      });
      await refreshMedia();
      dispatchAdminDataUpdate({ media: true, activities: true });
      return response;
    } catch (err) {
      console.error("Failed to edit media:", err);
      throw err;
    }
  };

  const removeMedia = async (id, secretKey) => {
    try {
      const existing = mediaItems.find((item) => item._id === id || item.id === id);
      await mediaAPI.delete(id, secretKey);
      await logAdminActivity({
        type: "media",
        action: "Deleted media",
        details: `${existing?.title || "A media item"} was removed from the library.`,
        reference: id,
      });
      await refreshMedia();
      dispatchAdminDataUpdate({ media: true, activities: true });
    } catch (err) {
      console.error("Failed to remove media:", err);
      throw err;
    }
  };

  const addPlaylist = async (data, secretKey) => {
    try {
      const response = await playlistsAPI.create(data, secretKey);
      await logAdminActivity({
        type: "media",
        action: "Created playlist",
        details: `${data.playlistName || "A playlist"} was added.`,
        reference: response?.data?._id || response?.data?.id || "",
      });
      await refreshPlaylists();
      dispatchAdminDataUpdate({ playlists: true, activities: true });
      return response;
    } catch (err) {
      console.error("Failed to add playlist:", err);
      throw err;
    }
  };

  const editPlaylist = async (id, data, secretKey) => {
    try {
      const response = await playlistsAPI.update(id, data, secretKey);
      await logAdminActivity({
        type: "media",
        action: "Updated playlist",
        details: `${data.playlistName || "A playlist"} was updated.`,
        reference: id,
      });
      await refreshPlaylists();
      dispatchAdminDataUpdate({ playlists: true, activities: true });
      return response;
    } catch (err) {
      console.error("Failed to edit playlist:", err);
      throw err;
    }
  };

  return {
    mediaItems,
    playlists,
    categories,
    loading,
    error,

    refreshMedia,
    refreshPlaylists,
    addMedia,
    editMedia,
    removeMedia,
    addPlaylist,
    editPlaylist,
  };
};

export default useMediaLibraryAPI;
