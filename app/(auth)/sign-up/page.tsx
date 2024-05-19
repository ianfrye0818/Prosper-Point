import AuthForm from '@/app/(auth)/_components/_authform/AuthForm';
import { getDataBaseUser } from '../_authActions/user.actions';

export default async function SignUp() {
  const user = (await getDataBaseUser()) as User;
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm
        type='sign-up'
        user={user ?? null}
      />
    </section>
  );
}
