import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Payload being sent:", form);

    try {
      const res = await api.post('/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 422) {
        console.error('Validation errors:', err.response.data.errors);
        alert(Object.values(err.response.data.errors).flat().join('\n'));
      } else {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-semibold">Register</h2>

      <input
        className="border p-2 w-full"
        name="name"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
        required
      />

      <input
        className="border p-2 w-full"
        name="email"
        type="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        className="border p-2 w-full"
        name="password"
        type="password"
        value={form.password}
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <input
        className="border p-2 w-full"
        name="password_confirmation"
        type="password"
        value={form.password_confirmation}
        placeholder="Confirm Password"
        onChange={handleChange}
        required
      />

      <button
        className="bg-green-600 text-white px-4 py-2 w-full"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
