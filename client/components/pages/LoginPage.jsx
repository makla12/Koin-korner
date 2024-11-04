function LoginPage() {
    return (
    <>

        <div className="flex justify-center items-center my-[25vh]">
            <form className="
                w-[30vw] h-[45vh] bg-[#d3d3d3] dark:bg-[#29292a] text-[#303030] dark:text-[#f3f3f3]
                rounded-lg flex flex-col justify-start p-4"
            >
                <a href="./" className="
                text-[#181818] text-2xl w-[30%] flex justify-center items-center
                bg-yellow-400 hover:cursor-pointer hover:bg-yellow-300 select-none
                p-1 rounded-full
                "
                >Powrót</a>
                <div id="container" className="flex flex-col h-full justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                            <label htmlFor="username" className="text-xl mx-2 p-0.5 mt-1">Nazwa użytkownika:</label>
                            <input type="text" id="username" required className="
                            bg-[#505053] rounded-lg w-[35ch] p-1 px-2.5 mb-3.5
                            "/>

                            <label htmlFor="password" className="text-xl mx-2 p-0.5 mt-1">Hasło:</label>
                            <input type="password" id="password"  required className="
                            bg-[#505053] rounded-lg w-[35ch] p-1 px-2.5 mb-3.5
                            "/>
                    </div>

                    <button type="submit" className="
                    text-[#181818] text-2xl w-2/3 flex justify-center items-center
                    bg-yellow-500 hover:cursor-pointer hover:bg-yellow-400 select-none
                    p-2 rounded-full mx-auto my-4
                    ">Zaloguj</button>
                    <p className="text-md text-[#303030] dark:text-[#f3f3f3]">Nie masz konta? Zarejestruj się <a href="./signup" className="text-yellow-500 underline">tutaj</a></p>
                </div>
                
            </form>
        </div>
    </>
    );
}
  
export { LoginPage };