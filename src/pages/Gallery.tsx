import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [solarImages, setSolarImages] = useState<{ id: number; title: string; url?: string }[]>([
    { id: 1, title: "Residential Solar Panel Installation" },
    { id: 2, title: "Commercial Solar Setup" },
    { id: 3, title: "Rooftop Solar System" },
    { id: 4, title: "Solar Panel Maintenance" },
  ]);

  const [chakkiImages, setChakkiImages] = useState<{ id: number; title: string; url?: string }[]>([
    { id: 1, title: "10kW Chakki Installation" },
    { id: 2, title: "Commercial Chakki Setup" },
    { id: 3, title: "Chakki Motor Installation" },
    { id: 4, title: "Complete Chakki Unit" },
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, category: 'solar' | 'chakki') => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            title: file.name.replace(/\.[^/.]+$/, ""),
            url: e.target?.result as string,
          };
          
          if (category === 'solar') {
            setSolarImages((prev) => [...prev, newImage]);
          } else {
            setChakkiImages((prev) => [...prev, newImage]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (id: number, category: 'solar' | 'chakki') => {
    if (category === 'solar') {
      setSolarImages((prev) => prev.filter((img) => img.id !== id));
    } else {
      setChakkiImages((prev) => prev.filter((img) => img.id !== id));
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Humare Projects Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Dekhen humare successful installations - Solar panels aur Atta Chakki dono ki tasveerein
          </p>
        </div>

        <Tabs defaultValue="solar" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="solar">Solar Installations</TabsTrigger>
            <TabsTrigger value="chakki">Chakki Installations</TabsTrigger>
          </TabsList>

          <TabsContent value="solar">
            {/* Upload Section */}
            <div className="mb-6">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'solar')}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-primary/50 rounded-lg p-6 hover:border-primary transition-colors text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Solar Installation Ki Photos Upload Karein</p>
                  <p className="text-xs text-muted-foreground mt-1">Click karein ya drag & drop</p>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solarImages.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group relative">
                  <CardContent className="p-0">
                    <div 
                      className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden cursor-pointer"
                      onClick={() => item.url && setSelectedImage(item.url)}
                    >
                      {item.url ? (
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-6">
                          <p className="text-sm text-muted-foreground">Installation Photo</p>
                          <p className="font-semibold mt-2">{item.title}</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                    </div>
                    {item.url && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(item.id, 'solar');
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chakki">
            {/* Upload Section */}
            <div className="mb-6">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'chakki')}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-primary/50 rounded-lg p-6 hover:border-primary transition-colors text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Chakki Installation Ki Photos Upload Karein</p>
                  <p className="text-xs text-muted-foreground mt-1">Click karein ya drag & drop</p>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chakkiImages.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group relative">
                  <CardContent className="p-0">
                    <div 
                      className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center relative overflow-hidden cursor-pointer"
                      onClick={() => item.url && setSelectedImage(item.url)}
                    >
                      {item.url ? (
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-6">
                          <p className="text-sm text-muted-foreground">Installation Photo</p>
                          <p className="font-semibold mt-2">{item.title}</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                    </div>
                    {item.url && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(item.id, 'chakki');
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2">Apna Project Start Karein!</h3>
              <p className="mb-4 opacity-90">
                Solar ya Chakki installation ke liye humse abhi contact karein
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:9277302997"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  📞 Call: 9277302997
                </a>
                <a
                  href="https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20mujhe%20installation%20ke%20baare%20mein%20jaankari%20chahiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  💬 WhatsApp Karein
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <img src={selectedImage} alt="Installation" className="w-full h-auto rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
