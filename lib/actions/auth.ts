'use server';

import User from '@/models/user';
// import { revalidatePath } from 'next/cache';
import { createToken } from '@/utils/jwt'
import { cookies } from 'next/headers';

export async function signupUser(prevState: any, formData: FormData) {
  console.log("prevState", prevState);
  console.log("formData", formData);

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = new User({ name, email });
    await user.setPassword(password);
    await user.save();
    // revalidatePath('/');

    const token = await createToken({ userId: user._id });

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
    });

    return { success: true, data: user, redirect: '/dashboard' };
  } catch (error) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function loginUser(prevState: any, formData: FormData) {
  console.log("prevState", prevState);
  console.log("formData", formData);

  try {
    // Find user by email
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const token = await createToken({ userId: user._id });

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
    });

    return { success: true, message: 'Login successful', redirect: '/dashboard' };
  } catch (error) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
};