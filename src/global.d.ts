declare global {
  interface Announcement {
    _id: string;
    title: string;
    description: string;
    datetime: Date;
  }
};
export {};