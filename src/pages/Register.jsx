import { useState } from "react";

import { register } from "../auth/firebase";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button disabled={!email || !password} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
