export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 p-4 mt-8 border-t border-gray-200 text-center text-sm text-gray-600">
      <p className="mb-1">
        &copy; {year} <span className="font-semibold">Fabricio Dario Nicolas Augusto</span>
      </p>
      <p className="">TLP 2</p>
    </footer>
  );
};
