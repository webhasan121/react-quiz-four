export default function TextInput({ text, ...rest }) {
  return (
    <label>
      <input type="checkbox" {...rest} /> <span>{text}</span>
    </label>
  );
}
