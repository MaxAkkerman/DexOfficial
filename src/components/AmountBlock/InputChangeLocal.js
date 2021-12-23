export default function InputChangeLocal({ name, onBlur, onChange, value }) {
  return (
    <div className="send_inputs">
      <input
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        className="amount_input"
        placeholder="0"
        type="number"
        // max={props.currentToken.balance}
      />
    </div>
  );
}
