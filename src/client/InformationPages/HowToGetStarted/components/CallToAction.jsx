import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom"

const CallToAction = () => {
    return (
        <div>
            <Card
                elevation={10}
                sx={{ my: 3, mx: 1, p: 3, borderRadius: 10, backgroundColor: "transparent" }}
            >
                <Typography sx={{ textAlign: "center" }}>
                    <Typography
                        variant="h5"
                        sx={{ mb: 1, textAlign: "center" }}>
                        Get started with Stickers and maker sure your learning objectives stick!
                    </Typography>
                    <Link to="/register">
                        <button
                            style={{ padding: "20px", margin: 10 }} //override styles for button size
                            className="add-button">
                            Sign Up for Free
                        </button>
                    </Link>
                    <Typography sx={{
                        color: "#0A1D56",
                        textAlign: "center",
                        mt: 1
                    }}>
                        Already have an account?
                    </Typography>
                    <Typography sx={{
                        color: "#0A1D56",
                        textAlign: "center",
                        mb: 10
                    }}>
                        <Link to="/login">
                            Go to Login
                        </Link>
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ mb: 3, textAlign: "center" }}>
                        If you would like to contribute to the app, suggest a feature, or report a bug, please reach out on LinkedIn.
                    </Typography>
                    <Link
                        target="_blank"
                        to="https://www.linkedin.com/in/katcwebdeveloper/">
                        <button
                            className="auth-button"
                            style={{ padding: "5px" }} //override styles for button size
                        >
                            <Stack direction="row">
                                <LinkedInIcon sx={{ mx: 1 }} />
                                <Typography>
                                    See LinkedIn Here
                                </Typography>
                            </Stack>
                        </button>
                    </Link>
                </Typography>
            </Card>
        </div >
    )
}
export default CallToAction