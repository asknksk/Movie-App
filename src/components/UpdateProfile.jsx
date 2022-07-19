import { useState } from "react";
import { update } from "../auth/firebase";

export default function UpdateProfile() {
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefaul();
    await update({ displayName });
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
