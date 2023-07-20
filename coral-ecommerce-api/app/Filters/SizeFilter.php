<?php

namespace App\Filters;


class SizeFilter
{
  public function __invoke($query, $sizeSlug)
  {
    // Check if all sizes are false, if so, return the query without any filtering
    if (count(array_filter($sizeSlug, function ($size) {
      clock($size, $size == 'true');
      return !filter_var($size, FILTER_VALIDATE_BOOLEAN);
    })) === 3) {
      return $query;
    }

    return $query->whereHas('size', function ($query) use ($sizeSlug) {
      // Loop through the sizes array and add a where clause for each size
      foreach ($sizeSlug as $size => $value) {
        // Convert the string value to a boolean
        $boolValue = filter_var($value, FILTER_VALIDATE_BOOLEAN);
        // Add where clause based on the size and the boolean value
        if ($boolValue) {
          $query->where($size, $boolValue);
        }
      }
    });

    return $query;
  }
}
