import { menuImage } from "../config";

function Menu() {
  return (
    <div className="w-full h-full flex flex-col gap-5 justify-center items-center border-b-[2px] border-primary">
      <picture>
        {menuImage.desktop.map((src) => (
          <source media="(min-width: 1024px)" srcSet={src} />
        ))}
        {/* <source media="(min-width: 1024px)" srcSet={menuImage.desktop} />
        <source media="(min-width: 1024px)" srcSet={menuImage.desktop} /> */}
        {menuImage.mobile.map((src) => (
          <img src={src} alt="Menu" className="w-full h-full " />
        ))}
      </picture>
    </div>
  );
}

export default Menu;
