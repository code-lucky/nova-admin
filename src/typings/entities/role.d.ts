/// <reference path="../global.d.ts"/>

/* 角色数据库表字段 */
namespace Entity {
  interface Role {
    id: number;
    name: string;
    description?: string;
    deleted?: boolean;
    status?: 'enable' | 'disable';
    created_at?: Date;
    updated_at?: Date;
  }
}
