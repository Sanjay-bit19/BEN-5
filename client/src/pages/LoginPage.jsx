import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 p-8 rounded-xl w-80 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white">Log in</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-neutral-800 text-white rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-neutral-800 text-white rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white rounded py-2 font-bold"
        >
          Log in
        </button>
        <p className="text-neutral-400 text-sm text-center">
          No account? <Link to="/register" className="text-green-400">Register</Link>
        </p>
      </form>
    </div>
  );
}