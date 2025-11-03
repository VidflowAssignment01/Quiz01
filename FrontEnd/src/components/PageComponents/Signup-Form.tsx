import { Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type TsignUpFormData } from "@/zod/auth-schema";
import { useAuthStore } from "@/store/authStore";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signup, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TsignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(signup)}>
        <div className="flex flex-col gap-6">
          {/* Logo & Heading */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="text-foreground flex flex-col items-center gap-2 font-medium"
            >
              <div className="bg-muted flex size-8 items-center justify-center rounded-md">
                <Youtube className="size-6" />
              </div>
              <span className="sr-only">Insta Inc.</span>
            </a>
            <h1 className="text-foreground text-xl font-bold">
              Create your account
            </h1>
            <div className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-primary hover:text-primary/80 underline underline-offset-4"
              >
                Log in
              </NavLink>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-foreground">
                Username
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                className="bg-background text-foreground"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>

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

            <div className="grid gap-3">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-background text-foreground"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="text-background w-full">
              {isSigningUp ? "Signing Up ..." : "Sign Up"}
            </Button>
          </div>

          {/* Divider */}
          <div className="text-muted-foreground after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background relative z-10 px-2">Or</span>
          </div>

          {/* Social Sign Up */}
          <div className="grid gap-4">
            <Button
              variant="outline"
              type="button"
              className="text-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2"
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
      <div className="text-muted-foreground *:[a]:text-primary *:[a]:hover:text-primary/80 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
