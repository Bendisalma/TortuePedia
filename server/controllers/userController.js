import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export class USER {
  static async signup(req, res, next) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() =>
            res.status(201).json({
              message: "Utilisateur créé !",
            })
          )
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => {
        res.status(500).json({ error });
        
      });
  }

  static async login(req, res, next) {
    try {
      const { email, username, password } = req.body;

      let user;
      // Recherche de l'utilisateur par email ou par nom d'utilisateur
      if (email) {
        user = await User.findOne({ email });
      } else if (username) {
        user = await User.findOne({ username });
      }

      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }

      const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      });

      res.status(200).json({
        userId: user._id,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
