import { Album } from '../models/album.model.js';
import { Song } from '../models/song.model.js';
import { uploadToImageKit } from '../utils/uploadToImageKit.js';

// SONGS *********************************************************************************

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: 'Please upload all files' });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    // Upload files to ImageKit
    const audioUrl = uploadToImageKit(audioFile);
    const imageUrl = uploadToImageKit(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    // If song belongs to an album, update the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log('Error in create song', error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (!song) {
      return res
        .status(404)
        .json({ message: 'There are no songs with that ID' });
    }

    // if song belongs to an album, update the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { song: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.log('Error in delete song', error);
    next(error);
  }
};

// ALBUMS ******************************************************************************
export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = uploadToImageKit(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log('Error in create album', error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.log('Error in delete album', error);
    next(error);
  }
};

// CHECK ADMIN **********************************************************
export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
