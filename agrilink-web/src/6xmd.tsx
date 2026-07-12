import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import apiClient from '@/api/client';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card } from '@/components/molecules/Card';

const registerSchema = z
  .object({
    username: z.string().min(3),
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    birthday: z.string().min(10),
    phone: z.string().min(10),
    barangay: z.string().min(2),
    municipality: z.string().min(2),
    province: z.string().min(2),
    role: z.enum(['farmer', 'buyer']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState, watch, setValue } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: '',
      phone: '',
      barangay: '',
      municipality: '',
      province: '',
      role: 'farmer',
    },
  });


  const login = useAuthStore((state) => state.login);

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setMessage('Creating your account...');

      const payload = {
        username: values.username,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        birthday: values.birthday,
        phone: values.phone,
        barangay: values.barangay,
        municipality: values.municipality,
        province: values.province,
        role: values.role,
      };

      const res = await apiClient.post('/auth/register', payload);


      // Try to auto-login if backend returns tokens/user.
      // Expected (best case): { access_token, refresh_token, user } OR { data: {...} }.
      const data = res?.data ?? res;

      const accessToken = data?.access_token;
      const refreshToken = data?.refresh_token;
      const user = data?.user;

      if (accessToken && refreshToken && user) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        useAuthStore.setState({ user, isAuthenticated: true });
        navigate(user.role === 'buyer' ? '/marketplace' : '/dashboard');
        return;
      }

      // Otherwise, direct user to login.
      setMessage('Account created. Redirecting to login...');
      window.setTimeout(() => navigate('/login'), 800);
    } catch (err: any) {
      const backendMsg = err?.response?.data?.message;
      setMessage(backendMsg ?? 'Unable to create account. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="max-w-2xl w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create your AgriLink account</h1>
          <p className="mt-2 text-sm text-slate-500">Choose your role and complete your details.</p>
        </div>

        {/* Role tabs */}
        <div className="flex rounded-2xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition ${watch('role') === 'farmer' ? 'bg-green-700 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
            onClick={() => {
              // react-hook-form: use setValue via register ref-less update
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (setValue as any)('role', 'farmer', { shouldValidate: true });
            }}
          >
            Farmer
          </button>
          <button
            type="button"
            className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition ${watch('role') === 'buyer' ? 'bg-green-700 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
            onClick={() => {
              (setValue as any)('role', 'buyer', { shouldValidate: true });
            }}
          >
            Buyer
          </button>
        </div>

        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Username" {...register('username')} />
          <Input label="Full name" {...register('fullName')} />

          <Input label="Email" type="email" {...register('email')} />
          <Input label="Password" type="password" {...register('password')} />
          
          <Input label="Confirm password" type="password" {...register('confirmPassword')} />

          <Input label="Birthday" {...register('birthday')} />
          <Input label="Phone" {...register('phone')} />
          <Input label="Barangay" {...register('barangay')} />
          <Input label="Municipality" {...register('municipality')} />
          <Input label="Province" {...register('province')} />

          <div className="sm:col-span-2">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
        {message && <p className="text-sm text-green-700">{message}</p>}
      </Card>
    </div>
  );
};

export default RegisterPage;
