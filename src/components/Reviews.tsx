import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Review {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  review: string;
  date: string;
}

const Reviews = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Rajesh Sharma",
      location: "Prayagraj, UP",
      service: "5kW Solar System",
      rating: 5,
      review: "Bahut badiya service hai! 5kW ka solar lagwaya, ab bill sirf ₹500 aata hai. Pehle ₹4800 tha. Installation bhi time par hui aur team bilkul professional thi.",
      date: "December 2024"
    },
    {
      id: 2,
      name: "Sunita Devi",
      location: "Varanasi, UP",
      service: "Chakki Installation",
      rating: 5,
      review: "Hamara chakki business chalu ho gaya! Havells motor lagayi unhone, bilkul smooth chalta hai. Service ke baad bhi support dete hain. Dhanyavaad Preeti Solar!",
      date: "November 2024"
    },
    {
      id: 3,
      name: "Amit Kumar",
      location: "Lucknow, UP",
      service: "3kW Solar + Subsidy",
      rating: 5,
      review: "Subsidy ka pura kaam unhone karwaya. Hume kuch nahi karna pada. ₹45,000 ki subsidy mil gayi aur solar bhi lag gaya. Highly recommended!",
      date: "January 2025"
    },
    {
      id: 4,
      name: "Priya Singh",
      location: "Kanpur, UP",
      service: "Solar Maintenance AMC",
      rating: 5,
      review: "Maintenance contract liya hai. Regular cleaning aur checking karte hain. Panel ki efficiency maintain rehti hai. Very satisfied!",
      date: "October 2024"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Reviews - Kya Kehte Hain Log</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Humare satisfied customers ke reviews padhen aur jaanein unka experience kaisa raha
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                <p className="text-sm mb-4 text-muted-foreground italic">"{review.review}"</p>

                <div className="border-t pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {review.service}
                    </span>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-2">Apna Review Bhi Share Karein!</h3>
              <p className="text-muted-foreground mb-4">
                Agar aapne humare saath kaam kiya hai, toh apna experience share karein
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:9277302997"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  📞 Call Karein
                </a>
                <a
                  href="https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20main%20apna%20review%20share%20karna%20chahta%20hoon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  💬 WhatsApp Par Review Dein
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
