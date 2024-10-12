'use client';

import { loginUser } from '@/lib/actions/auth';
import { useFormState } from 'react-dom';

const initialState = {
  success: false,
  error: '',
};

export default function LoginPage() {
  const [state, formAction] = useFormState(loginUser, initialState);

  return (
    <div>
      <h1>Login</h1>
      <form action={formAction}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>

      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.success && <p style={{ color: 'green' }}>Login successful!</p>}
    </div>
  );
}