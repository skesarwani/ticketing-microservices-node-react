import mongoose from 'mongoose';
import { IUserAttrs, IUserModel, IUserDoc } from './contracts/user-contracts';
import { Password } from '../services/password';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (done) {
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: IUserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User };