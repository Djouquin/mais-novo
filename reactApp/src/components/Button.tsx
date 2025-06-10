interface Props {
  message: string;
  handler?: () => void | boolean;
  style?: string;
  type?: "submit"|"reset"|"button";
}
const Button = ({message, handler,style,type}: Props) => {
  return (
    <div>
      <button 
        onClick={handler}
        type={type}
        className={`${style || "bg-green-500 p-3"} flex items-center justify-center rounded-2xl active:scale-95 hover:opacity-85`}
      >
      {message}
      </button>
    </div>
  );
};
export default Button;
