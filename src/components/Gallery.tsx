import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Gallery = () => {
  // Placeholder images - user will replace these
  const solarInstallations = [
    { id: 1, title: "Residential Solar Panel Installation" },
    { id: 2, title: "Commercial Solar Setup" },
    { id: 3, title: "Rooftop Solar System" },
    { id: 4, title: "Solar Panel Maintenance" },
  ];

  const chakkiInstallations = [
    { id: 1, title: "10kW Chakki Installation" },
    { id: 2, title: "Commercial Chakki Setup" },
    { id: 3, title: "Chakki Motor Installation" },
    { id: 4, title: "Complete Chakki Unit" },
  ];

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Humare Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dekhen humare successful installations - solar panels aur atta chakki dono
          </p>
        </div>

        <Tabs defaultValue="solar" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="solar">Solar Installations</TabsTrigger>
            <TabsTrigger value="chakki">Chakki Installations</TabsTrigger>
          </TabsList>

          <TabsContent value="solar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solarInstallations.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                      <div className="text-center p-6">
                        <p className="text-sm text-muted-foreground">Installation Photo</p>
                        <p className="font-semibold mt-2">{item.title}</p>
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 p-6 bg-muted/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                📸 <strong>Note:</strong> Real installation photos will be added here. Images should be placed in 
                <code className="mx-1 px-2 py-1 bg-background rounded">/public/installations/solar/</code>
                folder.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="chakki">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chakkiInstallations.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center relative overflow-hidden">
                      <div className="text-center p-6">
                        <p className="text-sm text-muted-foreground">Installation Photo</p>
                        <p className="font-semibold mt-2">{item.title}</p>
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 p-6 bg-muted/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                📸 <strong>Note:</strong> Real installation photos will be added here. Images should be placed in 
                <code className="mx-1 px-2 py-1 bg-background rounded">/public/installations/chakki/</code>
                folder.
              </p>
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
    </section>
  );
};

export default Gallery;
