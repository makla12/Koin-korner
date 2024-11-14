
function SubmitButton({ value }) {
    return (
    <>
        <button type="submit" className="
            text-[#181818] text-2xl w-2/3 flex justify-center items-center
            bg-yellow-500 hover:cursor-pointer hover:bg-yellow-400 select-none
            p-2 rounded-full mx-auto"
        >{value}</button>
    </>
    );
  }
  
  export { SubmitButton };