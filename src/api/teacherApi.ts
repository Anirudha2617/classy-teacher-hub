import type {
  Book,
  BookHistory,
  ClassBorrow,
  LendReturnResponse,
  StudentBorrowOverview,
  OverdueBook,
  ClassUsageReport,
} from "@/types/teacherTypes";

// Mock Data
const mockBooks: Book[] = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0-06-112008-4", total_quantity: 5, available_quantity: 2, borrowed_by: [{ student_id: "S101", student_name: "Alice Johnson", borrow_date: "2024-09-10" }] },
  { id: 2, title: "1984", author: "George Orwell", isbn: "978-0-452-28423-4", total_quantity: 4, available_quantity: 0, borrowed_by: [{ student_id: "S104", student_name: "David Lee", borrow_date: "2024-09-11" }] },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0-14-143951-8", total_quantity: 3, available_quantity: 3, borrowed_by: [] },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0-7432-7356-5", total_quantity: 6, available_quantity: 1, borrowed_by: [{ student_id: "S102", student_name: "Bob Smith", borrow_date: "2024-09-12" }] },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "978-0-316-76948-0", total_quantity: 4, available_quantity: 0, borrowed_by: [{ student_id: "S103", student_name: "Carol Davis", borrow_date: "2024-09-14" }] },
  { id: 6, title: "Lord of the Flies", author: "William Golding", isbn: "978-0-571-05686-2", total_quantity: 5, available_quantity: 2, borrowed_by: [{ student_id: "S105", student_name: "Eva Green", borrow_date: "2024-09-13" }] },
  { id: 7, title: "Animal Farm", author: "George Orwell", isbn: "978-0-452-28424-1", total_quantity: 3, available_quantity: 0, borrowed_by: [{ student_id: "S106", student_name: "Frank Miller", borrow_date: "2024-09-15" }] },
  { id: 8, title: "Brave New World", author: "Aldous Huxley", isbn: "978-0-06-085052-4", total_quantity: 4, available_quantity: 1, borrowed_by: [{ student_id: "S107", student_name: "Grace Wilson", borrow_date: "2024-09-16" }] },
  { id: 9, title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0-547-92822-7", total_quantity: 7, available_quantity: 3, borrowed_by: [{ student_id: "S108", student_name: "Henry Brown", borrow_date: "2024-09-17" }] },
  { id: 10, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "978-0-439-70818-8", total_quantity: 8, available_quantity: 0, borrowed_by: [{ student_id: "S109", student_name: "Isabel Clark", borrow_date: "2024-09-18" }] }
];

const mockStudents = [
  { student_id: "S101", student_name: "Alice Johnson", class: "10A", books_borrowed: 3, books_returned: 12 },
  { student_id: "S102", student_name: "Bob Smith", class: "10B", books_borrowed: 2, books_returned: 8 },
  { student_id: "S103", student_name: "Carol Davis", class: "10A", books_borrowed: 1, books_returned: 15 },
  { student_id: "S104", student_name: "David Lee", class: "11A", books_borrowed: 4, books_returned: 6 },
  { student_id: "S105", student_name: "Eva Green", class: "11B", books_borrowed: 2, books_returned: 10 },
  { student_id: "S106", student_name: "Frank Miller", class: "12A", books_borrowed: 1, books_returned: 20 },
  { student_id: "S107", student_name: "Grace Wilson", class: "12B", books_borrowed: 3, books_returned: 14 },
  { student_id: "S108", student_name: "Henry Brown", class: "10A", books_borrowed: 2, books_returned: 9 },
  { student_id: "S109", student_name: "Isabel Clark", class: "11A", books_borrowed: 1, books_returned: 11 },
  { student_id: "S110", student_name: "Jack Davis", class: "10B", books_borrowed: 0, books_returned: 7 }
];

// Simulate 2-second delay for all API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 📚 Books
export const getAllBooks = async (): Promise<{ data: Book[] }> => {
  await delay(2000);
  return { data: mockBooks };
};

export const getBooks = async (): Promise<{ data: Book[] }> => {
  await delay(2000);
  return { data: mockBooks };
};

export const getBookHistory = async (bookId: number): Promise<{ data: BookHistory }> => {
  await delay(2000);
  const book = mockBooks.find(b => b.id === bookId);
  return {
    data: {
      book_id: bookId,
      title: book?.title || "Unknown Book",
      history: book?.borrowed_by || []
    }
  };
};

// 📊 Borrowed
export const getBorrowedBooks = async (): Promise<{ data: Book[] }> => {
  await delay(2000);
  return { data: mockBooks.filter(book => book.borrowed_by.length > 0) };
};

export const getClassBorrowedBooks = async (classId: string): Promise<{ data: ClassBorrow }> => {
  await delay(2000);
  const classBorrowedBooks = mockBooks.filter(book => 
    book.borrowed_by.some(borrower => 
      mockStudents.find(s => s.student_id === borrower.student_id)?.class === classId
    )
  );
  
  return {
    data: {
      class_id: classId,
      class_name: `Class ${classId}`,
      borrowed_books: classBorrowedBooks.map(book => ({
        book_id: book.id,
        title: book.title,
        borrowed_by: book.borrowed_by.filter(borrower =>
          mockStudents.find(s => s.student_id === borrower.student_id)?.class === classId
        )
      }))
    }
  };
};

// ➕ Lend / 🔄 Return
export const lendBook = async (payload: { student_id: string; book_id: number }): Promise<{ data: LendReturnResponse }> => {
  await delay(2000);
  const student = mockStudents.find(s => s.student_id === payload.student_id);
  const book = mockBooks.find(b => b.id === payload.book_id);
  
  return {
    data: {
      success: true,
      message: "Book lent successfully",
      student: { student_id: payload.student_id, student_name: student?.student_name || "Unknown Student" },
      book: { book_id: payload.book_id, title: book?.title || "Unknown Book" },
      borrow_date: new Date().toISOString().split('T')[0]
    }
  };
};

export const returnBook = async (payload: { student_id: string; book_id: number }): Promise<{ data: LendReturnResponse }> => {
  await delay(2000);
  const student = mockStudents.find(s => s.student_id === payload.student_id);
  const book = mockBooks.find(b => b.id === payload.book_id);
  
  return {
    data: {
      success: true,
      message: "Book returned successfully",
      student: { student_id: payload.student_id, student_name: student?.student_name || "Unknown Student" },
      book: { book_id: payload.book_id, title: book?.title || "Unknown Book" },
      return_date: new Date().toISOString().split('T')[0]
    }
  };
};

// 👤 Student
export const getStudentBorrowed = async (studentId: string): Promise<{ data: StudentBorrowOverview }> => {
  await delay(2000);
  const student = mockStudents.find(s => s.student_id === studentId);
  const currentBorrowed = mockBooks
    .filter(book => book.borrowed_by.some(b => b.student_id === studentId))
    .map(book => ({
      book_id: book.id,
      title: book.title,
      borrow_date: book.borrowed_by.find(b => b.student_id === studentId)?.borrow_date || ""
    }));

  return {
    data: {
      student_id: studentId,
      student_name: student?.student_name || "Unknown Student",
      current_borrowed: currentBorrowed,
      past_history: []
    }
  };
};

export const getStudent = async (studentId: string): Promise<{ data: any }> => {
  await delay(2000);
  const student = mockStudents.find(s => s.student_id === studentId);
  return { data: student || null };
};

// ⏰ Overdue
export const getOverdueBooks = async (): Promise<{ data: OverdueBook[] }> => {
  await delay(2000);
  const overdueBooks: OverdueBook[] = [
    {
      book_id: 1,
      title: "To Kill a Mockingbird",
      borrower: { student_id: "S101", student_name: "Alice Johnson", borrow_date: "2024-09-01" },
      due_date: "2024-09-15",
      days_overdue: 11
    },
    {
      book_id: 2,
      title: "1984",
      borrower: { student_id: "S104", student_name: "David Lee", borrow_date: "2024-08-28" },
      due_date: "2024-09-11",
      days_overdue: 15
    }
  ];
  return { data: overdueBooks };
};

// 📈 Reports
export const getClassUsageReport = async (): Promise<{ data: ClassUsageReport[] }> => {
  await delay(2000);
  const classReports: ClassUsageReport[] = [
    {
      class_id: "10A",
      class_name: "Class 10A",
      total_books_borrowed: 25,
      most_borrowed_books: [
        { book_id: 1, title: "To Kill a Mockingbird", borrow_count: 10 },
        { book_id: 3, title: "Pride and Prejudice", borrow_count: 8 }
      ]
    },
    {
      class_id: "10B",
      class_name: "Class 10B",
      total_books_borrowed: 18,
      most_borrowed_books: [
        { book_id: 10, title: "Harry Potter and the Sorcerer's Stone", borrow_count: 12 },
        { book_id: 4, title: "The Great Gatsby", borrow_count: 6 }
      ]
    }
  ];
  return { data: classReports };
};

// Search endpoints
export const searchStudents = async (query: string): Promise<{ data: any[] }> => {
  await delay(500); // Faster for autocomplete
  const results = mockStudents.filter(student =>
    student.student_name.toLowerCase().includes(query.toLowerCase()) ||
    student.student_id.toLowerCase().includes(query.toLowerCase())
  );
  return { data: results };
};

export const searchBooks = async (query: string): Promise<{ data: Book[] }> => {
  await delay(500); // Faster for autocomplete
  const results = mockBooks.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase()) ||
    book.isbn.includes(query)
  );
  return { data: results };
};