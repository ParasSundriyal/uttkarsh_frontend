import Footer from "./Footer";
import Navbar from "./Navbar";
import SlidingChat from "./SlidingChat";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto">
        {children}
        <SlidingChat />
        </main>
      <Footer />
    </>
  );
};

export default Layout;
