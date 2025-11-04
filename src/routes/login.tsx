import { useState } from 'react';
import toast from 'react-hot-toast';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

import loginBackground from '@/assets/images/login-b.png';
import ontaLogo from '@/assets/images/onta-white.svg';
import { useAuth } from '@/hooks/useAuth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error('Please fill in email and password');
      setIsLoading(false);
      return;
    }

    try {
      await login({ email, password });
      toast.success('Login successful!');
      // 登录成功，路由守卫会自动重定向
      router.navigate({ to: '/dashboard' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <img src={ontaLogo} alt="Onta Network" className="h-8 " />
            <span className="text-xl font-semibold text-gray-900">Onta Network</span>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Sign in to your account</h2>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Example@email.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="at least 8 characters"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Don't you have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </span>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">© 2025 ONTA NETWORK. ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="hidden lg:block relative flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={loginBackground}
          alt="Login background"
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
