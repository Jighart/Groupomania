const postModel = require('../models/post.model')
const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const { uploadErrors } = require('../utils/errors.utils')
const ObjectID = require('mongoose').Types.ObjectId
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error to get data : ' + err)
    }).sort({ createdAt: -1 })
}

module.exports.createPost = async (req, res) => {
    let fileName

    const MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpeg',
        'image/png': 'png',
    }

    const extension = MIME_TYPES[req.file.detectedMimeType]

    if (req.file !== null) {
        try {
            if (
                req.file.detectedMimeType != 'image/jpg' &&
                req.file.detectedMimeType != 'image/png' &&
                req.file.detectedMimeType != 'image/jpeg'
            )
                throw Error('invalid file')

            if (req.file.size > 5000000) throw Error('max size')
        } catch (err) {
            const errors = uploadErrors(err)
            return res.status(201).json({ errors })
        }
        fileName = req.body.posterId + Date.now() + '.' + extension

        await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}/../client/public/uploads/posts/${fileName}`))
    }

    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? './uploads/posts/' + fileName : '',
        likers: [],
    })

    try {
        const post = await newPost.save()
        return res.status(201).json(post)
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send('ID unknown : ' + req.params.id)

    const updatedRecord = {
        message: req.body.message,
    }

    PostModel.findByIdAndUpdate(req.params.id, { $set: updatedRecord }, { new: true }, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Update error : ' + err)
    })
}

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send('ID unknown : ' + req.params.id)

    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Delete error : ' + err)
    })
}

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err)
            }
        )
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err)
            }
        )
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}
