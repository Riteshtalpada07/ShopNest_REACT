import NavLogo from '../components/navLogo';
import NavLink from '../components/navLink';
import NavSearch from '../components/navSearch';

const Navbar = () => {
  return (
    <div  className="
    fixed top-0 z-30
    w-full h-18
    flex items-center justify-between
    bg-white
    border-b border-slate-200
    shadow
    px-4 sm:px-6 md:px-10 lg:px-20 xl:px-35
  ">
        <NavLogo/>

        <NavSearch/>

        <NavLink/> 
    </div>
  )
}

export default Navbar