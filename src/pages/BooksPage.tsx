import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Eye, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/SearchBar";
import PageHeader from "@/components/PageHeader";
import type { Book } from "@/types/teacherTypes";

// Mock data for demo
const mockBooks: Book[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    total_quantity: 5,
    available_quantity: 2,
    borrowed_by: [
      { student_id: "S101", student_name: "Alice Johnson", borrow_date: "2024-09-10" },
      { student_id: "S102", student_name: "Bob Smith", borrow_date: "2024-09-12" },
      { student_id: "S103", student_name: "Carol Davis", borrow_date: "2024-09-14" }
    ]
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    total_quantity: 4,
    available_quantity: 2,
    borrowed_by: [
      { student_id: "S104", student_name: "David Lee", borrow_date: "2024-09-11" },
      { student_id: "S105", student_name: "Eva Green", borrow_date: "2024-09-13" }
    ]
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    total_quantity: 3,
    available_quantity: 3,
    borrowed_by: []
  }
];

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBooks(mockBooks);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const toggleExpanded = (bookId: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(bookId)) {
      newExpanded.delete(bookId);
    } else {
      newExpanded.add(bookId);
    }
    setExpandedRows(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Books" description="Manage your library collection" />
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Books" 
        description="Manage your library collection"
      >
        <SearchBar
          placeholder="Search by title, author, or ISBN..."
          value={searchTerm}
          onChange={setSearchTerm}
          className="w-80"
        />
      </PageHeader>

      <div className="p-6">
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="transition-all duration-200 hover:shadow-md">
              <CardContent className="p-0">
                {/* Main Row */}
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{book.title}</h3>
                      <p className="text-muted-foreground">{book.author}</p>
                      <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{book.total_quantity}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{book.available_quantity}</p>
                      <p className="text-xs text-muted-foreground">Available</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{book.borrowed_by.length}</p>
                      <p className="text-xs text-muted-foreground">Borrowed</p>
                    </div>
                    
                    {book.borrowed_by.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(book.id)}
                        className="flex items-center space-x-1"
                      >
                        {expandedRows.has(book.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <span>Details</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedRows.has(book.id) && book.borrowed_by.length > 0 && (
                  <div className="border-t bg-muted/30 p-6">
                    <h4 className="font-medium text-foreground mb-4">Currently Borrowed By:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {book.borrowed_by.map((borrower) => (
                        <div
                          key={borrower.student_id}
                          className="flex items-center justify-between p-3 bg-background rounded-lg border"
                        >
                          <div>
                            <p className="font-medium text-foreground">{borrower.student_name}</p>
                            <p className="text-sm text-muted-foreground">{borrower.student_id}</p>
                          </div>
                          <Badge variant="secondary">
                            {new Date(borrower.borrow_date).toLocaleDateString()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No books found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms" : "No books in the library yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}