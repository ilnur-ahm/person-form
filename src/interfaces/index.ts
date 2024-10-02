export interface FormData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date | null;
  phone: string;
  email: string;
  gender: string;
  address: string;
  job: string;
}

export interface Errors {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  gender?: string;
  address?: string;
  job?: string;
}
