import {models, Schema, model, mongoose} from "mongoose";

const NotesSchema = new Schema({
    short_desc: String,
    long_desc: String,
    price: Number,
    date: Date,
    category: String,
    kilometer: Number,
}, {timestamps : true}
);

const CarsSchema = new Schema({
    owner_id : {
        type: mongoose.Types.ObjectId,
    },
    nameOfTheCar: {
        type: String,
    },
    model: {
        type: String,
    },
    year: {
        type: Number,
    },
    color: {
        type: String,
    },
    licensePlate: {
        type: String,
    },
    description: {
        type: String,
    },
    images: {
        type: [],
    },
    notes: {
        type: [NotesSchema],
    },
},
{
    timestamps: true,
}
);

export const Cars = models?.Cars || model('Cars', CarsSchema);