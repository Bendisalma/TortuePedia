import fs from "fs/promises";

import Tortue from "../models/tortueModel.js";

export class API {
  static async getAllTortues(req, res) {
    try {
      const tortues = await Tortue.find();
      res.status(200).json(tortues);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  static async createTortue(req, res) {
    const tortue = req.body;
    const imagename = req.file.filename;
    tortue.image = imagename;
    

    try {
      await Tortue.create(tortue);

      res.status(201).json({ message: "Tortue bien enregistrée" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async findTortueById(req, res) {
    const id = req.params.id;
    try {
      const tortue = await Tortue.findById(id);
      res.status(200).json(tortue);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  static async updateTortue(req, res) {
    const id = req.params.id;
    let newImage = "";
    if (req.file) {
      newImage = req.file.filename;
      try {
        // Supprimer l'ancienne image uniquement si une nouvelle image est téléchargée
        fs.unlink("./uploads/" + req.body.oldImage);
      } catch (err) {
        console.log(err);
      }
    } else {
      newImage = req.body.oldImage;
    }
    const newTortue = req.body;
    newTortue.image = newImage;
    try {
      await Tortue.findByIdAndUpdate(id, newTortue);
      res.status(200).json({ message: "Tortue mise à jour avec succès" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  // static async updateTortue(req, res) {
  //   const id = req.params.id;
  //   let newImage = "";
  //   if (req.file) {
  //     newImage = req.file.filename;
  //     try {
  //       // Supprimer l'ancienne image uniquement si une nouvelle image est téléchargée
  //       const tortue = await Tortue.findById(id);
  //       //retourne tortue qui l'id : id
  //       const imagePath = tortue.image;
  //       fs.unlink("./uploads/" + imagePath);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     newImage = req.body.image;
  //   }
  //   const newTortue = req.body;
  //   newTortue.image = newImage;
  //   try {
  //     await Tortue.findByIdAndUpdate(id, newTortue);
  //     res.status(200).json({ message: "Tortue mise à jour avec succès" });
  //   } catch (err) {
  //     res.status(404).json({ message: err.message });
  //   }
  // }
  static async DeleteTortue(req, res) {
    const id = req.params.id;
    try {
      const result = await Tortue.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlink("./uploads/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({ message: "Tortue bien supprimée" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
