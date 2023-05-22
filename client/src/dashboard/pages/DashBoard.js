import DashboardLayout from "../layout/DashboardLayout";
import CardLineChart from "../components/Charts/CardLineChart";
import CardBarChart from "../components/Charts/CardBarChart";
import Activities from "../components/Charts/Activities";
import classNames from "classnames";
import TopBloggers from "../components/TopBloggers";
import { useSelector } from "react-redux";
import MyTopBloggers from "../components/MyTopBloggers";

const DashBoard = ({ isOpen, setIsOpen, theme }) => {
  const { role, userid } = useSelector((state) => state.auth);
  return (
    <DashboardLayout isOpen={isOpen} setIsOpen={setIsOpen} theme={theme}>
      {/* BAR CHART */}
      <div
        className={classNames(
          "fixed w-[50%] h-[100%] top-[4rem] left-0",
          theme === "dark" && "bg-gray-800"
        )}
      >
        <CardBarChart theme={theme} />
      </div>

      {/* LINE CHART */}
      <div
        className={classNames(
          "fixed w-[50%] h-[50%] top-[4rem] left-[50%]",
          theme === "dark" && "bg-gray-800"
        )}
      >
        <CardLineChart theme={theme} />
      </div>

      {/* ACTIVITIES */}
      <div className="fixed w-[50%] h-[50%] top-[50%] left-0">
        <Activities theme={theme} />
      </div>

      {/* TOP BLOGGERS */}
      {role === "ADMIN" ? (
        <TopBloggers theme={theme} />
      ) : (
        <MyTopBloggers theme={theme} userid={userid} />
      )}
    </DashboardLayout>
  );
};

export default DashBoard;
