import { Admin } from "./admins-interface";
import { User } from "./auth-interface";

export interface AuthResponse {
    user: User; // User is optional
    admin: Admin; // Admin is optional
    token: string;
   
}
