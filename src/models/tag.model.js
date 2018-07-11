const TagModel = require('./schemas/tag.schema')

/*
 * Retrieve
 */

TagModel.getTags = async () => {
    try {
        const findTags = await TagModel.find({}).exec()
        return findTags
    } catch(e) {
        throw e
    }
}

/*
 * Create
 */

TagModel.addTag = async tags => {
    try {
        const uniqueTags = []
        for (let i in tags) {
            const findTag = await TagModel.find(tags[i]).exec()
            if (findTag.length == 0) {
                uniqueTags.push(tags[i])
            }
        }
        const saveTags = await TagModel.insertMany(uniqueTags)
        return saveTags
    } catch(e) {
        throw e
    }
}

/*
 * Delete
 */

TagModel.removeTag = async tagID => {
    try {
        const deleteTag = await TagModel.findByIdAndRemove(tagID)
        return deleteTag
    } catch(e) {
        throw e
    }
}

module.exports = TagModel;
