import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
  const { register, handleSubmit, formState } = useForm<RegisterFormValues>({
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

  const onSubmit = async (values: RegisterFormValues) => {
    setMessage('Registration is currently demo-only. Redirecting to login...');
    window.setTimeout(() => navigate('/login'), 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="max-w-2xl w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create your AgriLink account</h1>
          <p className="mt-2 text-sm text-slate-500">Register with your phone or email and get started with your farm profile.</p>
        </div>

        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Full name" {...register('name')} />
          <Input label="Email" type="email" {...register('email')} />
          <Input label="Password" type="password" {...register('password')} />
          <Input label="Barangay" {...register('barangay')} />
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
            <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-green-500" {...register('role')}>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
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
