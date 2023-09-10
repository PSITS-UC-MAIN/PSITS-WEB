import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "../ui/separator";
import { SlidersHorizontal } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const MerchandiseFilter = () => {
  return (
    <div className="w-[320px]">
      <div className="flex items-center gap-4">
        <SlidersHorizontal />
        <p>Filters</p>
      </div>
      <Separator className="mt-8 mb-6" />
      <div className="flex items-center justify-between">
        <Label htmlFor="in-stock" className="font-bold">
          In stock only
        </Label>
        <Switch id="in-stock" />
      </div>
      <Separator className="my-6" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold text-sm hover:no-underline">Price</AccordionTrigger>
          <AccordionContent>Coming Soon!</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MerchandiseFilter;
