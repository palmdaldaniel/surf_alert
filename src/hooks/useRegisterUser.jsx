import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { register, user } = useAuthContext();

  const createUser = async ({ email, password, confirmPassword }) => {
    setMessage(null);
    if (password !== confirmPassword) {
      setMessage("Passwords does not match");
      return;
    }

    try {
      setIsLoading(true);

      await register(email, password);

      // when registration is successfull navigate to onboardpage view
      navigate("/register/onboard");
    } catch (error) {
      setMessage(error.message);
      setIsLoading(false);
    }
  };

  return { isLoading, createUser, message };
};

export default useRegisterUser;
