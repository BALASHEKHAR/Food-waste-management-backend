import {
    CREATE_POST,
    LOAD_POSTS,
    UPDATE_POST,
    DELETE_POST,
    ERROR
} from '../actionTypes';
import axios from 'axios'

export const LoadPosts = () => {
    return async (dispatch, getState) => {
        try {
            const posts = await axios.get('/api/post/allposts');

            dispatch({ type: LOAD_POSTS, payload: posts.data })
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response })
        }
    }
}

export const CreatePosts = (images, sdata, eraserData) => {
    return async (dispatch, getState) => {

        try {
            console.log(sdata);
            console.log(images)
            const imgUrls = [];
            images.map(async (image) => {
                const data = new FormData();
                data.append('file', image);
                data.append('upload_preset', "SocialMedia");
                data.append('cloud_name', "djqrcbjmu");
                const data1 = await fetch("	https://api.cloudinary.com/v1_1/djqrcbjmu/image/upload", {
                    method: "post",
                    body: data
                });
                const data2 = await data1.json();
                const url = await data2.secure_url;
                imgUrls.push(url);
                if (imgUrls.length === images.length) {

                    sdata['images'] = imgUrls;
                    const upload = await axios.post('/api/post/addpost', sdata);

                    dispatch({ type: CREATE_POST, payload: upload.data })

                    eraserData();


                }

            });

        } catch (err) {
            console.log(err.message);
            eraserData();

        }
    }
}
