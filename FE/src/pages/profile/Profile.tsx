import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuth,
  selectAuthUser,
 
} from "../../api/apiRtk/auth/authSlice";
import { supabase } from "../../utils/supabase";

const Profile = () => {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const SUPABASE_PROJECT_REF = import.meta.env.VITE_SUPABASE_PROJECT_REF;
  const { profile }: any = useOutletContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }

    if (profile) {
      if (profile.name) {
        setName(profile.name);
      }
      if (profile.city) {
        setCity(profile.city);
      }
    }
      
    
  }, [user, profile]);
  const handleSave = async () => {
    try {
      // 1️⃣ Update profile if name or city changed
      if (name !== profile?.name || city !== profile?.city) {
        const { error: profileError } = await supabase
          .from("userProfiles")
          .update({ name, city })
          .eq("id", user?.id);

        if (profileError) {
          alert("Failed to update profile: " + profileError.message);
          return;
        }
      }

      // 2️⃣ Update email if changed
      if (email !== user?.email) {
        const confirmResult = confirm(
          "You will need to confirm your email to update it. Do you want to continue?",
        );
        if (!confirmResult) return;

        const { error: emailError } = await supabase.auth.updateUser({ email });
        if (emailError) {
          alert("Failed to update email: " + emailError.message);
          return;
        }

        // 3️⃣ Logout only after successful email update
        dispatch(clearAuth());
        localStorage.removeItem(`sb-${SUPABASE_PROJECT_REF}-auth-token`);
        sessionStorage.removeItem(`activeAccountId`);
        alert("Check current email to confirm update!");
      }

      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Profile</h1>
      <input
        className="input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
};

export default Profile;
