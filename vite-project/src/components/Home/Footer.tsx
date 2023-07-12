import footer, { footerAddress, footerYear } from "@/lib/footer";
import Icons from "@/lib/icons";
const Footer = () => {
  const footerLinks = footer.map((item, index) => {
    return (
      <ul className="list-none text-primary-foreground" key={index}>
        <li className="font-bold mb-2">{item.title}</li>
        {item.links.map((link, index) => (
          <li className="text-sm text-[#B6B6B6]" key={index}>
            <a href="/">{link}</a>
          </li>
        ))}
      </ul>
    );
  });
  return (
    <footer className="px-8 md:flex md:justify-between h-max bg-[#1B4B66] mt-8 py-5 space-y-8">
      <div className="grid grid-cols-3 gap-12">{footerLinks}</div>
      <div className="flex flex-col items-end space-y-2">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <a
            href="/"
            className="w-10 h-10 rounded-full bg-[#639599]/60 items-center justify-center flex text-primary-foreground"
          >
            <Icons.socialMedia.facebook />
          </a>
          <a
            href="/"
            className="w-10 h-10 rounded-full bg-[#639599]/60 items-center justify-center flex text-primary-foreground"
          >
            <Icons.socialMedia.instagram />
          </a>
          <a
            href="/"
            className="w-10 h-10 rounded-full bg-[#639599]/60 items-center justify-center flex text-primary-foreground"
          >
            <Icons.socialMedia.twitter />
          </a>
          <a
            href="/"
            className="w-10 h-10 rounded-full bg-[#639599]/60 items-center justify-center flex text-primary-foreground"
          >
            <Icons.socialMedia.youtube />
          </a>
        </div>
        <div className="flex space-x-2">
          <Icons.mapPin className="text-primary-foreground" />
          <span className=" text-primary-foreground">{footerAddress}</span>
        </div>
        <p className="text-[#B6B6B6]">{footerYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
