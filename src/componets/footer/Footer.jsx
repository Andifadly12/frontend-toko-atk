import Button from "../Button";

const Footer = ({ currentPage, totalPages, prevPage, nextPage }) => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-4">
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        <span className="text-sm text-slate-600">
          Page {currentPage} dari {totalPages || 1}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
