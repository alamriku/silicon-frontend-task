import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Pagination({data, handlePageClick}: any) {
    let activeClass = "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
    const generatePaginationButtons = () => {
        const buttons = [];
        console.log(data.totalPages)
        for (let i = 1; i <= data.totalPages; i++) {
            buttons.push(
                <a
                    key={i}
                    onClick={() => handlePageClick(i)}
                    href="#"
                    aria-current="page"
                    className={classNames(data.currentPage === i ? activeClass : "","relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0")}
                >
                    {i}
                </a>
            );
        }
        return buttons;
    };

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-5">
            <div className="flex-1 flex justify-between sm:hidden">
                <a

                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </a>
                <a

                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{data.starting}</span> to <span className="font-medium">{data.ending}</span> of{' '}
                        <span className="font-medium">{data && data.flattenedData.length > 0 && data.flattenedData.length }</span>
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a
                            onClick={() => handlePageClick(data.currentPage === 0 ? 1 : --data.currentPage)}
                            href="#"
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                        {
                            generatePaginationButtons()
                        }
                        <a
                            onClick={() => handlePageClick(data.currentPage === 0 ? 1 : data.currentPage !== data.totalPages ? ++data.currentPage : data.totalPages)}
                            href="#"
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
