'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { authLogin } from '@api-server';

export default async function submit(prevState: any, formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const password = formData.get('password') as string;

    if (!id || !password) {
      return;
    }

    const { accessToken } = await authLogin({ id, password });
    cookies().set('accessToken', accessToken);
    revalidatePath('/');
    return { result: 'success' };
  } catch (error) {
    return { result: 'error', message: (error as Error).message };
  }
}
