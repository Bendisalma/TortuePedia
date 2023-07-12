import mongoose from "mongoose";

const TortueSchema = mongoose.Schema({
  nom: { type: String, required: true },
  nomLatin: { type: String, required: true },
  espece: { type: String, required: true },
  vitesse: { type: Number, required: true },
  habitat: { type: String, required: true },
  alimentation: { type: String, required: true },
  ageMax: { type: Number, required: true },
  image: { type: String, required: true },
  created: {
    type: Date,
    default: new Date(),
  },
});

const Tortue = mongoose.model("Tortue", TortueSchema);
export default Tortue;
