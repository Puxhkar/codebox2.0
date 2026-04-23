"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error("Invalid credentials.");
      setLoading(false);
    } else {
      toast.success("Successfully logged in!");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-[#0a0a0a] to-[#0a0a0a] blur-2xl" />

      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-black/50 p-10 backdrop-blur-xl shadow-2xl">
        <div className="text-center">
          <h2 className="font-game mt-6 text-4xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
              />
            </div>
            <div>
              <Input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center bg-purple-600 hover:bg-purple-700 text-white transition-all font-semibold rounded-xl"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-black/50 px-2 text-gray-500">Or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                const testEmail = "UserTest_login@gmail.com";
                const testPass = "12345678";
                
                // Try logging in first
                const res = await signIn("credentials", {
                  redirect: false,
                  email: testEmail,
                  password: testPass,
                });

                if (res?.error) {
                  // If it fails, maybe the account doesn't exist. Register it.
                  await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: "Demo User", email: testEmail, password: testPass }),
                  });
                  
                  // Now sign in again
                  const secondTry = await signIn("credentials", {
                    redirect: false,
                    email: testEmail,
                    password: testPass,
                  });

                  if (!secondTry?.error) {
                    toast.success("Successfully logged in as Test User!");
                    router.push("/");
                    router.refresh();
                  } else {
                    toast.error("Failed to login test user.");
                  }
                } else {
                  toast.success("Successfully logged in as Test User!");
                  router.push("/");
                  router.refresh();
                }
                setLoading(false);
              }}
              className="w-full font-game text-xl rounded-xl transition hover:bg-white/10"
            >
              Test Login
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link href="/sign-up" className="font-semibold text-purple-400 hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
