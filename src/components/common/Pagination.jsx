export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
   < div className="flex items-center justify-center gap-6 mt-1 mb-2">

  <button
    disabled={currentPage === 1}
    onClick={() => onPageChange(currentPage - 1)}
    className="px-4 py-2 rounded-lg border border-teal-600 text-teal-600 
               hover:bg-teal-600 hover:text-white transition 
               disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Previous
  </button>

  <span className="text-teal-700 font-medium">
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => onPageChange(currentPage + 1)}
    className="px-4 py-2 rounded-lg border border-teal-600 text-teal-600 
               hover:bg-teal-600 hover:text-white transition 
               disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Next
  </button>

</div>
  );
}