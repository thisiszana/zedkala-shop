import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export default function AuthForm({ type }) {
  return (
    <>
      {type === "login" && <LoginPage />}
      {type === "signup" && <SignupPage />}
    </>
  );
}
