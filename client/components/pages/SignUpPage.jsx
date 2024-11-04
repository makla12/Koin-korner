function SignUpPage() {
    function checkInfo(event) {
        if (document.getElementById("password").value != document.getElementById("confirmPassword").value) {
            event.preventDefault();
        }
    }

    return (
    <>

        <div className="flex justify-center items-center m-16">
            <form className="
                w-[30vw] h-[66vh] bg-[#d3d3d3] dark:bg-[#29292a] text-[#303030] dark:text-[#f3f3f3]
                rounded-lg flex flex-col justify-start p-4"
                onSubmit={checkInfo}
            >
                <a href="./" className="
                text-[#181818] text-2xl w-[30%] flex justify-center items-center
                bg-yellow-400 hover:cursor-pointer hover:bg-yellow-300 select-none
                p-1 rounded-full
                "
                >Powrót</a>
                <div id="container" className="flex flex-col h-full justify-around items-center">
                    <div className="flex flex-col justify-center items-center">
                            <label htmlFor="username" className="text-xl mx-2 p-0.5 mt-1">Nazwa użytkownika:</label>
                            <input type="text" id="username" required className="
                            bg-[#505053] rounded-lg w-[35ch] p-1 px-2.5 mb-3
                            "/>
                        
                            <label htmlFor="email" className="text-xl mx-2 p-0.5 mt-1">Email:</label>
                            <input type="email" id="email"  required className="
                            bg-[#505053] rounded-lg w-[35ch] p-1 px-2.5 mb-3
                            "/>

                            <label htmlFor="password" className="text-xl mx-2 p-0.5 mt-1">Hasło:</label>
                            <input type="password" id="password"  required className="
                            bg-[#505053] rounded-lg w-[35ch] p-1 px-2.5 mb-3
                            "/>

                            <label htmlFor="confirmPassword" className="text-xl mx-2 p-0.5 mt-1">Potwierdź hasło:</label>
                            <input type="password" id="confirmPassword"  required className="
                            bg-[#505053] rounded-lg w-[35ch] p-1 px-2.5 mb-3
                            "/>

                        <div className="my-2 flex items-center justify-center">
                            <input type="checkbox" id="age"  required className="
                            bg-[#505053] rounded-lg w-[2.5ch] h-[2.5ch] hover:cursor-pointer
                            "/>
                            <label htmlFor="age" className="text-lg ml-1 mr-2 p-0.5">Oświadczam, że mam 18 lat</label>
                        </div>
                    </div>

                    <button type="submit" className="
                    text-[#181818] text-2xl w-2/3 flex justify-center items-center
                    bg-yellow-500 hover:cursor-pointer hover:bg-yellow-400 select-none
                    p-2 rounded-full mx-auto
                    ">Zarejestruj</button>
                </div>
                
            </form>
        </div>
    </>
    );
  }
  
export { SignUpPage };