export const populatePictures = (pictures) => {
    return {
        type: "INITIALIZATION",
        payload: pictures
    };
};

export const removePicture = (id) => {
    return {
        type: "REMOVE_PICTURE",
        payload: id
    };
};

export const addPicture = (picture) => {
    return {
        type: "ADD_PICTURE",
        payload: picture
    };
};