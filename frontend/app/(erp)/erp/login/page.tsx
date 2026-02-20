'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChefHat, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store/auth.store';
import { AuthUser, StaffRole } from '@/lib/types';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function StaffLoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    try {
      const res = await authApi.loginStaff(data.email, data.password);
      const { access_token, user, role } = res.data;
      login(access_token, user as AuthUser, role as StaffRole);
      router.push('/erp/dashboard');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } }; code?: string };
      if (!axiosErr.response) {
        // Network error — almost always CORS or backend not running
        setError('Cannot reach server. Make sure the backend is running at ' + (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:7000'));
      } else {
        const msg = axiosErr.response?.data?.message;
        setError(Array.isArray(msg) ? msg.join(', ') : (msg ?? 'Login failed. Please try again.'));
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-950 to-amber-950/30 relative overflow-hidden p-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500 shadow-2xl shadow-amber-500/30">
            <ChefHat className="h-10 w-10 text-gray-950" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Savor House</h1>
          <p className="text-gray-400 text-lg">Restaurant Management System</p>

          <div className="mt-12 grid grid-cols-2 gap-4 text-left">
            {[
              { label: 'Reservations', value: 'Real‑time' },
              { label: 'Menu Control', value: 'Full CRUD' },
              { label: 'Staff Roles', value: '4 Levels' },
              { label: 'Table Mgmt', value: 'Live View' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className="text-sm font-semibold text-amber-400">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-8 py-12">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500">
            <ChefHat className="h-6 w-6 text-gray-950" />
          </div>
          <span className="text-xl font-bold text-white">Savor House ERP</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-400">Sign in to your staff account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 text-sm">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@savorhouse.com"
                autoComplete="email"
                {...register('email')}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 h-11"
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register('password')}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold transition-all"
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-600">
            This portal is for restaurant staff only.
          </p>
        </div>
      </div>
    </div>
  );
}
