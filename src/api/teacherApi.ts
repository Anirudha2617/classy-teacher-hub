import axios from "axios";
import type {
  Book,
  BookHistory,
  ClassBorrow,
  LendReturnResponse,
  StudentBorrowOverview,
  OverdueBook,
  ClassUsageReport,
} from "@/types/teacherTypes";

const API = axios.create({ 
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
});

// 📚 Books
export const getAllBooks = () => API.get<Book[]>("/books/");
export const getBookHistory = (bookId: number) => API.get<BookHistory>(`/books/${bookId}/history/`);

// 📊 Borrowed
export const getBorrowedBooks = () => API.get<Book[]>("/borrowed-books/");
export const getClassBorrowedBooks = (classId: string) => API.get<ClassBorrow>(`/class/${classId}/borrowed/`);

// ➕ Lend / 🔄 Return
export const lendBook = (payload: { student_id: string; book_id: number }) => 
  API.post<LendReturnResponse>("/lend/", payload);
export const returnBook = (payload: { student_id: string; book_id: number }) => 
  API.post<LendReturnResponse>("/return/", payload);

// 👤 Student
export const getStudentBorrowed = (studentId: string) => 
  API.get<StudentBorrowOverview>(`/students/${studentId}/borrowed/`);

// ⏰ Overdue
export const getOverdueBooks = () => API.get<OverdueBook[]>("/overdue/");

// 📈 Reports
export const getClassUsageReport = () => API.get<ClassUsageReport[]>("/reports/class-usage/");

// Search endpoints
export const searchStudents = (query: string) => 
  API.get(`/students/search/?q=${encodeURIComponent(query)}`);
export const searchBooks = (query: string) => 
  API.get(`/books/search/?q=${encodeURIComponent(query)}`);