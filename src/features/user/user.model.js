import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validator from 'validator';
import { PasswordValidator } from '../../core/validation/index.js';


/**
 * User Schema
 */
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator(value) {
                    return validator.isEmail(value);
                },
                message() {
                    return 'Invalid email';
                },
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate: {
                validator(value) {
                    const validation = PasswordValidator.validate(value);
                    return validation.error === null;
                },
                message(props) {
                    const validation = PasswordValidator.validate(props.value);
                    return validation.error;
                },
            }
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        statics: {
            async isEmailTaken(email, userId = undefined) {
                return !!(
                    await this.findOne({ email, _id: { $ne: userId } }).exec()
                );
            },
        },
        methods: {
            async isPasswordMatch(password) {
                return await bcrypt.compare(password, this.password);
            },

            toPlainObject() {
                return {
                    id: this.id,
                    email: this.email,
                    role: this.role,
                    isVerified: this.isVerified,
                };
            },
        },
    }
);

/**
 * User Schema Configurations
 */
userSchema.set('toJSON', { virtuals: true });

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

/**
 * User Model
 */
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
