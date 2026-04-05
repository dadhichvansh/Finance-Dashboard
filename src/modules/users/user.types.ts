export interface UpdateUserRoleInput {
  role: 'VIEWER' | 'ANALYST' | 'ADMIN';
}

export interface UpdateUserStatusInput {
  status: 'ACTIVE' | 'INACTIVE';
}
