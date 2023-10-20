import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TDate } from "timeago.js";

type CurrentVideo = {
    _id: string;
    userId: string;
    title: string;
    desc: string;
    imgUrl: string;
    videoUrl: string;
    views: number;
    tags: string[];
    likes: string[];
    dislikes: string[];
    createdAt: TDate;
};

export interface UserState {
    currentVideo: CurrentVideo | null;
    loading: boolean;
    error: boolean;
}

const initialState: UserState = {
    currentVideo: null,
    loading: false,
    error: false,
};

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action: PayloadAction<CurrentVideo>) => {
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        like: (state, action) => {
            if (!state.currentVideo?.likes.includes(action.payload)) {
                state.currentVideo?.likes.push(action.payload);
                state.currentVideo?.dislikes.splice(
                    state.currentVideo.dislikes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            } else {
                state.currentVideo?.likes.splice(
                    state.currentVideo.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },
        dislike: (state, action) => {
            if (!state.currentVideo?.dislikes.includes(action.payload)) {
                state.currentVideo?.dislikes.push(action.payload);
                state.currentVideo?.likes.splice(
                    state.currentVideo.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            } else {
                state.currentVideo?.dislikes.splice(
                    state.currentVideo.dislikes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },
        view: (state) => {
            state.currentVideo!.views += 1;
        },
    },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike, view } =
    videoSlice.actions;

export default videoSlice.reducer;
