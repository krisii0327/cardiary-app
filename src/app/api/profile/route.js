import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    let filterUser = {};

    if(_id) {
        filterUser = {_id};
    }
    else 
    {
        const session = await getServerSession(authOptions);
        const email = session?.userCredentials?.email;
    
        if(!email) {
            return Response.json({});
        }
        filterUser = {email};
    }

    const user = await User.findOne(filterUser).lean();
    const userInfo = await UserInfo.findOne({email: user.email}).lean();

    return Response.json(
        { ...user, ...userInfo }
    )
    
/*     return Response.json(
        true
    ); */
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);

    const data = await req.json();
    const {_id, name, image, ...userInfo} = data;

    let filterUser = {};

    if(_id) {
        filterUser = {_id};
    }
    else 
    {
        const session = await getServerSession(authOptions);
        const email = session?.userCredentials?.email;
    
        if(!email) {
            return Response.json({});
        }
        filterUser = {email};
    }

    const userDoc = await User.updateOne(filterUser, {name, image});
    const userInfoDoc = await UserInfo.findOneAndUpdate({email: filterUser.email}, userInfo, {upsert:true});

/*     return Response.json(
        userInfoDoc
    ); */

    return Response.json(
        true
    );
}