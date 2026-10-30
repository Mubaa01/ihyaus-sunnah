import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { currentUserAPI } from "../../../services/api";

const AdminProfilePage = () => {
  const [profile, setProfile] = useState({ name: "", role: "", avatar: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    currentUserAPI.getProfile()
      .then((response) => setProfile(response.data || response.user || response))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile((c) => ({ ...c, avatar: reader.result }));
    reader.readAsDataURL(file);
    setAvatarFile(file);
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await currentUserAPI.updateProfile({
        name: profile.name,
        avatar: profile.avatar,
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
        <div className="flex items-center gap-4">
          {profile.avatar ? (
            <img src={profile.avatar} alt="avatar" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
              {profile.name?.[0] || "A"}
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <label className="block text-sm font-semibold text-gray-700">
          Name
          <input
            className="input-primary mt-2 w-full"
            value={profile.name || ""}
            onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
            required
          />
        </label>

        <div className="rounded-2xl bg-gray-50 p-4">
          <span className="text-sm text-gray-500">Display name</span>
          <p className="mt-1 font-semibold capitalize text-primary">Admin {profile.name || ""}</p>
        </div>

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
