import axios from "axios";
import { useState } from "react";
import { FormInput } from "@/components/elements/FormInput";
import { SubmitButton, submitButton } from "@/components/elements/SubmitButton";
import { ReturnButton, returnButton } from "@/components/elements/RetutnButton";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const req = await axios.post("http://localhost:8080/auth/logIn",{username:username, password:password}, { withCredentials:true });
        if(req.data.suc){
            window.location = "/"
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login();
    }

    return (
    <>
        <div className="flex justify-center items-center my-[25vh]">
            <form className="
                w-[30vw] h-[45vh] bg-[#d3d3d3] dark:bg-[#29292a] text-[#303030] dark:text-[#f3f3f3]
                rounded-lg flex flex-col justify-start p-4"
                onSubmit={handleSubmit}
            >
                <ReturnButton />
                <div id="container" className="flex flex-col h-full justify-center items-center">

                    <div className="flex flex-col justify-center items-center">
                        <FormInput type={"text"} formLabel={"Nazwa użytkownika:"} formControl={setUsername} />
                        <FormInput type={"password"} formLabel={"Hasło:"} formControl={setPassword} />
                    </div>

                    <SubmitButton value={"Zaloguj"} />
                </div>
                
            </form>
        </div>
    </>
    );
}
  
export { LoginPage };