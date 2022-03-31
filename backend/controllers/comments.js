const db = require("../dbconnect");

// GET All Comments ----------------------------------------------------

exports.getAllComments = (req, res, next) => {
  db.query(`SELECT * FROM comments ORDER BY id ASC`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(200).json(result);
  });
};

// GET ONE Comment -------------------------------------------------------

exports.getOneComment = (req, res, next) => {
  const id = req.params.id;
  db.query(`SELECT * FROM comments WHERE id= ?`, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    if (result.length < 1) {
      return res.status(404).json({ message: "Commentaire non-trouvé" });
    }
    return res.status(200).json(result);
  });
};

// CREATE a NEW Comment ---------------------------------------------------

exports.createComment = (req, res, next) => {
  const content = req.body.content;
  const userId = req.body.userId;
  const postId = req.body.postId;
  const nom = req.body.nom;
  const prenom = req.body.prenom;

  db.query(
    `INSERT INTO comments (content, userId, postId, nom, prenom, date) VALUES ("${content}", "${userId}", "${postId}", "${nom}", "${prenom}", now())`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      console.log(result);
      return res.status(201).json({ message: "Commentaire créé" });
    }
  );
};

// UPDATE Comment (not allow but it works) ----------------------------------

exports.updateComment = (req, res, next) => {
  const id = req.params.id;
  const content = req.body.content;

  db.query(
    `UPDATE comments SET content='${content}' WHERE id='${id}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "Commentaire non trouvé" });
      }
      console.log(result);
      return res.status(200).json({ message: "Commentaire mis à jour" });
    }
  );
};

// DELETE Comment -----------------------------------------------------------

exports.deleteComment = (req, res, next) => {
  db.query(`DELETE FROM comments WHERE id= ?`, req.body.id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    return res.status(200).json({ message: "Commentaire supprimé" });
  });
};
