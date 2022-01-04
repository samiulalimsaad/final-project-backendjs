const suggestedUser = [
    {
        _id: "Qv7LUMKRbDYROf2HAyAZuuDgqTs2",
        name: {
            firstName: "bbb",
            lastName: "bbb",
            nickName: "",
            fullName: "bbb bbb",
            _id: "61767fca97b9dde2462a404c",
        },
        following: [],
        follower: [
            "qRCFrf1pXzYUunDwiAe33H1sxi52",
            "qRCFrf1pXzYUunDwiAe33H1sxi52",
            "qRCFrf1pXzYUunDwiAe33H1sxi52",
        ],
    },
    {
        _id: "zYhkPrVNQ7RS5TYglwyLUL4MHoy1",
        name: {
            firstName: "ccc",
            lastName: "ccc",
            nickName: "",
            fullName: "ccc ccc",
            _id: "6176872429895578b152ab0e",
        },
        following: [],
        follower: ["qRCFrf1pXzYUunDwiAe33H1sxi52"],
    },
    {
        _id: "ahGcG7YHn7ZN049SAPLT74nUHV62",
        name: {
            firstName: "ddd",
            lastName: "ddd",
            nickName: "",
            fullName: "ddd ddd",
            _id: "6176875c29895578b152ab2a",
        },
        following: [],
        follower: ["qRCFrf1pXzYUunDwiAe33H1sxi52"],
    },
];

const user = {
    _id: "qRCFrf1pXzYUunDwiAe33H1sxi52",
    email: "aaa@a.com",
    active: true,
    name: {
        firstName: "aaa",
        lastName: "aaa",
        nickName: "",
        fullName: "aaa aaa",
        _id: "61763bad03c1fa25f30a61d5",
    },
    following: [
        {
            _id: "ahGcG7YHn7ZN049SAPLT74nUHV62",
        },
        {
            _id: "zYhkPrVNQ7RS5TYglwyLUL4MHoy1",
        },
    ],
};

const a = [...new Set(suggestedUser.map(su=>user.following.map(u=>u._id!==su._id && su._id))[0])]

console.log(a)
console.log(suggestedUser.length)
console.log(a.length)