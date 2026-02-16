import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authAPI } from "@/services/api";
import { toast } from "sonner";

declare global {
  interface Window {
    google: any;
  }
}

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useApp();

  useEffect(() => {
    // Load Google SDK
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://accounts.google.com/gsi/client";
    document.body.appendChild(script);

    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID_HERE", // Replace with your Google Client ID
        callback: handleGoogleSignIn,
      });
    };
  }, []);

  const handleGoogleSignIn = async (response: any) => {
    try {
      setLoading(true);
      const result = await authAPI.googleLogin(response.credential);

      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        login(result.user.name);
        toast.success("Google login successful!");
        navigate("/home");
      } else {
        toast.error(result.error || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const authFn = isSignUp ? authAPI.signup : authAPI.login;
      const result = isSignUp
        ? await authAPI.signup(name, email, password)
        : await authAPI.login(email, password);

      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        login(result.user.name);
        toast.success(result.message);
        navigate("/home");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(result.error || "Authentication failed");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 burgundy-gradient items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="pattern-paisley w-full h-full" style={{ color: "white" }} />
        </div>
        <div className="text-center z-10 px-12 animate-fade-in">
          <h1 className="font-display text-6xl font-bold text-primary-foreground mb-4">
            ✦ Dressify
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-sm mx-auto leading-relaxed">
            Design your dream outfit. Customize colors, patterns, and styles — all in one place.
          </p>
          <div className="mt-8 flex justify-center gap-4 text-5xl">
            <span className="animate-fade-in" style={{ animationDelay: "0.2s" }}>👗</span>
            <span className="animate-fade-in" style={{ animationDelay: "0.4s" }}>👔</span>
            <span className="animate-fade-in" style={{ animationDelay: "0.6s" }}>🥻</span>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-primary">✦ Dressify</h1>
          </div>

          <h2 className="font-display text-3xl font-bold mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isSignUp ? "Start designing your perfect outfit" : "Sign in to continue customizing"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required={isSignUp}
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold burgundy-gradient border-none text-primary-foreground hover:opacity-90 disabled:opacity-50">
              {loading ? "Loading..." : (isSignUp ? "Sign Up" : "Sign In")}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button
            variant="outline"
            className="w-full h-12 text-base font-medium disabled:opacity-50"
            disabled={loading}
            id="googleSignInButton"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-semibold hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
