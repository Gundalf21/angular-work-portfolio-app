module.exports = app => {
    const works = require("../controllers/work.controller");

    var router = require("express").Router();

    router.post("/", works.create);
    
    router.get("/", works.findAll);

    router.get("/published", works.findAllPublished);

    router.get("/:id", works.findOne);

    router.put("/:id", works.update);

    router.delete("/:id", works.delete);

    router.delete("/", works.deleteAll);

    app.use('/api/works', router);
};