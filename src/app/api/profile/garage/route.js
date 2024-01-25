import { User } from "@/app/models/User";
import { Cars } from "@/app/models/Cars";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {email, ...data} = await req.json();
    const {_id} = await User.findOne({email})
    
    const carData = {owner_id: _id, ...data}
    const carDoc = await Cars.create(carData);

    return Response.json(true)
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session?.userCredentials?.email;
    const hasID = new URL(req.url).searchParams.get('_id');

    if(!hasID) {
        const {_id} = await User.findOne({email})
        const cars = await Cars.find({owner_id: _id})
        return Response.json(cars)
    } else {
        const car = await Cars.find({_id: hasID})
        return Response.json(car)
    }
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, nameOfTheCar, year, model, description, licensePlate, color, images } = await req.json();
    console.log(images)
    const carDoc = await Cars.findByIdAndUpdate(_id, {nameOfTheCar, year, model, description, color, licensePlate, images})

    return Response.json(true);
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const _id = new URL(req.url).searchParams.get('_id');
    const deleted = await Cars.deleteOne({_id});

    return Response.json(true)
}