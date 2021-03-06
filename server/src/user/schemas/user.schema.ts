import { model, Model, Schema } from 'mongoose';
import { IUserModel } from '../interfaces/user.model';

export const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        age: Number,
        country: String,
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Not Specified'],
            default: 'Not Specified'
        },
        nameFirst: String,
        nameLast: String
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    hasBoard: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

UserSchema.virtual('profile.name').get(function () {
    return `${this.profile.nameFirst} ${this.profile.nameLast}`;
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema) as Model<IUserModel>;