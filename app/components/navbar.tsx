export default function Navbar() {
  return (
    <nav>
      <div className="flex   p-2 bg-[color:var(--bg-dark)] text-[color:var(--accent)] w-full">
        <div className="h-10 w-10 mr-2">
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              d="m9.134 19.319 11.587-11.588c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-11.606 11.566c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 10.114-10.079 2.335 2.327-10.099 10.101z"
              fillRule="nonzero"
            />
          </svg>
        </div>

        <div className="flex flex-col justify-between ">
          <div className="text-xl font-bold">BytterFly</div>
          <div className="text-xs">Your AI Writing Assitant</div>
        </div>
      </div>
    </nav>
  );
}
