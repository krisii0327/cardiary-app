import {models, Schema, model} from "mongoose";

const UserInfoSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    streetAddress: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps : true,
});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema)