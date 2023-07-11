import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import Icons from "@/lib/icons";
import { useState } from "react";
import filters from "@/lib/filters";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const Collapsibles = () => {
  const [sizeTriggerOpen, setSizeTriggerOpen] = useState(false);
  const [colorTriggerOpen, setColorTriggerOpen] = useState(false);
  const [brandTriggerOpen, setBrandTriggerOpen] = useState(false);
  const [priceRangeTriggerOpen, setPriceRangeTriggerOpen] = useState(false);
  const [price, setPrice] = useState<number[]>([30]);

  const collapsibleContent = (data: string[]) => {
    return data.map((item, index) => {
      return (
        <div className="items-top flex space-x-2" key={index}>
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item}
            </label>
          </div>
        </div>
      );
    });
  };

  const sizes = collapsibleContent(filters.sizes);
  const colors = collapsibleContent(filters.colors);
  const brands = collapsibleContent(filters.brands);

  return (
    <>
      {/* Size */}
      <Collapsible>
        <div className="flex items-center justify-between pr-8">
          <p className="font-semibold text-xl">Size</p>
          <CollapsibleTrigger
            onClick={() => {
              setSizeTriggerOpen(!sizeTriggerOpen);
            }}
          >
            <span>
              {sizeTriggerOpen ? <Icons.minusIcon /> : <Icons.plusIcon />}
            </span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent
          className={cn("grid grid-cols-3 rows-auto gap-2 border-b-2 py-2")}
        >
          {sizes}
        </CollapsibleContent>
      </Collapsible>

      {/* Color */}
      <Collapsible className="border-b-2">
        <div className="flex items-center justify-between pr-8">
          <p className="font-semibold text-xl">Color</p>
          <CollapsibleTrigger
            onClick={() => {
              setColorTriggerOpen(!colorTriggerOpen);
            }}
          >
            <span>
              {colorTriggerOpen ? <Icons.minusIcon /> : <Icons.plusIcon />}
            </span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col space-y-2 py-2">
          {colors}
        </CollapsibleContent>
      </Collapsible>

      {/* Brands */}
      <Collapsible className="border-b-2">
        <div className="flex items-center justify-between pr-8">
          <p className="font-semibold text-xl">Brand</p>
          <CollapsibleTrigger
            onClick={() => {
              setBrandTriggerOpen(!brandTriggerOpen);
            }}
          >
            <span>
              {brandTriggerOpen ? <Icons.minusIcon /> : <Icons.plusIcon />}
            </span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col space-y-2 py-2">
          {brands}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible className="border-b-2">
        <div className="flex items-center justify-between pr-8">
          <p className="font-semibold text-xl">Price Range</p>
          <CollapsibleTrigger
            onClick={() => {
              setPriceRangeTriggerOpen(!priceRangeTriggerOpen);
            }}
          >
            <span>
              {priceRangeTriggerOpen ? <Icons.minusIcon /> : <Icons.plusIcon />}
            </span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col space-y-2 mt-4">
          <p>${price}</p>
          <Slider
            onValueChange={(value) => {
              setPrice(value);
            }}
            defaultValue={price}
            min={30}
            max={55_000}
            step={10}
          />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default Collapsibles;
