import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        const user = await User.findOne({ name: req.body.name });
        const { password, ...otherDetails } = user._doc;
        res.status(200).json(otherDetails);
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isCorrect) return next(createError(400, "Wrong password"));

        const { password, ...otherDetails } = user._doc; //to send back all user info, but without password

        res.status(200).json(otherDetails);
    } catch (error) {
        next(error);
    }
};

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            res.status(200).json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();

            res.status(200).json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    res.status(200).json("Successfully logout");
};
