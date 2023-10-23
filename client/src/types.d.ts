type CardProps = {
    type: string | undefined;
    video: any;
};

type ChannelProps = {
    name: string;
    img: string;
    createdAt: string;
};

type CommentsProps = {
    videoId?: string;
};

type CommentsDataType = {
    _id: string;
    userId: string;
    videoId: string;
    desc: string;
    createdAt: string;
};

type MenuType = {
    setDarkMode: (arg: boolean) => void;
    darkMode: boolean;
};

type HomeProps = {
    type: string;
};

type ChannelType = {
    img: string;
    name: string;
    subscribers: number;
    _id: string;
    createdAt: string | undefined;
};

type UploadVideoProps = {
    setOpen: (arg: boolean) => void;
    userId: string | undefined;
};

type RecommendationProps = {
    tags: string[] | undefined;
    children: ReactNode;
    videoId: string | undefined;
};

type LogoutMenuType = MenuType & {
    setLogoutMenu: (arg: boolean) => void;
    name: string | undefined;
    image: string | undefined;
    email: string | undefined;
    createdAt: string | undefined;
};

type IconsMenuProps = {
    isMobile: boolean;
};
