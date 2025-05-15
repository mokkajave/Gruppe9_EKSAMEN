import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({}) {
  const [userLogin, setUserLogin] = useState(false);
  const [inputData, setInputData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setInputData((prev) => {
      const updatedInputData = { ...prev, [name]: value };

      const { username, password } = updatedInputData;
      const inputFilled = !!username && !!password;
      setUserLogin(inputFilled);

      return updatedInputData;
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    const { username, password } = inputData;
    if (!username || !password) {
      setError("Fyll alle felt!");
      setUserLogin(false);
      return;
    }

    setError("");
    setUserLogin(true);
    navigate("/dashboard");
  };

  return (
    <section>
      <h1>Logg inn</h1>
      <form>
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
      </form>
      {error}
    </section>
  );
}