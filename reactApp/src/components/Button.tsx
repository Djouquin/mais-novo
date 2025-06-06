interface Props {
  message: string;
  handler?: () => void | boolean;
  style?: string;
}

const Button = ({message, handler,style}: Props) => {
  return (
    <div>
      <button onClick={handler} className={`${style || "bg-green-500 p-3"} flex items-center justify-center rounded-2xl active:scale-95 hover:opacity-85`}>
        {message}
      </button>
    </div>
  );
};
export default Button;
