import { useParams } from "react-router-dom";
import "../styles/Area.css";

const Area = () => {
  const areaId = useParams();
  return <div className="area-main-container">Area</div>;
};

export default Area;
