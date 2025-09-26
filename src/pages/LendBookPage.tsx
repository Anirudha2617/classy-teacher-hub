import { useState } from "react";
import { Plus, User, BookOpen, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

export default function LendBookPage() {
  const [studentId, setStudentId] = useState("");
  const [bookQuery, setBookQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLendBook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId.trim() || !bookQuery.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both student ID and book information.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(
        `Book "${bookQuery}" successfully lent to student ${studentId}`
      );
      
      toast({
        title: "Book Lent Successfully",
        description: `${bookQuery} has been lent to ${studentId}`,
      });
      
      // Reset form
      setStudentId("");
      setBookQuery("");
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to lend book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Lend Book" 
        description="Issue books to students"
      />

      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-primary" />
              <span>Issue New Book</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-6 border-accent text-accent-foreground bg-accent/10">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLendBook} className="space-y-6">
              {/* Student Search */}
              <div className="space-y-2">
                <Label htmlFor="studentId" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Student ID</span>
                </Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter student ID (e.g., S101)"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the student's unique ID to identify them
                </p>
              </div>

              {/* Book Search */}
              <div className="space-y-2">
                <Label htmlFor="bookQuery" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Book Information</span>
                </Label>
                <Input
                  id="bookQuery"
                  type="text"
                  placeholder="Enter book title, author, or ISBN"
                  value={bookQuery}
                  onChange={(e) => setBookQuery(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-muted-foreground">
                  Search by book title, author name, or ISBN number
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Lend Book
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Student IDs are case-sensitive (e.g., S101, not s101)</li>
              <li>• You can search books by partial title or author name</li>
              <li>• ISBN search requires the complete number</li>
              <li>• Books are automatically due 14 days from today</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}