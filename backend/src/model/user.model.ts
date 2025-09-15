import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp:{
        expiry: {
            type: Date,
            default: null,
        },
        code: {
            type: String,
            default: null,
        },
    }
}, {
    timestamps: true,
})


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);



export default User;