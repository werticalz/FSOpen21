const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  // if (request.method === 'DELETE') {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('Authorization: ', request.headers['authorization'])
  logger.info('---')
  // }
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  authorization && authorization.toLowerCase().startsWith("bearer ")
    ? request.token = authorization.slice(7)
    : request.token = null

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  const u = await User.findById(decodedToken.id)

  if (u) {
    request.user = u
  } else {
    request.user = null
  }

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'Token has expired, please login again'
    })
  }

  logger.error(error.message)
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}