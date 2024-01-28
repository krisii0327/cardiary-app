import { User } from "@/app/models/User";
import { Cars } from "@/app/models/Cars";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);

    const hasID = new URL(req.url).searchParams.get('_id');

    if(!hasID) {
        const cars = await Cars.find();
        return Response.json(cars)
    } else {
        const car = await Cars.findOne({_id: hasID});
        return Response.json(car);
    }

}