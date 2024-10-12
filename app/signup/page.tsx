'use client';

import { signupUser } from '@/actions/auth';
import { useFormState } from 'react-dom';

const initialState = {
  success: false,
  error: '',
};

export default function SignupPage() {
  const [state, formAction] = useFormState(signupUser, initialState);

  return (
    <div>
      <h1>Sign Up</h1>
      <form action={formAction}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Sign Up</button>
      </form>

      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.success && <p style={{ color: 'green' }}>Signup successful!</p>}
    </div>
  );
}