
function FormInput({ formLabel, formControl, type, name }) {
    return (
    <>
        <label className="text-xl mx-2 p-0.5 mt-1">{formLabel}</label>
        <input name={name} type={type} required 
            className="bg-[#505053] rounded-lg w-[35ch] p-1 px-2.5 mb-3.5"
            onChange={(e)=>{
                formControl(e.target.value);
            }}
            minLength={`${type == "password" ? 6 : 1}`}
        />
    </>
    );
  }
  
  export { FormInput };