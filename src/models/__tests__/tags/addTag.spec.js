const mongoose = require('mongoose')
const TagModel = require('../../tag.model')

const newTags = [{tag: 'tag1'},{tag: 'tag2'}]
const anotherTag = [{tag: 'tag3'}]

describe('Test the insertion of three tags', () => {

    let tagId_1 = ''
    let tagId_2 = ''
    let tagId_3 = ''

    beforeAll(async () => {
        try {
            const dbc = await mongoose.connect('mongodb://127.0.0.1:27017/testing')
            console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        } catch(e) {
            console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        }
    })

    test('New tags should be added, and duplicates should not', async () => {
        try {
            const saveTags = await TagModel.addTag(newTags)
            tagId_1 = saveTags[0]._id
            tagId_2 = saveTags[1]._id
            expect(saveTags.length).toBe(2)

            const saveAnother = await TagModel.addTag(anotherTag)
            tagId_3 = saveAnother[0]._id
            expect(saveAnother.length).toBe(1)

            const saveDuplicate = await TagModel.addTag([newTags[1]])
            expect(saveDuplicate.length).toBe(0)
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    afterEach(async () => {
        try {
            const removeTag_1 = await TagModel.findByIdAndRemove(tagId_1).exec()
            const removeTag_2 = await TagModel.findByIdAndRemove(tagId_2).exec()
            const removeTag_3 = await TagModel.findByIdAndRemove(tagId_3).exec()
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })
})
