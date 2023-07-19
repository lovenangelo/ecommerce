<?php

namespace App\Filters;

class ProductFilters
{
  protected $filters = [
    'category' => CategoryFilter::class,
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
    $filters = request()->all();
    return $filters['filters'];
  }
}
