export interface User {
    userId: number;
    name: string;
    occupation: string;
    address: string;
    email: string;
    role: {
      id: number;
      name: string;
    }
  }