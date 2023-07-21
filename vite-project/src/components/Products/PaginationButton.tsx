import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { changeQuery } from "@/redux/slices/productQuerySlice";
const PaginationButton = ({
  text,
  className,
  disabled,
  url,
}: {
  text: number | string | null;
  className?: string;
  disabled?: boolean;
  url: string | null;
}) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(changeQuery(url ?? ""));
      }}
      variant={"outline"}
      disabled={disabled}
      className={cn(className)}
    >
      <p>
        {text == "&laquo; Previous"
          ? "Prev"
          : text == "Next &raquo;"
          ? "Next"
          : text}
      </p>
    </Button>
  );
};

export default PaginationButton;
