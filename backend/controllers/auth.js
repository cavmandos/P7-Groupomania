const db = require("../dbconnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// IF WE HAVE IMAGE ON /images -> const fs = require("fs");

//Register new account ------------------------------------------------------------

exports.register = (req, res, next) => {
  console.log(req.body);

  const { prenom, nom, email, password } = req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        console.log("Doublon de mails");
      }

      //Bcrypt and insert in database
      let hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ?",
        { prenom: prenom, nom: nom, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            return res
              .status(201)
              .json({ message: "Utilisateur créé avec succès" });
          }
        }
      );
    }
  );
};

//Login -----------------------------------------------------------------------------

exports.login = (req, res, next) => {
  const email = req.body.email;
  let password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password).then((valid) => {
        if (!valid) {
          return res
            .status(404)
            .json({ message: "Le mot de passe ne marche pas" });
        }

        return res.status(200).json({
          userId: result[0].id,
          prenom: result[0].prenom,
          nom: result[0].nom,
          token: jwt.sign({ userId: result[0].id }, process.env.TOKEN, {
            expiresIn: "24h",
          }),
        });
      });
    }

    if (result.length <= 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  });
};

//Delete ------------------------------------------------------------------

exports.deleteUser = (req, res, next) => {
  db.query(
    "DELETE FROM `users` WHERE `id` = ?",
    [req.body.userId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        return res.status(201).json({ message: "Utilisateur supprimé" });
      }
    }
  );
};

//Update ------------------------------------------------------------------------

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const email = req.body.email;
  const bio = req.body.bio;
  const password = req.body.password;
  const image = req.body.image;

  // If new mail
  if (email) {
    db.query(
      `UPDATE users SET email="${email}" WHERE id='${id}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.affectedRows == 0) {
          return res.status(404).json({ message: "Email non trouvé" });
        }
        return res.status(201).json({ message: "Email mis à jour" });
      }
    );
  }

  // If new bio
  if (bio) {
    db.query(`UPDATE users SET bio="${bio}" WHERE id=${id}`, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "Bio non trouvée" });
      }
      return res.status(201).json({ message: "Bio mise à jour" });
    });
  }

  // If new password
  if (password) {
    //Hash the new password
    let hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      `UPDATE users SET password="${hashedPassword}" WHERE id=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.affectedRows == 0) {
          return res.status(404).json({ message: "Mdp non trouvé" });
        }
        return res.status(201).json({ message: "Mdp mis à jour" });
      }
    );
  }

  // If new image
  if (image) {
    db.query(
      `UPDATE users SET image="${image}" WHERE id=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        if (result.affectedRows == 0) {
          return res.status(404).json({ message: "Image non trouvée" });
        }
        return res.status(201).json({
          message: "Image mise à jour",
        });
      }
    );
  }
};

//Get user -------------------------------------------------------------------

exports.getOneUser = (req, res, next) => {
  db.query("SELECT * FROM users WHERE id= ?", req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    if (result.length < 1) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    return res.status(200).json(result);
  });
};

//Get all users -----------------------------------------------------------------

exports.getAllUsers = (req, res, next) => {
  db.query("SELECT * FROM users", function (error, result) {
    if (error) {
      return res.status(400).json({ error: "Utilisateurs non trouvés" });
    }
    return res.status(200).json(result);
  });
};
