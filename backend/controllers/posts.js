const db = require("../dbconnect");

//GET ALL posts --------------------------------------------------------------

exports.getAllPosts = (req, res, next) => {
  db.query("SELECT * FROM posts ORDER BY id DESC", function (error, result) {
    if (error) {
      return res.status(400).json({ error: "Publications non trouvées" });
    }
    return res.status(200).json(result);
  });
};

//GET ONE post ----------------------------------------------------------------

exports.getOnePost = (req, res, next) => {
  db.query(
    `SELECT * FROM posts WHERE id= ?`,
    req.params.id,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.length < 1) {
        return res.status(404).json({ message: "Publication non trouvée" });
      }
      return res.status(200).json(result);
    }
  );
};

//CREATE a new post ----------------------------------------------------------

exports.createPost = (req, res, next) => {
  const content = req.body.content;
  const userId = req.body.userId;
  const image = req.body.image;
  const prenom = req.body.prenom;
  const nom = req.body.nom;

  if (image) {
    db.query(
      `INSERT INTO posts (content, image, userId, prenom, nom, date) VALUES ("${content}", "${image}", "${userId}", "${prenom}", "${nom}", now() )`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        return res
          .status(201)
          .json({ message: "Publication créée avec une image associée" });
      }
    );
  } else {
    db.query(
      `INSERT INTO posts (content, userId, prenom, nom, date) VALUES ("${content}", "${userId}", "${prenom}", "${nom}", now() )`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        return res.status(201).json({ message: "Publication créée" });
      }
    );
  }
};

//UPDATE Post ---------------------------------------------------------------

exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  const content = req.body.content;
  const image = req.body.image;

  if (image) {
    db.query(
      `UPDATE posts SET image='${image}', content='${content}' WHERE id='${id}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.affectedRows == 0) {
          return res.status(404).json({ message: "Publication non trouvée" });
        }
        return res.status(200).json({ message: "Publication mise à jour" });
      }
    );
  } else {
    db.query(
      `UPDATE posts SET content='${content}', WHERE id='${id}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.affectedRows == 0) {
          return res.status(404).json({ message: "Publication non trouvée" });
        }
        return res
          .status(200)
          .json({ message: "Publication mise à jour avec son image" });
      }
    );
  }
};

//DELETE Post ---------------------------------------------------------------------

exports.deletePost = (req, res, next) => {
  const id = req.body.id;

  db.query(`DELETE FROM posts WHERE id= ?`, id, (err, result) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "Publication non trouvée" });
    }
    return res.status(200).json({ message: "Publication supprimée" });
  });
};
