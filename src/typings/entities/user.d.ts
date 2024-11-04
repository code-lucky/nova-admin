/// <reference path="../global.d.ts"/>
import type { Role } from './role'

namespace Entity {
  interface User {
    id: number;
    user_name: string;
    password?: string;
    gender?: 'male' | 'female' | 'other';
    avatar?: string;
    phone?: string;
    email?: string;
    role_id?: number;
    role?: Role;
    status?: 'enable' | 'disable';
    deleted?: boolean;
    created_at?: Date;
    updated_at?: Date;
  }

  interface UserList {
    list: User[]
    total: number
  }
}
