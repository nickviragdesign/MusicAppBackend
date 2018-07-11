const SongModel = require('./schemas/song.schema')
const TagModel = require('./schemas/tag.schema')

/*
 * Create
 */

SongModel.addSong = async (songObject, songTags) => {
    try {
        const newSong = new SongModel({
            title: songObject.title,
            tags: songTags, // Must be an array of tags
            description: songObject.description,
            location: songObject.location,
            artist: songObject.artist,
            likes: [],
            comments: []
        })
        return await newSong.save()
    } catch(e) {
        throw e
    }
}

/*
 * Retrieve
 */

SongModel.getSongs = async () => {
    try {
        const getSongs = await SongModel.find({}).exec()
        return getSongs
    } catch(e) {
        throw e
    }
}

SongModel.getSingleSong = async songId => {
    try {
        const getSong = await SongModel.findById(songId).exec()
        return getSong
    } catch(e) {
        throw e
    }
}

SongModel.getSongsByArtist = async artist => {
    try {
        const getSongs = await SongModel.find({ artist: artist }).exec()
        return getSongs
    } catch(e) {
        throw e
    }
}

SongModel.getSongsByTags= async tags => {
    try {
        const getSongs = await SongModel.find({ tags: { $all: tags }}).exec()
        return getSongs
    } catch(e) {
        throw e
    }
}

/*
 * Update
 */

SongModel.updateSong= async (songId, updates) => {
    try {
        const update = await SongModel.findOneAndUpdate(
            { _id: songId },
            { $set: updates },
            { new: true, upsert: true }).exec()
        return update
    } catch(e) {
        throw e
    }
}

/*
 * Delete
 */

SongModel.removeSong= async songId => {
    try {
        const deletedSong = await SongModel.findByIdAndRemove(songId).exec()
        return deletedSong
    } catch(e) {
        throw e
    }
}

module.exports = SongModel
