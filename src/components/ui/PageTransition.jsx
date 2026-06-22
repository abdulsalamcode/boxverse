import { useEffect, useState } from "react";
import { useLocation }         from "react-router-dom";

const PageTransition = ({ children }) => {
  const location          = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`transition-all duration-500
      ${visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4"
      }`}>
      {children}
    </div>
  );
};

export default PageTransition;