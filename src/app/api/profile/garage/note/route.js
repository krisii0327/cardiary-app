import { User } from "@/app/models/User";
import { Cars } from "@/app/models/Cars";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {email, id, ...data} = await req.json();
    const result = await Cars.updateOne({_id: id}, {
        $push:{notes:{...data}, upsert: true}
    })

    return Response.json(true)
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { car_id, note_id, ...data } = await req.json();

    const noteDoc = await Cars.findOneAndUpdate(
        { _id: car_id, 'notes._id': note_id },
        { $set: 
            { 
                'notes.$.short_desc': data.short_desc, 
                'notes.$.category': data.category, 
                'notes.$.price': data.price, 
                'notes.$.long_desc': data.long_desc, 
                'notes.$.date': data.date, 
                'notes.$.kilometer': data.kilometer, 
                'notes.$.updatedAt': new Date(),
            } 
        },
    );

    return Response.json(
        true
    );
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const note_id = new URL(req.url).searchParams.get('_id');
    const car_id = await req.json();
    const remove = await Cars.updateOne({_id: car_id}, {
        $pull:{notes: {_id: note_id}}
    })

    return Response.json(true);
}