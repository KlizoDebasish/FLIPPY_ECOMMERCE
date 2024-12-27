function Button({ text, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 sm:px-4 sm:py-2 md:px-4 md:py-2 font-bold bg-gradient-to-r from-pink-700 to-slate-900 text-white rounded-lg shadow-md 
                  hover:from-white hover:to-pink-500 hover:text-black hover:font-bold
                  transition-all duration-500 ease-in-out transform 
                  hover:scale-90 active:scale-95 
                  text-sm sm:text-base md:text-lg ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
