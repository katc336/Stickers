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
                sx={{ borderRadius: "20px", my: 3, mx: 1, p: 3, backgroundColor: "transparent" }}
            >
                <Typography sx={{ textAlign: "center" }}>
                    <Typography
                        variant="h5"
                        sx={{ mb: 1, textAlign: "center" }}>
                        Get started with Stickers and maker sure your learning objectives stick!
                    </Typography>
                    <Link to="/register">
                        <button
                            style={{ padding: "10px", margin: 10 }} //override styles for button size
                            className="add-button">
                                <Typography   variant="h6">
                                Sign Up
                                </Typography>
                        </button>
                    </Link>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#0A1D56",
                            textAlign: "center",
                            mt: 1
                        }}>
                        Already have an account?
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#0A1D56",
                            textAlign: "center",
                            mb: 10
                        }}>
                        <Link to="/login">
                            Go to Login
                        </Link>
                    </Typography>
                </Typography>
            </Card>
        </div >
    )
}
export default CallToAction