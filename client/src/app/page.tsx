import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import About from "./components/About";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Content />
      <About />
      <Footer />
    </div>
  );
}
