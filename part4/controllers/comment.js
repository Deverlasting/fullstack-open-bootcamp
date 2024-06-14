const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment.find({})
    response.json(comments)
})

module.exports = commentsRouter