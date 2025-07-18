function Button({ children, filter, handleFilter, active }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${
        filter === active ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Button;
