import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuth from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import collections from "../utils/collections";

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextType {
  user?: User;
  userStorageLoading: boolean;
  signOut: () => Promise<void>;
  withApple: () => Promise<void>;
  withGoogle: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthResponse {
  type: string;
  params: { access_token: string };
}

const AuthContext = createContext<AuthContextType>({
  signOut: async () => {},
  userStorageLoading: true,
  withApple: async () => {},
  withGoogle: async () => {},
  user: { email: "", id: "", name: "" },
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const withGoogle = async () => {
    console.log();

    try {
      const RESPONSE_TYPE = "token";
      const scope = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`;

      const res = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;

      const { type, params } = res;

      if (type === "success") {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await res.json();

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          photo: userInfo.picture,
          name: userInfo.given_name,
        });

        await AsyncStorage.setItem(
          collections.user,
          JSON.stringify({
            id: userInfo.id,
            email: userInfo.email,
            photo: userInfo.picture,
            name: userInfo.given_name,
          })
        );
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const withApple = async () => {
    try {
      const credential = await AppleAuth.signInAsync({
        requestedScopes: [
          AppleAuth.AppleAuthenticationScope.FULL_NAME,
          AppleAuth.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;

        setUser({
          name,
          email: credential.email!,
          id: String(credential.user),
          photo: `https://ui-avatars.com/api/?name=${name}&length=1`,
        });

        await AsyncStorage.setItem(collections.user, JSON.stringify(user));
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const signOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(collections.user);
  };

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(collections.user);
      data && setUser(JSON.parse(data) as User);
    })();

    setUserStorageLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, withGoogle, withApple, signOut, userStorageLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
