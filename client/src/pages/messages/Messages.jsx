import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState({});

  const {
    isLoading: isLoadingConversations,
    error: errorConversations,
    data: conversations,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!conversations) return;
      const userDataObj = {};
      for (const conversation of conversations) {
        try {
          const { data } = await newRequest.get(
            `/users/${currentUser.isSeller ? conversation.buyerId : conversation.sellerId}`
          );
          userDataObj[conversation.id] = data.username;
        } catch (error) {
          console.error("Error fetching user data:", error);
          userDataObj[conversation.id] = "Error";
        }
      }
      setUserData(userDataObj);
    };
    fetchUserData();
  }, [conversations, currentUser.isSeller]);

  return (
    <div className="messages">
      {isLoadingConversations ? (
        "Loading..."
      ) : errorConversations ? (
        "Error..."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((conversation) => (
                <tr
                  className={
                    ((currentUser.isSeller && !conversation.readBySeller) ||
                      (!currentUser.isSeller && !conversation.readByBuyer)) &&
                    "active"
                  }
                  key={conversation.id}
                >
                  <td>
                    {userData[conversation.id] || "Loading..."}
                  </td>
                  <td>
                    <Link to={`/message/${conversation.id}`} className="link">
                      {conversation?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(conversation.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !conversation.readBySeller) ||
                      (!currentUser.isSeller && !conversation.readByBuyer)) && (
                      <button onClick={() => handleRead(conversation.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
