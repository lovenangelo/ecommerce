<?php

namespace App\Filters;

class ProductFilters
{
  protected $filters = [
    'category' => CategoryFilter::class,
    'sizes' => SizeFilter::class,
    'colors' => ColorFilter::class,
    'price' => PriceFilter::class
  ];

  public function apply($query)
  {
    foreach ($this->receivedFilters() as $name => $value) {
      $filterInstance = new $this->filters[$name];
      $query = $filterInstance($query, $value);
    }

    return $query;
  }


  public function receivedFilters()
  {
    clock(request()->all());
    return request()->only(array_keys($this->filters));
  }
}
