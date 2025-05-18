
export interface Book {
    _id: string;
    bookId: number;
    title: string;
    author: string;
    publisher?: string;
    publishDate?: string;
    edition?: string;
    isbn?: string;
    language?: string;
    pages?: number;
    price?: number;
    currency?: string;
    category?: string;
    description?: string;
    coverImage: string;
    downloadLink?: string;
    images?: string[];
    ratings?: number[];
    feedback?: string[];
    exploreMore?: string[];
    tags: string[];
  }  