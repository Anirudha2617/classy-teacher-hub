import { useState } from "react";
import { RotateCcw, User, BookOpen, CheckCircle, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

interface BorrowedBook {
  book_id: number;
  title: string;
  author: string;
  borrow_date: string;
  due_date: string;
  days_borrowed: number;
}

// Mock data for demo
const mockStudentBooks: { [key: string]: BorrowedBook[] } = {
  "S101": [
    {
      book_id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      borrow_date: "2024-09-10",
      due_date: "2024-09-24",
      days_borrowed: 16
    },
    {
      book_id: 5,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      borrow_date: "2024-09-05",
      due_date: "2024-09-19",
      days_borrowed: 21
    }
  ],
  "S104": [
    {
      book_id: 2,
      title: "1984",
      author: "George Orwell",
      borrow_date: "2024-09-11",
      due_date: "2024-09-25",
      days_borrowed: 15
    }
  ]
};

export default function ReturnBookPage() {
  const [studentId, setStudentId] = useState("");
  const [studentBooks, setStudentBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const searchStudentBooks = async () => {
    if (!studentId.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a student ID.",
        variant: "destructive",
      });
      return;
    }

    setSearching(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const books = mockStudentBooks[studentId] || [];
      setStudentBooks(books);
      
      if (books.length === 0) {
        toast({
          title: "No Books Found",
          description: `No borrowed books found for student ${studentId}`,
        });
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for student books.",
        variant: "destructive",
      });
    } finally {
      setSearching(false);
    }
  };

  const handleReturnBook = async (book: BorrowedBook) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Remove book from list
      setStudentBooks(prev => prev.filter(b => b.book_id !== book.book_id));
      
      setSuccess(`"${book.title}" returned successfully!`);
      
      toast({
        title: "Book Returned",
        description: `${book.title} has been returned by ${studentId}`,
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to return book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Return Book" 
        description="Process book returns from students"
      />

      <div className="p-6 max-w-4xl mx-auto">
        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-primary" />
              <span>Find Student</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-4 border-accent text-accent-foreground bg-accent/10">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-3">
              <div className="flex-1">
                <Label htmlFor="studentId" className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4" />
                  <span>Student ID</span>
                </Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter student ID (e.g., S101)"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchStudentBooks()}
                  className="text-lg"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={searchStudentBooks}
                  disabled={searching}
                  className="px-6"
                >
                  {searching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Borrowed Books List */}
        {studentBooks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Books Borrowed by {studentId}</span>
                <Badge variant="secondary">{studentBooks.length} books</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentBooks.map((book) => (
                  <div
                    key={book.book_id}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      isOverdue(book.due_date) ? 'border-destructive bg-destructive/5' : 'border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{book.title}</h3>
                        <p className="text-muted-foreground">{book.author}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-xs text-muted-foreground">
                            Borrowed: {new Date(book.borrow_date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Due: {new Date(book.due_date).toLocaleDateString()}
                          </p>
                          {isOverdue(book.due_date) && (
                            <Badge variant="destructive" className="text-xs">
                              OVERDUE
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">{book.days_borrowed}</p>
                        <p className="text-xs text-muted-foreground">days</p>
                      </div>
                      <Button
                        onClick={() => handleReturnBook(book)}
                        disabled={loading}
                        className="flex items-center space-x-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <RotateCcw className="w-4 h-4" />
                            <span>Return</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {studentId && studentBooks.length === 0 && !searching && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Books Found</h3>
              <p className="text-muted-foreground">
                Student {studentId} has no borrowed books to return.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}