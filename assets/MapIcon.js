const MapIcon = ({ width = 25, ...props }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 27 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.04163 6.25V22.9167L8.33329 18.75L16.6666 22.9167L23.9583 18.75V2.08334L16.6666 6.25L8.33329 2.08334L1.04163 6.25Z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33337 2.08334V18.75"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.6666 6.25V22.9167"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MapIcon;
