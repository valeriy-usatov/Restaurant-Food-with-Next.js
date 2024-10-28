import Link from 'next/link';
import Menu from './Menu';
import CartIcon from './CartIcon';
import Image from 'next/image';
import UserLinks from './UserLinks';

const Navbar = () => {
  return (
    <div className="h-12 md:h-24 text-red-500 p-4 flex justify-between items-center border-b-2 border-red-500 uppercase lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/contact">Contact</Link>
      </div>
      {/* LOGO */}
      <div>
        <Link className="text-xl md:font-bold" href="/">
          Massimo
        </Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center">
        <div className="md:absolute top-3 lg:static flex items-center gap-2 px-1 cursor-pointer bg-orange-300 rounded-md">
          <Image src="/phone.png" alt="phone" width={20} height={20} />
          <span>555444</span>
        </div>
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
