export class Roles {
    USER = 'USER';
    ADMIN = 'ADMIN';
    MANAGER = 'MANAGER';
    SUPERADMIN = 'SUPER_ADMIN'
  }
  
  export interface Role {
    name: string;
    description: string;
    granted?: boolean
  }