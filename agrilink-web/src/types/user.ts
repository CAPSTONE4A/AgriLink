export type Role = 'farmer' | 'buyer' | 'admin';

export interface User {
  id?: string;
  username: string;
  fullName?: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  phone?: string;
  birthday?: string; // ISO date string, optional
  barangay?: string;
  municipality?: string;
  province?: string;
  createdAt?: string;
  updatedAt?: string;
}
