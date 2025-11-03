import { Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "react-router-dom";

import { loginSchema, type TloginFormData } from "@/zod/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";

export default function LoginForm({
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(login)}>
        <div className="flex flex-col gap-6">
          {/* Logo & Heading */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium text-foreground"
            >
              <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                <Youtube className="size-6 text-foreground" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold text-foreground">
              Welcome to Intsa
            </h1>
            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <NavLink
                to="/sign-up"
                className="text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Sign up
              </NavLink>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-background text-foreground"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" {...register("password")} type="password" />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

            <Button
             type="submit" className="w-full text-background" disabled={isLoggingIn} >
              {isLoggingIn ? "Logging In ..." : "Login"}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative text-center text-sm text-muted-foreground after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="bg-background relative z-10 px-2">Or</span>
          </div>

          {/* Social Login */}
          <div className="grid gap-4">
            <Button
              variant="outline"
              type="button"
              className="w-full flex items-center gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
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
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground text-balance *:[a]:text-primary *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary/80">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
