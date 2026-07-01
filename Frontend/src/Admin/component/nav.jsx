import { ShoppingBag } from "lucide-react"
const Nav = () => {

  return (
    <div className=' w-full flex cursor-pointer py-5 px-5 border-b border-slate-100'>
          <ShoppingBag color='#00b3ff' size={35}/> 
          <h1 
          className='ml-2 font-bold text-sky-500 text-2xl'>ShopNest </h1>
        </div>
  )
}

export default Nav