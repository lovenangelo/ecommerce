<?php

namespace App\Filters;


class ColorFilter
{
  function __invoke($query, $colorSlugs)
  {
    return $query->where(function ($query) use ($colorSlugs) {
      foreach ($colorSlugs as $colorSlug) {
        $query->orWhereHas('color', function ($query) use ($colorSlug) {
          $query->where('color', $colorSlug);
        });
      }
    });
  }
}
