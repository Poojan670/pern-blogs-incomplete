import { useEffect } from "react";
import { useSelector } from "react-redux";

const Favicon = () => {
  const organizations = useSelector(
    (state) => state.organization.organizations
  );
  useEffect(() => {
    const fav = document.getElementById("favicon");
    if (organizations.length > 0 && organizations[0]?.favicon !== null) {
      const favicon = organizations[0]?.favicon;
      fav.href = favicon;
    }
  }, [organizations]);
  return null;
};
export default Favicon;
