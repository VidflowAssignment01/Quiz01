import { myAxios } from "@/lib/axios";
import type { TloginFormData,TsignUpFormData } from "@/zod/auth-schema";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

type TAuthStore = {
  currUser: null | User;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isCheckingAuth: boolean;
  checkUser: () => void;
  signup: (data: TsignUpFormData) => void;
  login: (data: TloginFormData) => void;
  logout: () => void;
  setCurrUser: (data: User) => void;
  isVerifyingEmail: boolean;
  verifyEmail: (token: string) => void;
  isVerificationPassed: boolean;
  isSendingEmail: boolean;
  resendVerificationEmail: (email: string) => void;
};

export const useAuthStore = create<TAuthStore>((set) => ({
  currUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isCheckingAuth: false,
  isVerifyingEmail: false,
  isVerificationPassed: false,
  isSendingEmail: false,

  setCurrUser: (user) => {
    set({ currUser: user });
  },

  checkUser: async function () {
    
    try {
      set({ isCheckingAuth: true });
      const { data } = await myAxios.get("/auth/check");
      set({ currUser: data.data });
    } catch (err) {
      console.log(err);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async function (formData: TsignUpFormData) {
    try {
        console.log(formData);
        
      set({ isSigningUp: true });
      const { data } = await myAxios.post("/auth/signup", formData);
      toast.success(data.data.username, {
        description: data.message,
      });
      window.location.href = "/login";
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error("Oops!", {
          description:
            err?.response?.data.message ?? "Server maitainence is going on.",
        });
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async function (formData: TloginFormData) {
    try {
      set({ isLoggingIn: true });

      const { data } = await myAxios.post("/auth/login", formData);

      if (data.success) {
        set({ currUser: data.data });
        toast.success("Login Successful");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error("Oops!", {
          description:
            err?.response?.data.message ?? "Server maintainance is going on.",
        });
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  verifyEmail: async function (token: string) {
    try {
      set({ isVerifyingEmail: true });
      const { data } = await myAxios.get(`/auth/verify/${token}`);
      if (data.success) {
        set({ isVerificationPassed: true });
        toast.success(data.message);
      }
    } catch (err) {
      if (isAxiosError(err)) console.log(err.response?.data.message);
    } finally {
      set({ isVerifyingEmail: false });
    }
  },

  logout: async function () {
    try {
        console.log("logoitfdx");
      const { data } = await myAxios.post("/auth/logout");
      if (data.success) {
        set({ currUser: null });
        toast.success("Logged out Successfully");
        window.location.href = "/login";
      }
      sessionStorage.clear();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error("Oops!", {
          description:
            err?.response?.data.message ?? "Server maintainance is going on.",
        });
      }
    }
  },

  resendVerificationEmail: async (email: string) => {
    try {
      set({ isSendingEmail: true });
      const { data } = await myAxios.post("/auth/resend-email", { email });
      if (data.success) toast.success(data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error("Oops!", {
          description:
            err?.response?.data.message ?? "Server maintainance is going on.",
        });
      }
    } finally {
      set({ isSendingEmail: false });
    }
  },
}));
