import "../assests/custom.scss";

export const Demonstration = () => {
  return (
    <>
      <div className="parent">
        <div className="orbit-path-hidden">
          <div className="orbit-circle orbit-circle-secondary" />
        </div>
        <div className="circle circle-primary" />
      </div>
      <p className="mt-2">Hover over the circle in the center.</p>
    </>
  );
};
