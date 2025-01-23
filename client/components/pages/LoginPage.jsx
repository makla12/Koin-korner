import axios from "axios";
import { useState } from "react";
import { FormInput } from "@/components/elements/FormInput";
import { SubmitButton, submitButton } from "@/components/elements/SubmitButton";
import { ReturnButton, returnButton } from "@/components/elements/RetutnButton";
import { Alert } from "../elements/Alert";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
	const [AlertInfo, setAlertInfo] = useState([]);

    const login = async () => {
        const req = await axios.post("http://" + window.location.hostname + ":8080/auth/logIn",{username:username, password:password}, { withCredentials:true });
        if(req.data.suc){
            window.location = "/"
        }
        else{
            showAlert(false, "Niepoprawna nazwa użytkownika lub hasło")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login();
    }
	function showAlert(positive, mess) {
		setAlertInfo([...AlertInfo, {isPositive: positive, message: mess}]);
	}
    
    return (
    <>
		{
			AlertInfo.map((obj, index) => (
				<Alert key={index} isPositive={obj.isPositive} message={obj.message}/>
			))
		}
        <div className="flex justify-center items-center my-[25vh]">
            <div className="
                w-[30vw] h-[45vh] bg-[#d3d3d3] dark:bg-[#29292a] text-[#303030] dark:text-[#f3f3f3]
                rounded-lg flex flex-col justify-start p-4"
            >
                <ReturnButton />
                <form id="container" className="flex flex-col h-full justify-center items-center" onSubmit={handleSubmit}>

                    <div className="flex flex-col justify-center items-center">
                        <FormInput type={"text"} formLabel={"Nazwa użytkownika:"} formControl={setUsername} />
                        <FormInput type={"password"} formLabel={"Hasło:"} formControl={setPassword} />
                    </div>
                    <SubmitButton value={"Zaloguj"} />
                </form>
                
            </div>
        </div>
    </>
    );
}
  
export { LoginPage };