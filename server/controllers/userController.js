import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export class USER {
  static async signup(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = new User({
        username,
        email,
        password,
      });

      await user.validate(); // Exécuter la validation de l'utilisateur

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;

      await user.save();

      res.status(201).json({ message: "Utilisateur créé !" });
    } catch (error) {
      if (error.name === "ValidationError") {
        // Gérer les erreurs de validation uniques
        if (error.errors.email && error.errors.email.kind === "unique") {
          const existingEmail = error.errors.email.value;
          const errorMessage = `L'adresse e-mail "${existingEmail}" est déjà utilisée.`;
          return res.status(400).json({ message: errorMessage });
        }
        if (error.errors.username && error.errors.username.kind === "unique") {
          const existingUsername = error.errors.username.value;
          const errorMessage = `Le nom d'utilisateur "${existingUsername}" est déjà utilisé.`;
          return res.status(400).json({ message: errorMessage });
        }
      }

      res.status(500).json({ error: "Une erreur s'est produite lors de la création de l'utilisateur." });
    }
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
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}
