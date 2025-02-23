import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import AuthForm from '@/components/common/auth-form';

import userStore from '@/stores/user-store';

import { AppRoute } from '@/constants';

const RegisterPage = observer(() => {
  const { isLoading, registerUser } = userStore;

  return (
    <div className="min-h-screen grid items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow">
        <div className="grid p-6 space-y-1.5">
          <h1 className="font-semibold tracking-tight text-2xl">Регистрация</h1>
          <p className="text-sm text-muted-foreground">
            Введите свой адрес электронной почты ниже, чтобы создать учетную запись
          </p>
        </div>

        <div className="p-6 pt-0">
          <AuthForm
            isLoading={isLoading}
            submitButtonTitle="Регистрация"
            onFormSubmit={registerUser}
          />
          <div className="mt-4 text-center text-sm">
            <NavLink className="underline underline-offset-4" aria-label="Вход" to={AppRoute.LOGIN}>
              Вход
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RegisterPage;
