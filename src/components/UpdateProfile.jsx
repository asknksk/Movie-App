import { useState } from "react";
import { update, auth } from "../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({ displayName });
    dispatch(login(auth.currentUser));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>DisplayName</label>
        <div>
          <input
            type="text"
            placeholder="DisplayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button type="submit">Change Name</button>
      </div>
    </form>
  );
}
