import React from "react";
import "./ProjectCard.scss";
import newRequest from "../../utils/newRequest";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ProjectCard({ item }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/gig/${item._id}`} className="link">
      {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="projectCard">
            <img src={item.cover || "/img/stockanimation - Copy.jpg"} alt="" />
            <div className="info">
            <img src={data?.img} alt="" />
          <div className="texts">
            <h2>{item.cat}</h2>
          <span>{data?.username}</span>
            {/*  conditional rendering here to handle cases where data is not available */}
          </div>
          </div>
        </div>
          )}
    </Link>
  );
}

export default ProjectCard;
