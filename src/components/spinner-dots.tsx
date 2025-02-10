export default function SpinnerDots() {
  return (
    <div className="spinner-dots">
      {Array.from({ length: 10 }, (_, index) => index + 1).map((i) => (
        <span key={i} style={{ "--i": i } as React.CSSProperties}></span>
      ))}
    </div>
  );
}
