<?php

namespace App\Filters;


class PriceFilter
{
  function __invoke($query, $priceSlug)
  {
    return $query->whereHas('price', function ($query) use ($priceSlug) {
      $query->where('price', '>=', $priceSlug);
    });
  }
}
