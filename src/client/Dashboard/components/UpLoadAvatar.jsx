import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetUserQuery, usePostNewUserProfileMutation } from '../../../redux/api';
import { useState } from 'react';

const UploadAvatar = () => {
    const [imageSelected, setImageSelected] = useState(null); // sets the selected image
    const [preview, setPreview] = useState(null) //sets the previewed uploaded file
    const [displaySave, setDisplaySave] = useState(false); //shows save button when image is uploaded
    const [loading, setLoading] = useState(false); //sets loading when image is uploading
    const [error, setError] = useState(false); //sets loading when image is uploading
    const [updateUserImage] = usePostNewUserProfileMutation();

    const { data, error: dataError, isLoading } = useGetUserQuery();
    if (isLoading) {
        return <div></div>
    }
    if (dataError) {
        console.error(error);
    }
    console.log(data.profile)
    // const upload_preset = import.meta.env.REACT_APP_UPLOAD_PRESET

    const upLoadImage = (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(); //new form data object to send to api
            console.log(formData)
            formData.append("file", imageSelected) // add key: file, value: imageSelected
            formData.append("cloud_name", "dtje7easn");// add key: "cloud_name", value: name of cloud
            formData.append("upload_preset", "kv7hzalq"); // add key: "upload_preset", value: preset (NOTE: do not what to share this for real code-add to .env)
            // //Make axios post to send to route
            axios.post("https://api.cloudinary.com/v1_1/dtje7easn/image/upload", formData)
                .then(async (res) => {
                    console.log(res)
                    const imageUrl = res.data.secure_url; //url of the image posted
                    console.log(imageUrl);
                    const result = await updateUserImage({ profileImg: imageUrl }) //patch user profileImg with the new imgURL
                    console.log(result)
                    setPreview(null); //clear preview
                    setLoading(false);// clear loading
                    setDisplaySave(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                    setError(true); //set error if image upload fails
                });
        } catch (error) {
            console.error(error)
            setLoading(false);
            setError(true);
        }
    }
    return (
        <div>
            <Stack direction="row">
                <Avatar
                    alt="Profile Picture"
                    src={preview ? preview : data.profile} //if preview img, set it, if not, show the user's profile
                    sx={{ width: 100, height: 100, mb: 3, border: "3px solid #63a5b4" }}
                />
                <form onSubmit={upLoadImage}>
                    <Stack direction="column">
                        <label className='file-upload'>
                            <input
                                type="file"
                                accept='image/*'
                                onChange={(event) => {
                                    setImageSelected(event.target.files[0])
                                    setPreview(URL.createObjectURL(event.target.files[0]))
                                    setDisplaySave(true);
                                }} />
                            <AddAPhotoIcon sx={{ color: "#63a5b4" }} />
                        </label>
                        {loading &&
                              <CircularProgress sx={{ mx: 1 }}/>}
                        {displaySave &&
                            <Button
                                type="submit"
                                sx={{
                                    mt: 5,
                                    backgroundImage: "linear-gradient(to right top, #b3b2c6, #b9c1d3, #c2d0dd, #cedfe7, #ddedf0, #d4f3f4, #ccf9f4, #c8fff0, #b4ffd7, #b8ffae, #d1ff7b, #f8f540)",
                                    textTransform: "none",
                                    borderRadius: "20px"
                                }} >
                                Save Picture
                            </Button>
                        }
                    </Stack>
                </form>
            </Stack>
        </div>
    )
}
export default UploadAvatar