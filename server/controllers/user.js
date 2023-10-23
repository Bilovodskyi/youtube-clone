import User from "../models/User.js";
import Video from "../models/Video.js";

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.id, {
            $push: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscription successfull");
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.id, {
            $pull: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscription successfull");
    } catch (err) {
        next(err);
    }
};

export const like = async (req, res, next) => {
    const id = req.body.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {
                likes: id,
            },
            $pull: {
                dislikes: id,
            },
        });
        res.status(200).json("Video has been liked");
    } catch (err) {
        next(err);
    }
};

export const dislike = async (req, res, next) => {
    const id = req.body.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {
                dislikes: id,
            },
            $pull: {
                likes: id,
            },
        });
        res.status(200).json("Video has been disliked");
    } catch (err) {
        next(err);
    }
};
