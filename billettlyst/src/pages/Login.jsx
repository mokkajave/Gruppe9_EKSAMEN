import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss"


export default function Login() {
  const [inputData, setInputData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { username, password } = inputData;
    if (!username || !password) {
      setError("Fyll alle felt!");
      return;
    }
    setError("");
    navigate("/dashboard");
  };


  return (
    <section className="log-in-form">
      <form className="content-container">
        <h1>Logg inn</h1>
        <label>
          Brukernavn
          <input
            type="text"
            placeholder="olanor"
            name="username"
            onChange={handleChange}
          />
        </label>
        <label>
          Passord
          <input
            type="password"
            placeholder="*******"
            name="password"
            onChange={handleChange}
          />
        </label>
        <button onClick={handleClick}>Logg inn</button>
        {error}
      </form>
    </section>
  );
}