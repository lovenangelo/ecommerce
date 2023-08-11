import Icons from "../lib/icons";
import { Input } from "./ui/input";
import { useState } from "react";
import debounce from "lodash.debounce";
import { useQuery } from "react-query";
import getSearchResults from "@/lib/api/search";
import { Button } from "./ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "wouter";
import { cn } from "../lib/utils";
import images from "@/lib/images";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  changeSearchQuery,
  resetSearchQuery,
} from "@/redux/slices/searchQuerySlice";

type SearchResult = {
  image: {
    url: string;
  };
  name: string;
  subtitle: string;
  category: string;
  id: number;
};

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [searchResultsList, setSearchResultsList] = useState<JSX.Element[]>([]);
  const searchQuery = useAppSelector((state) => state.searchQuery.value);
  const [searchDebounce] = useState(() => {
    return debounce((value: string) => {
      dispatch(resetSearchQuery());
      setSearch(value);
      setSearchResultsList([]);
    }, 300);
  });

  const [showDiv, setShowDiv] = useState(false);
  const dispatch = useAppDispatch();
  const handleSearch = async () => await getSearchResults(searchQuery, search);

  const searchResults = useQuery(["get-search-results", search], handleSearch, {
    enabled: search.length !== 0,
    retry: 2,
    onSuccess(data) {
      const searchResultsData: SearchResult[] | null = data?.data.data.data;
      if (searchResultsList.length < 5 && searchResultsData?.length == 0) {
        setSearchResultsList([]);
      }
      if (searchResultsData !== null && searchResultsData.length !== 0) {
        const searchOptions: JSX.Element[] = searchResultsData.map(
          (result: SearchResult) => {
            return (
              <Link
                key={result.id}
                to={`/products/${result.category}/${result.id}`}
              >
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"ghost"}
                  className="border-b-2 h-24 flex items-center w-full justify-between p-4"
                >
                  <div className="sm:w-1/4 h-full">
                    <LazyLoadImage
                      height={"100%"}
                      width={"100%"}
                      className="w-full h-full object-cover rounded-md"
                      src={
                        result.image == null
                          ? images.productItemFallback
                          : `http://localhost:8000/${result.image.url}`
                      }
                      alt=""
                    />
                  </div>
                  <div className="text-left sm:text-right">
                    <h1 className="font-bold text-lg">{result.name}</h1>
                    <p className="w-48 truncate">{result.subtitle}</p>
                  </div>
                </Button>
              </Link>
            );
          }
        );
        setSearchResultsList([...searchResultsList, ...searchOptions]);

        dispatch(changeSearchQuery(data?.data.data.next_page_url ?? null));
      }
    },
  });

  const refetch = searchResults.refetch;

  const handleSeeMore = async () => {
    if (searchQuery) {
      refetch();
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setSearchResultsList([]);
      setShowDiv(false);
    }, 300);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom) {
      handleSeeMore();
    }
  };

  return (
    <div className="h-max w-max relative flex flex-col ml-8 ring-[#17494D] ring-0 focus-visible:ring-2">
      <div className="group flex items-center border shadow-sm px-2 rounded bg-[#F1F1F1] sm:w-96 w-full">
        <Icons.search height={20} width={20} className="h-12" />
        <Input
          onBlur={handleOnBlur}
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
            searchDebounce(event.target.value);
            if (event.target.value.length !== 0) {
              setShowDiv(true);
            }
          }}
          className={cn(
            "w-full border-0 shadow-none focus-visible:ring-0 bg-transparent"
          )}
          placeholder="Search for products or brands..."
        />
      </div>
      <div className="translate-y-14 max-h-60 absolute w-full bg-primary-foreground z-50 overflow-auto rounded-b-lg">
        <datalist id="search-results">{searchResultsList}</datalist>
      </div>
      {showDiv && (
        <div
          onScroll={handleScroll}
          data-testId="search-scroll-container"
          className="translate-y-14 max-h-60 absolute w-full bg-primary-foreground z-50 overflow-auto rounded-b-lg"
        >
          {searchResults.data && <>{searchResultsList}</>}
          {searchResultsList.length == 0 && search.length !== 0 && (
            <div className="border-b-2 h-12 flex items-center w-full justify-center">
              <h1>No results</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
