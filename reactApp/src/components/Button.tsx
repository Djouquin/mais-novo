interface Props {
  message: string;
  handler?: () => void | boolean;
}

const Button = ({ message, handler }: Props) => {
  return (
    <div>
      <button
        onClick={handler}
        style={{
          padding: "10px",
          backgroundColor: "green",
          color: "white",
          fontSize: "16px",
        }}
      >
        {message}
      </button>
    </div>
  );
};
export default Button;
