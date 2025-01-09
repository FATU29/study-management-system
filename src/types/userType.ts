export interface TUser {
  _id?: number;
  lastName?: string;
  firstName?: string;
  email?: string;
  role?: string;
  verify?: number;
  avatar?: string;

  dateOfBirth?: Date;
}
