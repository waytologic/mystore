import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        statusCode:{type: Number},
         __v: { type: Number, select: false}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUserModel>('users', UserSchema);
