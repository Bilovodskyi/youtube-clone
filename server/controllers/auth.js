import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

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
        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "1d",
        });
        const { password, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
            path: "/",
        })
            .status(200)
            .json(otherDetails);
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

        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "1d",
        });

        const { password, ...otherDetails } = user._doc; //to send back all user info, but without password

        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
            path: "/",
        })
            .status(200)
            .json(otherDetails);
    } catch (error) {
        next(error);
    }
};

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT, {
                expiresIn: "1d",
            });
            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 1000 * 60 * 60 * 24,
                path: "/",
            })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT, {
                expiresIn: "1d",
            });
            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 1000 * 60 * 60 * 24,
                path: "/",
            })
                .status(200)
                .json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    res.status(200).clearCookie("access_token").json("Successfully logout");
};
