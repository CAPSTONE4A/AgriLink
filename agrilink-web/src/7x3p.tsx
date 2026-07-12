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

    // Shared fields
    phone: z.string().min(10),
    barangay: z.string().min(2),
    municipality: z.string().min(2),
    province: z.string().min(2),

    // Farmer-only field
    birthdate: z.string().min(10).optional(),

    // Buyer-only field
    deliveryAddress: z.string().min(5).optional(),

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
        <div className="rounded-2xl border border-slate-200 bg-white p-1">
          <div className="relative flex">
            {/* selection indicator */}
            <div
              className="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.5rem)] rounded-2xl bg-gradient-to-r from-green-800/35 via-indigo-800/25 to-indigo-900/35 shadow-[0_10px_20px_rgba(15,23,42,0.18)] transition-all duration-900 ease-in-out"
              style={{
                transform: `translateX(${watch('role') === 'farmer' ? '0%' : '100%'})`,
                // keep shadow animation slower so it feels like it follows
                filter: watch('role') === 'farmer' ? 'saturate(1.1)' : 'saturate(0.95)',
                opacity: 1,
              }}
            />
            <button
              type="button"
              className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out ${watch('role') === 'farmer' ? 'bg-green-700 text-white shadow' : 'text-slate-700 hover:bg-slate-50'}`}
              onClick={() => {
                (setValue as any)('role', 'farmer', { shouldValidate: true });
              }}
            >
              Farmer
            </button>
            <button
              type="button"
              className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out ${watch('role') === 'buyer' ? 'bg-indigo-700 text-white shadow' : 'text-slate-700 hover:bg-slate-50'}`}
              onClick={() => {
                (setValue as any)('role', 'buyer', { shouldValidate: true });
              }}
            >
              Buyer
            </button>
          </div>

          {/* Animated form background */}
          <div className="mt-3 rounded-2xl border border-slate-200 overflow-hidden">
            {/* Sliding panel */}
            <div className="overflow-hidden">
              <div
                className="flex w-[200%] transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${watch('role') === 'farmer' ? '0%' : '-50%'})` }}
              >
                {/* Farmer panel */}
                <div className="w-1/2 shrink-0 bg-green-50 p-4 transition-colors duration-500 ease-in-out">
                  <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
                    <Input label="Username" {...register('username')} />
                    <Input label="Full name" {...register('fullName')} />

                    <Input label="Email" type="email" {...register('email')} />
                    <Input label="Password" type="password" {...register('password')} />

                    <Input label="Confirm password" type="password" {...register('confirmPassword')} />

                    <Input label="Phone" {...register('phone')} />
                    <Input label="Barangay" {...register('barangay')} />
                    <Input label="Municipality" {...register('municipality')} />
                    <Input label="Province" {...register('province')} />

                    <Input label="Birthdate" {...register('birthdate')} />

                    <div className="sm:col-span-2">


                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Buyer panel */}
                <div className="w-1/2 shrink-0 bg-indigo-50 p-4 transition-colors duration-500 ease-in-out">
                  <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
                    <Input label="Username" {...register('username')} />
                    <Input label="Full name" {...register('fullName')} />

                    <Input label="Email" type="email" {...register('email')} />
                    <Input label="Password" type="password" {...register('password')} />

                    <Input label="Confirm password" type="password" {...register('confirmPassword')} />

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
                </div>
              </div>
            </div>
          </div>

          {message && <p className="text-sm text-green-700">{message}</p>}
        </div>
      </Card>
    </div>

  );
};

export default RegisterPage;
