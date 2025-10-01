import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Star, User } from "lucide-react";
import { useAddReviewMutation, useGetReviewsByHotelQuery } from "@/lib/api";

export const HotelReviews = ({ hotelId }) => {
  const { data: reviews = [], isLoading, isError } = useGetReviewsByHotelQuery(hotelId);
  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();

  console.log(reviews);

  const handleAddReview = async () => {
    try {
      await addReview({
        hotelId: _id,
        comment: "This is a test review",
        rating: 5,
      }).unwrap();
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2 border border-border rounded-lg p-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <p className="text-destructive">Failed to load reviews.</p>;

  return (
    <>
      <div className="flex items-center space-x-3 mb-3">
        <h1 className="text-xl lg:text-2xl font-semibold">
          Reviews <span>({reviews.length})</span>
        </h1>
        <Button disabled={isAddReviewLoading} onClick={handleAddReview} className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Add Review
        </Button>
      </div>
      <Card>
        <CardContent className="px-3 lg:px-6 space-y-4">
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review, idx) => {
                const reviewerName = review.fullName ? `${review.fullName}` : "Anonymous";
                return (
                  <div key={idx} className="rounded-lg border border-border p-4 shadow-sm bg-card hover:shadow-md transition">
                    {/* Header: Name + Rating */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <span className="font-medium">{reviewerName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-amber-300 text-amber-400" : "text-muted-foreground"}`} />
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
