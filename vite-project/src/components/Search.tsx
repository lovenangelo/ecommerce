import Icons from "@/lib/icons";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import debounce from "lodash.debounce";
import { useQuery } from "react-query";
import getSearchResults, { getNextData } from "@/lib/api/search";
import { Button } from "./ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "wouter";
export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [searchResultsList, setSearchResultsList] = useState<JSX.Element[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [searchDebounce] = useState(() => {
    return debounce((value: string) => {
      setSearch(value);
    }, 300);
  });
  const [seeMoreLoading, setSeeMoreLoading] = useState(false);
  const [showDiv, setShowDiv] = useState(false);

  const handleInputFocus = () => {
    setShowDiv(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowDiv(false);
    }, 200);
  };

  const handleSearch = async () => await getSearchResults(search);

  const searchResults = useQuery(["get-search-results", search], handleSearch, {
    enabled: search.length !== 0,
    retry: 2,
    onSuccess(data) {
      const searchOptions: JSX.Element[] = data?.data.data.data.map(
        (result: {
          image: {
            url: string;
          };
          name: string;
          subtitle: string;
          id: number;
        }) => {
          return (
            <Link key={result.id} to={`/item/${result.id}`}>
              <Button
                onClick={() => console.log("clicked")}
                variant={"ghost"}
                className="border-b-2 h-24 flex items-center w-full justify-between p-4"
              >
                <div className="w-1/4 h-full">
                  <LazyLoadImage
                    className="w-full h-full object-cover rounded-md"
                    src={`http://localhost:8000/${result.image.url}`}
                    alt=""
                  />
                </div>
                <div className=" text-right">
                  <h1 className="font-bold text-lg">{result.name}</h1>
                  <p className="w-48 truncate">{result.subtitle}</p>
                </div>
              </Button>
            </Link>
          );
        }
      );
      setNextPageUrl(data?.data.data.next_page_url);
      setSearchResultsList(searchOptions);
    },
  });

  const handleSeeMore = async () => {
    setSeeMoreLoading(true);
    const res = await getNextData(nextPageUrl);
    console.log(res);
    const results: JSX.Element[] = res.data.data.data.map(
      (result: {
        image: {
          url: string;
        };
        name: string;
        subtitle: string;
        id: number;
      }) => {
        return (
          <Link key={result.id} to={`/item/${result.id}`}>
            <Button
              variant={"ghost"}
              className="border-b-2 h-24 flex items-center w-full justify-between p-4"
            >
              <div className="w-1/4 h-full">
                <LazyLoadImage
                  className="w-full h-full object-cover rounded-md"
                  src={`http://localhost:8000/${result.image.url}`}
                  alt=""
                />
              </div>
              <div className=" text-right">
                <h1 className="font-bold text-lg">{result.name}</h1>
                <p className="w-48 truncate">{result.subtitle}</p>
              </div>
            </Button>
          </Link>
        );
      }
    );
    setSearchResultsList(searchResultsList.concat(results));
    setNextPageUrl(res.data.data.data.next_page_url);
    setSeeMoreLoading(false);
  };

  return (
    <div className="h-max w-max relative flex flex-col">
      <div className="flex items-center border shadow-sm px-2 rounded bg-[#F1F1F1] md:w-96 w-full">
        <Icons.search height={20} width={20} className="h-12" />
        <Input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
            searchDebounce(event.target.value);
          }}
          className={cn(
            "w-full border-0 shadow-none focus-visible:ring-0 bg-transparent"
          )}
          placeholder="Search for products or brands..."
        />
      </div>
      {showDiv && (
        <div className="translate-y-14 max-h-60 absolute w-full bg-primary-foreground z-50 overflow-auto rounded-b-lg">
          {searchResults.data && (
            <>
              {searchResultsList}
              {nextPageUrl && (
                <Button
                  onClick={handleSeeMore}
                  variant={"ghost"}
                  className="w-full"
                >
                  See more{" "}
                  {seeMoreLoading && (
                    <span className="ml-2">
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    </span>
                  )}
                </Button>
              )}
            </>
          )}
          {searchResults.data?.data.data.data.length == 0 && (
            <div className="border-b-2 h-12 flex items-center w-full justify-center">
              <h1>No results</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
