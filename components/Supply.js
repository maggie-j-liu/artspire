export const Supply = ({ name, chosen }) => {
  return (
    <div
      className={`rounded-lg  border-2 px-4 py-4 ${
        chosen
          ? "border-emerald-300 bg-emerald-50 hover:border-emerald-400"
          : "border-gray-300 bg-white hover:border-gray-400"
      }`}
    >
      {name}
    </div>
  );
};
