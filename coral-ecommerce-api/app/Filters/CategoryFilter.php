<?php

namespace App\Filters;


class CategoryFilter
{
  function __invoke($query, $categorySlug)
  {
    return $query->whereHas('category', function ($query) use ($categorySlug) {
      $query->where('category', $categorySlug);
    });
  }
}
