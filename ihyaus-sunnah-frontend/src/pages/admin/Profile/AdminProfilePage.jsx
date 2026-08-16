import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { currentUserAPI } from "../../../services/api";

const AdminProfilePage = () => {
  const [profile, setProfile] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    currentUserAPI.getProfile()
      .then((response) => setProfile(response.data || response.user || response))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await currentUserAPI.updateProfile({
        name: profile.name,
        email: profile.email,
      });
      setProfile((current) => ({ ...current, ...(response.data || response.user || {}) }));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading profile...</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Admin Profile</h1>
        <p className="mt-2 text-gray-500">Manage your account identity and view your current access role.</p>
      </div>

      <form onSubmit={saveProfile} className="space-y-5 rounded-3xl border border-gray-100 bg-white p-8 shadow-soft">
        <label className="block text-sm font-semibold text-gray-700">
          Name
          <input
            className="input-primary mt-2 w-full"
            value={profile.name || ""}
            onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
            required
          />
        </label>

        <label className="block text-sm font-semibold text-gray-700">
          Email
          <input
            className="input-primary mt-2 w-full"
            type="email"
            value={profile.email || ""}
            onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </label>

        <div className="rounded-2xl bg-gray-50 p-4">
          <span className="text-sm text-gray-500">Current role</span>
          <p className="mt-1 font-semibold capitalize text-primary">{profile.role || "Unknown"}</p>
        </div>

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : "Save profile"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfilePage;
