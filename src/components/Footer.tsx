import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-black text-white h-[240px] mt-20 p-10">
      <div className="w-full flex justify-between">
        <p className="text-2xl font-semibold">MNMT</p>
        <div className="flex flex-col mr-40">
          <p className="mb-4">Connect</p>
          <Button variant="link" className="justify-start text-white/50 p-0 text-sm font-light">X</Button>
          <Button variant="link" className="justify-start text-white/50 p-0 text-sm font-light">Instagram</Button>
          <Button variant="link" className="justify-start text-white/50 p-0 text-sm font-light">Blog</Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
