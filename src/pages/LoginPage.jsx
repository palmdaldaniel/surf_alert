import Container from "@mui/material/Container";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
 
  return (
    <Container sx={{ marginTop: "2rem" }} maxWidth="sm">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
