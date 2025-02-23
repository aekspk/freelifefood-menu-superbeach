import { logo } from "../config.ts";
import { contact } from "../config.ts";

function Footer() {
  return (
    <footer className="flex justify-between items-center gap-4 px-4 py-4 bg-[#fffef2]">
      <img src={`${logo}`} alt="logo-icon" className="h-[50px]" />
      <div className="flex gap-4 justify-center">
        {contact.map((item, index) => {
          return (
            <a key={index} href={`${item.link}`}>
              <img src={`${item.icon}`} alt={`${item.name}-icon`} />
            </a>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
