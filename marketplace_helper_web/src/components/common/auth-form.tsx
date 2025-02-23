import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Regex } from '@/constants';
import type { IUserAuth } from '@/interfaces';

interface AuthFormProps {
  isLoading?: boolean;
  submitButtonTitle: string;
  onFormSubmit: ({ email, password }: IUserAuth) => Promise<void>;
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Введите адрес эл. почты' })
    .email('Неверный адрес электронной почты'),
  password: z.string().min(1, { message: 'Введите пароль' }).regex(Regex.PASSWORD, {
    message: '8-30 символов, как минимум 1 заглавная буква, 1 строчная буква и число',
  }),
});

const AuthForm = ({ isLoading, submitButtonTitle, onFormSubmit }: AuthFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="user@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {submitButtonTitle}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
