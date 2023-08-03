import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import Icons from "@/lib/icons";
import { useEffect, useState } from "react";
import filters from "@/lib/filters";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import debounce from "lodash.debounce";

const Collapsibles = ({
  setPriceFilterValue,
  setSizesFilterValue,
  setColorsFilterValue,
}: {
  setPriceFilterValue: React.Dispatch<React.SetStateAction<number[]>>;
  setSizesFilterValue: React.Dispatch<React.SetStateAction<string[]>>;
  setColorsFilterValue: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [sizeTriggerOpen, setSizeTriggerOpen] = useState(false);
  const [colorTriggerOpen, setColorTriggerOpen] = useState(false);
  const [priceRangeTriggerOpen, setPriceRangeTriggerOpen] = useState(false);
  const [price, setPrice] = useState<number[]>([20]);
  const [sizesFilter, setSizesFilter] = useState<string[]>([]);
  const [colorsFilter, setColorsFilter] = useState<string[]>([]);
  const [priceFilterDebounce] = useState(() =>
    debounce(
      (price) => {
        setPriceFilterValue(price);
      },
      500,
      { leading: false, trailing: true }
    )
  );
  const [sizesFilterDebounce] = useState(() =>
    debounce(
      (sizes) => {
        setSizesFilterValue(sizes);
      },
      500,
      { leading: false, trailing: true }
    )
  );
  const [colorsFilterDebounce] = useState(() =>
    debounce(
      (colors) => {
        setColorsFilterValue(colors);
      },
      1000,
      { leading: false, trailing: true }
    )
  );
  useEffect(() => {
    sizesFilterDebounce(sizesFilter);
  }, [setSizesFilterValue, sizesFilter, sizesFilterDebounce]);

  useEffect(() => {
    colorsFilterDebounce(colorsFilter);
  }, [colorsFilter, setColorsFilterValue, colorsFilterDebounce]);

  const collapsibleContent = (
    data: { id: string; label: string }[],
    updateFilterState: React.Dispatch<React.SetStateAction<string[]>>,
    state: string[]
  ) => {
    return data.map((item, index) => {
      return (
        <div className="flex items-top space-x-2" key={index}>
          <Checkbox
            checked={state.includes(item.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                updateFilterState([...state, item.id]);
              } else {
                updateFilterState(state.filter((value) => value !== item.id));
              }
            }}
            id="terms1"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </label>
          </div>
        </div>
      );
    });
  };

  const sizes = collapsibleContent(filters.sizes, setSizesFilter, sizesFilter);
  const colors = collapsibleContent(
    filters.colors,
    setColorsFilter,
    colorsFilter
  );

  return (
    <div className="hidden md:block space-y-4">
      <h1 className="text-xl font-bold mb-4">Filters</h1>
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
        <CollapsibleContent
          className={cn("grid grid-cols-3 rows-auto gap-2 border-b-1 py-2")}
        >
          {colors}
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
              priceFilterDebounce(value);
            }}
            defaultValue={price}
            min={20}
            max={3_000}
            step={2}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Collapsibles;
