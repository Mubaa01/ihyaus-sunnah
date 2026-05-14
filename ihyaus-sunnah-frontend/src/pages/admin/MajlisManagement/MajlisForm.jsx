import { useState, useEffect } from "react";

const initialFormState = {
  id: null,
  title: "",
  type: "public",
  day: "",
  time: "",
  endTime: "",
  tutor: "",
  enrolled: 0,
  capacity: 0,
  level: "",
  book: "",
  bookImage: "",
  tutorImage: "",
  format: "",
  description: "",
  requirements: "",
};

const MajlisForm = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(initialFormState);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl space-y-6 relative"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-primary mb-4">
          {form.id ? "Edit Majlis" : "Add New Majlis"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="input"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="input"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <input
            name="day"
            value={form.day}
            onChange={handleChange}
            placeholder="Day"
            className="input"
            required
          />
          <input
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="Start Time"
            className="input"
            required
          />
          <input
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            placeholder="End Time"
            className="input"
          />
          <input
            name="tutor"
            value={form.tutor}
            onChange={handleChange}
            placeholder="Tutor"
            className="input"
            required
          />
          <input
            name="enrolled"
            value={form.enrolled}
            onChange={handleChange}
            placeholder="Enrolled"
            type="number"
            className="input"
          />
          <input
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            type="number"
            className="input"
          />
          <input
            name="level"
            value={form.level}
            onChange={handleChange}
            placeholder="Level"
            className="input"
          />
          <input
            name="book"
            value={form.book}
            onChange={handleChange}
            placeholder="Book"
            className="input"
          />
          <input
            name="bookImage"
            value={form.bookImage}
            onChange={handleChange}
            placeholder="Book Image URL"
            className="input"
          />
          <input
            name="tutorImage"
            value={form.tutorImage}
            onChange={handleChange}
            placeholder="Tutor Image URL"
            className="input"
          />
          <input
            name="format"
            value={form.format}
            onChange={handleChange}
            placeholder="Format"
            className="input"
          />
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="input"
          rows={3}
        />
        <textarea
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Requirements"
          className="input"
          rows={2}
        />
        <button
          type="submit"
          className="btn-primary w-full mt-4"
        >
          {form.id ? "Update Majlis" : "Create Majlis"}
        </button>
      </form>
    </div>
  );
};

export default MajlisForm;
