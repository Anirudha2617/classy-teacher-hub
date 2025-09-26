export interface Borrower {
  student_id: string;
  student_name: string;
  borrow_date: string;
  return_date?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  total_quantity: number;
  available_quantity: number;
  borrowed_by: Borrower[];
}

export interface BookHistory {
  book_id: number;
  title: string;
  history: Borrower[];
}

export interface ClassBorrow {
  class_id: string;
  class_name: string;
  borrowed_books: {
    book_id: number;
    title: string;
    borrowed_by: Borrower[];
  }[];
}

export interface LendReturnResponse {
  success: boolean;
  message: string;
  student: { student_id: string; student_name: string };
  book: { book_id: number; title: string };
  borrow_date?: string;
  return_date?: string;
}

export interface StudentBorrowOverview {
  student_id: string;
  student_name: string;
  current_borrowed: {
    book_id: number;
    title: string;
    borrow_date: string;
  }[];
  past_history: Borrower[];
}

export interface OverdueBook {
  book_id: number;
  title: string;
  borrower: Borrower;
  due_date: string;
  days_overdue: number;
}

export interface ClassUsageReport {
  class_id: string;
  class_name: string;
  total_books_borrowed: number;
  most_borrowed_books: {
    book_id: number;
    title: string;
    borrow_count: number;
  }[];
}