import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type TloginFormData } from "@/zod/auth-schema";
import { useAuthStore } from "@/store/authStore";

export default function SignInCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TloginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isLoggingIn } = useAuthStore();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md rounded-2xl shadow-md p-8 w-full max-w-md mx-auto border border-gray-200 dark:border-neutral-800",
        className
      )}
      {...props}
    >
      <form onSubmit={handleSubmit(login)} className="w-full space-y-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10">
            <PlayCircle className="size-6 text-indigo-500" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            New here?{" "}
            <NavLink
              to="/sign-up"
              className="text-indigo-500 hover:text-indigo-400 underline underline-offset-4"
            >
              Create an account
            </NavLink>
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="userEmail" className="text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <Input
              id="userEmail"
              type="email"
              placeholder="you@example.com"
              className="rounded-xl bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-neutral-700"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="userPassword" className="text-gray-700 dark:text-gray-300">
              Password
            </Label>
            <Input
              id="userPassword"
              type="password"
              placeholder="••••••••"
              className="rounded-xl bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-neutral-700"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoggingIn}
            className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-all duration-300"
          >
            {isLoggingIn ? "Signing In..." : "Sign In"}
          </Button>
        </div>

        <div className="relative text-center text-sm text-gray-500 dark:text-gray-400 before:absolute before:inset-0 before:top-1/2 before:border-t before:border-gray-200 dark:before:border-neutral-800">
          <span className="relative z-10 px-3 bg-white dark:bg-neutral-900">or</span>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-xl border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </Button>
      </form>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        By signing in, you agree to our{" "}
        <a href="#" className="text-indigo-500 hover:text-indigo-400 underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="text-indigo-500 hover:text-indigo-400 underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
