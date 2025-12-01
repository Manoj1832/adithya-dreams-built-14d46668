import { packageCategories } from "@/data/pricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PackageDetailsTable = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Package Details</Badge>
          <h2 className="text-3xl md:text-4xl heading-display mb-4">
            Compare Our <span className="text-primary">Construction Packages</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the package that best fits your needs. All packages include complete construction from planning to supervision with A-Z guidance.
          </p>
        </div>

        <Card className="shadow-premium overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
            <CardTitle className="text-center text-lg">
              From Planning to Supervision - A to Z Guidance (Total Contract)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full" data-testid="package-details-table">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-semibold min-w-[200px]" scope="col">Subject</th>
                    <th className="text-center p-4 font-semibold min-w-[180px] bg-blue-50/50" scope="col">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-blue-600">Option-1</span>
                        <span className="text-xs text-muted-foreground">(Standard Package)</span>
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold min-w-[180px] bg-purple-50/50" scope="col">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-purple-600">Option-2</span>
                        <span className="text-xs text-muted-foreground">(Premium Package)</span>
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold min-w-[180px] bg-amber-50/50" scope="col">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-amber-600">Option-3</span>
                        <span className="text-xs text-muted-foreground">(Luxury Package)</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {packageCategories.map((category, index) => (
                    <tr 
                      key={index} 
                      className={`border-b hover:bg-muted/30 transition-colors ${index === 0 ? 'bg-primary/5 font-semibold' : ''}`}
                      data-testid={`package-row-${index}`}
                    >
                      <td className="p-4 font-medium" data-testid={`category-name-${index}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm w-6">{index + 1}</span>
                          {category.name}
                        </div>
                      </td>
                      <td className="p-4 text-center text-sm bg-blue-50/30" data-testid={`standard-${index}`}>
                        {category.standard}
                      </td>
                      <td className="p-4 text-center text-sm bg-purple-50/30" data-testid={`premium-${index}`}>
                        {category.premium}
                      </td>
                      <td className="p-4 text-center text-sm bg-amber-50/30" data-testid={`luxury-${index}`}>
                        {category.luxury}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4 p-4">
              {packageCategories.map((category, index) => (
                <Card key={index} className="overflow-hidden" data-testid={`mobile-package-row-${index}`}>
                  <CardHeader className="p-3 bg-muted/50">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <span className="text-muted-foreground">{index + 1}.</span>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 shrink-0">Standard</Badge>
                      <span className="text-sm text-right">{category.standard}</span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50 shrink-0">Premium</Badge>
                      <span className="text-sm text-right">{category.premium}</span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 shrink-0">Luxury</Badge>
                      <span className="text-sm text-right">{category.luxury}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            All prices are subject to change. Please contact us for the latest quotation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackageDetailsTable;
