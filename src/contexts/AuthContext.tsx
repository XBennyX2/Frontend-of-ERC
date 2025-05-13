import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { login, logout, refreshToken, register } from "@/services/authService";
import { getUserProfile } from "@/services/userService";
import {
  User,
  AuthTokens,
  LoginCredentials,
  RegisterData,
  AuthState,
} from "@/types";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    tokens: null,
    isAuthenticated: true,
    isLoading: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize auth state from localStorage
    const initializeAuth = async () => {
      const storedTokens = localStorage.getItem("auth_tokens");
      if (!storedTokens) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const tokens: AuthTokens = JSON.parse(storedTokens);

        // Check if access token is expired
        const decodedToken: { exp: number } = jwtDecode(tokens.access);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Access token expired, try to refresh
          const newTokens = await refreshToken(tokens.refresh);
          localStorage.setItem("auth_tokens", JSON.stringify(newTokens));

          // Fetch user profile with new token
          const user = await getUserProfile();
          setAuthState({
            user,
            tokens: newTokens,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          // Access token still valid
          const user = await getUserProfile();
          setAuthState({
            user,
            tokens,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        localStorage.removeItem("auth_tokens");
        setAuthState({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const tokens = await login(credentials);
      localStorage.setItem("auth_tokens", JSON.stringify(tokens));

      const user = await getUserProfile();

      setAuthState({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      if (authState.tokens) {
        await logout(authState.tokens.refresh);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_tokens");
      setAuthState({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      });
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data);
      toast.success("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    }
  };

  const updateUser = (user: User) => {
    setAuthState((prev) => ({
      ...prev,
      user,
    }));
  };

  const value = {
    ...authState,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
