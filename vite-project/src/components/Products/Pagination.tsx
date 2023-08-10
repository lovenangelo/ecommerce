import React from "react";
import PaginationButton from "./PaginationButton";

interface PaginationProps {
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  links: {
    url: string | null;
    active: boolean;
    label: number | string | null;
  }[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Pagination: React.FC<PaginationProps> = ({
  nextPageUrl,
  prevPageUrl,
  links,
  setIsLoading,
}) => {
  if (links == null) {
    return <></>;
  }
  const numberedButtons = links.map((link, index) => {
    if (link.label == "&laquo; Previous") {
      link.url = prevPageUrl;
      link.active = Boolean(!prevPageUrl);
    }
    if (link.label == "Next &raquo;") {
      link.url = nextPageUrl;
      link.active = Boolean(!nextPageUrl);
    }
    return (
      <li key={index}>
        <PaginationButton
          disabled={link.active}
          url={link.url}
          text={link.label}
          setIsLoading={setIsLoading}
        />
      </li>
    );
  });

  return (
    <ul className="flex space-x-2 w-full justify-center items-center mt-4">
      {numberedButtons}
    </ul>
  );
};

export default Pagination;
