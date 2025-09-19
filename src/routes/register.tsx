import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Loader2, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import ontaLogo from "@/assets/images/onta-white.svg";
import loginBackground from "@/assets/images/login-b.png";
import { useAuth } from "@/hooks";
import { sendVerifyCode } from "@/api";
import { validatePasswordStrength, checkPasswordRequirement } from "@/utils";
import toast from "react-hot-toast";

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [codeSending, setCodeSending] = useState(false);
  const [codeCountdown, setCodeCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  // Password strength validation
  const passwordStrength = validatePasswordStrength(formData.password);
  const router = useRouter();

  const { register } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check if passwords match
    if (name === "confirmPassword" || name === "password") {
      const newFormData = { ...formData, [name]: value };
      setPasswordsMatch(
        newFormData.password === newFormData.confirmPassword ||
          newFormData.confirmPassword === ""
      );
    }

    // Show password requirements
    if (name === "password") {
      setShowPasswordRequirements(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.verificationCode
    ) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!passwordStrength.isValid) {
      toast.error("Password strength requirements not met");
      setIsLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        verifyCode: formData.verificationCode,
      });

      toast.success("Registration successful! Please log in to your account");
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.navigate({ to: "/login" });
      }, 3000);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed, please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCode = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address first");
      return;
    }

    if (codeCountdown > 0) {
      return; // still counting down
    }

    setCodeSending(true);

    try {
      const response = await sendVerifyCode({ email: formData.email });

      if (response && response.code === 200) {
        toast.success("Verification code has been sent to your email");
        // Start 60s countdown
        setCodeCountdown(60);
        const timer = setInterval(() => {
          setCodeCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        throw new Error(response?.msg || "Failed to send verification code");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send verification code"
      );
    } finally {
      setCodeSending(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Register form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <img src={ontaLogo} alt="Onta Network" className="h-8" />
            <span className="text-xl font-semibold text-gray-900">
              Onta Network
            </span>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Sign up</h2>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full input input-bordered "
                placeholder="Example@email.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setShowPasswordRequirements(true)}
                className="w-full input input-bordered "
                placeholder="at least 8 characters"
                disabled={isLoading}
              />
            </div>

            {/* Password requirements */}
            {showPasswordRequirements && formData.password && (
              <div className="text-sm">
                <p className="text-gray-700 mb-2">
                  Use at least 8 characters with 3 of the following:
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        checkPasswordRequirement(formData.password, "uppercase")
                          ? "border-success bg-success"
                          : "border-base-300"
                      }`}
                    >
                      {checkPasswordRequirement(
                        formData.password,
                        "uppercase"
                      ) && (
                        <Check className="w-2 h-2 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-xs text-gray-600">
                      An uppercase letter (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        checkPasswordRequirement(formData.password, "special")
                          ? "border-success bg-success"
                          : "border-base-300"
                      }`}
                    >
                      {checkPasswordRequirement(
                        formData.password,
                        "special"
                      ) && (
                        <Check className="w-2 h-2 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-xs text-gray-600">
                      A special character (!@#$%^&*)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        checkPasswordRequirement(formData.password, "lowercase")
                          ? "border-success bg-success"
                          : "border-base-300"
                      }`}
                    >
                      {checkPasswordRequirement(
                        formData.password,
                        "lowercase"
                      ) && (
                        <Check className="w-2 h-2 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-xs text-gray-600">
                      A lowercase letter (a-z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        checkPasswordRequirement(formData.password, "number")
                          ? "border-success bg-success"
                          : "border-base-300"
                      }`}
                    >
                      {checkPasswordRequirement(
                        formData.password,
                        "number"
                      ) && (
                        <Check className="w-2 h-2 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-xs text-gray-600">
                      A number (0-9)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        checkPasswordRequirement(formData.password, "length")
                          ? "border-success bg-success"
                          : "border-base-300"
                      }`}
                    >
                      {checkPasswordRequirement(
                        formData.password,
                        "length"
                      ) && (
                        <Check className="w-2 h-2 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-xs text-gray-600">
                      At least 8 characters
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Re-enter Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full input input-bordered "
                placeholder="at least 8 characters"
                disabled={isLoading}
              />
              {!passwordsMatch && formData.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords don't match. Please re-enter.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Verification
              </label>
              <div className="flex gap-2">
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  className="flex-1 input input-bordered "
                  placeholder="6-digit verification code"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={
                    isLoading ||
                    !formData.email ||
                    codeSending ||
                    codeCountdown > 0
                  }
                  className="btn btn-primary"
                >
                  {codeSending
                    ? "Sending..."
                    : codeCountdown > 0
                      ? `${codeCountdown}s`
                      : "Send Code"}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {codeCountdown > 0
                  ? `Please wait ${codeCountdown} seconds to resend`
                  : "If you don't receive the code, try again in 60s"}
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !passwordsMatch}
              className="btn-block btn btn-primary"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </span>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              © 2025 ONTA NETWORK. ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="hidden lg:block relative flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={loginBackground}
          alt="Register background"
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});
