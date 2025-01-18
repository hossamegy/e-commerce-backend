const users = require('../models/user');
const statusCode = require('http-status-codes');
const { CustomError, badRequest } = require('../errors/export-errors');
const asyncWrapper = require('../middleware/async-wrapper');

const getAllUsers = asyncWrapper(async(req, res) => {
    const user = await users.find({ });
    if(!user) throw  new CustomError('Not found any users in database', statusCode.BAD_REQUEST)
    res.status(statusCode.OK).json({ message: user });
});

const CreateUser = asyncWrapper(async(req, res) => {
    const { firstname, lastname, email, gender, Password, birthdate } = req.body;
    res.status(statusCode.OK).json('CreateUser');
});

const updateUser = asyncWrapper(async(req, res) => {
    res.status(statusCode.OK).json('updateUser');
});

const replaceUser = asyncWrapper(async(req, res) => {
    res.status(statusCode.OK).json('replaceUser');
});

const deleteUser = asyncWrapper(async(req, res) => {
    res.status(statusCode.OK).json('deleteUser');
});

const getInfoUser = asyncWrapper(async(req, res) => {
    res.status(statusCode.OK).json('getInfoUser');
});

module.exports = {
    getAllUsers,
    CreateUser,
    updateUser,
    replaceUser,
    deleteUser,
    getInfoUser
}