const mongodb = require('../models/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('students').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const studentId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('students').find({_id:studentId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

const addStudent = async (req, res) => {
    const student = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        birthday: req.body.birthday,
        education: {
            school: req.body.education.school,
            degree: req.body.education.degree,
            startdate: req.body.education.startdate,
            enddate: req.body.education.enddate,
            gpa: req.body.education.gpa
        }
    };

    const response = await mongodb.getDb().db().collection('students').insertOne(student);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || "an error occured while adding the student.");
        console.log(contact)
    }
}

module.exports = {
    getAll,
    getSingle,
    addStudent
};