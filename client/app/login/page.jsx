'use client';
import '@/app/styles/App.css';
import { Menu } from '@/components/Menu.jsx'

function Home() {
  return (
    <>
      <Menu/>
      <div className="flex justify-center items-center m-14">
        <form className="
        w-[30vw] h-[66vh] bg-[#d3d3d3] dark:bg-[#404040] text-[#303030] dark:text-[#f3f3f3]
        rounded-lg p-4 flex justify-center items-start">
            <label htmlFor="username" className="text-lg">Nazwa użytkownika:</label>
            <input type="text" id="username" className="
            text-md text-[#303030] "/>
        </form>
      </div>
    </>
  );
}

export default Home;