const db = require("../models");
const Work = db.work;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.workName) {
        res.status(400).send({
            message: "Content should contain something."
        });
        return;
    }

    const works = {
        workName: req.body.workName,
        clientName: req.body.clientName,
        description: req.body.description,
        image: req.body.image ? req.body.image : '',
        published: req.body.published ? req.body.published : false
    };

    Work.create(works)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while creating the entry."
            });
        });
};

exports.findAll = (req, res) => {
    const workName = req.query.workName;
    var condition = workName ? { workName: { [Op.like]: `%${title}%` } } : null;

    Work.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while creating the entry."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Work.findOne({where: { id: id}})
        .then(data => {
            if (!data) {
                // Handle case where no record is found
                res.status(404).send({
                    message: "No portfolio entry found with id= " + id
                });
            } else {
                res.send(data);
            }
        
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while retrieving portfolio entry with id= " + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Work.update(req.body, {
        where: { id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Portfolio entry updated succesfully!"
                });
            }   else {
                res.send({
                    message: `Cannot update portfolio entry with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating portfolio entry with id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Work.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Portfolio entry deleted."
                });
            }   else {
                res.send({
                    message: `Cannot delete portfolio entry with id=${id}. Maybe it was not found...`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete portfolio entry with id= " + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Work.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} portfolio entries where successfully deleted.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while removing all portfolio entries."
            });
        });
};

exports.findAllPublished = (req, res) => {
    Work.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving all portfolio entries."
            })
        })
};