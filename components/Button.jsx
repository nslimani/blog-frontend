const Button = (props) => {
  const { className, ...otherProps } = props;

  return (
    <button
      className={"bg-green-500 w-24 p-2 rounded-md font-bold " + className}
      {...otherProps}
    />
  );
};

export default Button;
