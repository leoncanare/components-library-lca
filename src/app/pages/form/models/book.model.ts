export interface Book {
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    edition?: number;
    realease?: string;
    procedence: string;
    language: string;
    pages: number;
    coverType: string;
    categories?: string[];
    summary?: string;
    digitalFormat?: string;
  }