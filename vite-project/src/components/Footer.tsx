import footer, { footerAddress, footerYear } from "@/lib/footer";
import icons from "@/lib/icons";
const Footer = () => {
  const footerLinks = footer.map((item) => {
    return (
      <ul className="list-none text-primary-foreground">
        <li className="font-bold mb-2">{item.title}</li>
        {item.links.map((link) => (
          <li className="text-sm text-[#B6B6B6]">
            <a href="/">{link}</a>
          </li>
        ))}
      </ul>
    );
  });
  return (
    <footer className="container md:flex md:justify-between h-max bg-[#1B4B66] mt-8 py-5 space-y-8">
      <div className="grid grid-cols-3 gap-12">{footerLinks}</div>
      <div className="flex flex-col items-end space-y-2">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <a
            href="/"
            className="w-10 h-10 rounded-full bg-[#639599]/60 items-center justify-center flex text-primary-foreground"
          >
            <icons.socialMedia.facebook />
          </a>
          <a
            href="/"
            className="w-10 h-10 rounded-full bg-[#639599]/60 items-center justify-center flex text-primary-foreground"
          >
            <icons.socialMedia.instagram />
          </a>
          <a
            href="/"
            className="w-10 h-10 rounded-full bg-[#639599]/60 items-center justify-center flex text-primary-foreground"
          >
            <icons.socialMedia.twitter />
          </a>
          <a
            href="/"
            className="w-10 h-10 rounded-full bg-[#639599]/60 items-center justify-center flex text-primary-foreground"
          >
            <icons.socialMedia.youtube />
          </a>
        </div>
        <div className="flex space-x-2">
          <icons.mapPin className="text-primary-foreground" />
          <span className=" text-primary-foreground">{footerAddress}</span>
        </div>
        <p className="text-[#B6B6B6]">{footerYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
