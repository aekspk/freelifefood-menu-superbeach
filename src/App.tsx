import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import RecommendedMenu from "./components/RecommendMenu";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import order from "./assets/order.svg";
import { contact } from "./config";

function App() {
  return (
    <>
      <div className="flex flex-col relative">
        <div
          // style={{ backgroundImage: `url(${BodyBG})` }}
          className={` bg-cover flex flex-col bg-top bg-no-repeat mb-6`}
        >
          <Navbar />
          <RecommendedMenu />
        </div>
        <Menu />
        <a
          href={`${contact[0].link}`}
          className="bg-rose-500 flex justify-center items-center  gap-2 w-[131px] h-[32px] rounded-full fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <img src={`${order}`}></img>
          <p className="font-medium font-kanit text-base text-white">
            สั่งอาหารที่นี่
          </p>
        </a>
        <Footer />
      </div>
    </>
  );
}

export default App;
