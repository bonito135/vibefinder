import "./LoginScreen.css";

const LoginScreen = () => {
  return (
    <div className="loginScreen">
      {process.env.NODE_ENV === "development" ? (
        <a href="http://localhost:5000/spotify/auth/login">Login...</a>
      ) : (
        <a href="/spotify/auth/login">Login...</a>
      )}
    </div>
  );
};

export default LoginScreen;
