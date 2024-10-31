const Layout = ({ children }) => {
  return (
    
    <div className="flex flex-col md:flex-row min-h-screen">
      <main className="flex-1 w-full px-4 md:px-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
