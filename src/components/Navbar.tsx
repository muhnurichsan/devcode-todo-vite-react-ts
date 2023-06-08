const Navbar = () => {
  return (
    <nav
      data-cy="navbar-todo"
      className="bg-primary w-full h-[105px] flex items-center"
    >
      <div className="uppercase text-white text-2xl font-bold mx-20 lg:mx-80">
        To do List App
      </div>
    </nav>
  );
};

export default Navbar;
