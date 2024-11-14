import axios from "axios";
import { useState } from "react";
import { FormInput } from "@/components/elements/FormInput";
import { SubmitButton } from "@/components/elements/SubmitButton";
import { ReturnButton } from "@/components/elements/RetutnButton";

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async () => {
        const req = await axios.post("http://" + window.location.hostname + ":8080/auth/register",{email:email, username:username, password:password}, { withCredentials:true });
        if(req.data.suc){
            window.location = "/"
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Hasła się nie zgadzają");
            return 0;
        }
        register();
    }

    return (
    <>

        <div className="flex justify-center items-center m-16">
            <form className="
                w-[30vw] h-[66vh] bg-[#d3d3d3] dark:bg-[#29292a] text-[#303030] dark:text-[#f3f3f3]
                rounded-lg flex flex-col justify-start p-4"
                onSubmit={handleSubmit}
            >
                <ReturnButton />
                <div id="container" className="flex flex-col h-full justify-around items-center">
                    <div className="flex flex-col justify-center items-center">

                        <FormInput type={"text"} formLabel={"Nazwa użytkownika:"} formControl={setUsername} />
                        <FormInput type={"email"} formLabel={"Email:"} formControl={setEmail} />
                        <FormInput type={"password"} formLabel={"Hasło:"} formControl={setPassword} />
                        <FormInput type={"password"} formLabel={"Powtwierdź hasło:"} formControl={setConfirmPassword} />

                        <div className="my-2 flex items-center justify-center">
                            <input type="checkbox" id="age"  required className="
                            bg-[#505053] rounded-lg w-[2.5ch] h-[2.5ch] hover:cursor-pointer
                            "/>
                            <label htmlFor="age" className="text-lg ml-1 mr-2 p-0.5">Oświadczam, że mam 18 lat</label>
                        </div>

                        <SubmitButton value={"Zarejestruj"} />
                    </div>

                </div>
                
            </form>
        </div>
    </>
    );
  }
  
export { SignUpPage };