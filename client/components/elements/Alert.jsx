function Alert({ isPositive, message }) {
    return (
    <div className={`alert w-[32rem] h-[5rem] px-2 py-6 fixed bottom-4 right-4 z-10 flex justify-between items-center
     ${isPositive ? "bg-green-500" : "bg-red-700"} rounded-xl select-none`}>
        <h1 className="m-1 text-3xl">{isPositive ? "✔" : "!"}</h1>
        <p className="m-1 w-[95%] text-xl">{message}</p>
    </div>
    );
  }
  
export { Alert };