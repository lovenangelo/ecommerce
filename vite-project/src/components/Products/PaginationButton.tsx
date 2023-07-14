const PaginationButton = ({ display }: { display: number | string }) => {
  return (
    <a href="/" className="p-4 border rounded-mld">
      {display}
    </a>
  );
};

export default PaginationButton;
