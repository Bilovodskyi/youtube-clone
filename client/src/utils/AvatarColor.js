export const COLORS = ["#4285F4", "#34A853", "#FBBC05", "#EA4335"];

export const avatarColor = (currentUser) => {
    return Math.floor(currentUser[currentUser.length - 2] / 2.5);
};
