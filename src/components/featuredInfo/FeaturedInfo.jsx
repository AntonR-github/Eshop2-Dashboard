import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material/";
import { useEffect, useState } from 'react';
import { userRequest, publicRequest } from "../../constants/requestMethods";

export default function FeaturedInfo() {

  const [income, setIncome] = useState([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await publicRequest.get("orders/income");
        setIncome(res.data);
        setPercent((res.data[0]?.total - res.data[1]?.total) / res.data[1]?.total * 100);
      } catch (err) {
        console.log(err);
      }
    }
    getIncome();
  }, []);
  
 const sales = income[0]?.total - income[1]?.total;

  
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[0]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(percent)}{' '} 
            {percent < 0 ? 
            ( <ArrowDownward className="featuredIcon negative"/> ) 
            : ( <ArrowUpward className="featuredIcon"/> )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${sales}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(percent)}{' '} 
            {percent < 0 ? 
            ( <ArrowDownward className="featuredIcon negative"/> ) 
            : ( <ArrowUpward className="featuredIcon"/> )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
