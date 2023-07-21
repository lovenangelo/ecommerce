import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
  console.log(disabled);

  return (
    <Button variant={"outline"} disabled={disabled} className={cn(className)}>
      <a type="button" href={url ?? ""}>
        <p>
          {text == "&laquo; Previous"
            ? "Prev"
            : text == "Next &raquo;"
            ? "Next"
            : text}
        </p>
      </a>
    </Button>
  );
};

export default PaginationButton;
