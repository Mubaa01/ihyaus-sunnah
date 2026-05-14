import { Media } from "../models/Media.js";
import { Playlist } from "../models/Playlist.js";

export const createMedia = async (req, res) => {
  try {
    const media = await Media.create(req.body);
    res.status(201).json({ success: true, message: "Media created successfully", data: media });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllMedia = async (req, res) => {
  try {
    const { category, type, staffId, playlistId, visibility, search } = req.query;
    const filter = {};
    if (category) filter.mediaCategory = category;
    if (type) filter.type = type;
    if (staffId) filter.staffId = staffId;
    if (playlistId) filter.playlistId = playlistId;
    if (visibility) filter.visibility = visibility;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }

    const media = await Media.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Media.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Media not found" });
    res.json({ success: true, message: "Media updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Media.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Media not found" });
    res.json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Playlist Controllers
export const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.status(201).json({ success: true, message: "Playlist created successfully", data: playlist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPlaylists = async (req, res) => {
  try {
    const { trusteeId, mediaType } = req.query;
    const filter = {};
    if (trusteeId) filter.trusteeId = trusteeId;
    if (mediaType) filter.mediaType = mediaType;

    const playlists = await Playlist.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
