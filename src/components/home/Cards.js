import React from "react";
import { FaUsers, FaUser, FaHistory } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { useHistory } from "react-router";
export default function Cards() {
  const history = useHistory();
  return (
    <div className="cards-container">
      {cards.map((x) => (
        <div className="cards">
          <div className="cards-icon">{x.icon}</div>
          <div className="cards-content">{x.content}</div>
          <div className="cards-link">
            <button onClick={() => history.push(x.link)}>
              Click here{" "}
              <span>
                <BsArrowRight />
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
const cards = [
  {
    icon: <FaUsers />,
    content: "View all Customers",
    link: "/customers",
  },
  {
    icon: <FaUser />,
    content: "View a Customer",
    link: "/search",
  },
  {
    icon: <MdPayment />,
    content: "Transaction",
    link: "/transaction",
  },
  {
    icon: <FaHistory />,
    content: "History",
    link: "/history",
  },
];
