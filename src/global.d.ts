declare global {
  type Announcement = {
    _id: string;
    title: string;
    description: string;
    roleName: 'Manager' | 'Staff';
    datetime: Date;
  }
  type User = {
    username: string;
    email: string;
    role: {
      roleName: 'unknown' | 'Manager' | 'Staff',
      write: boolean;
    }
  }
}

export {};
