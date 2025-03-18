import 'next-auth';

declare module 'next-auth' {
    // interface User {
    //     role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'; // Define your role types
    //   }
  interface Session {
    
    user: {
      id: string;
      email: string;
    } & DefaultSession['user'];
  }
}