import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import serverUrl from "../serverUrl";
const AgentDetails = () => {
  const agentId = useParams().id;
  const [agentData, setAgentData] = useState();

  useEffect(() => {
    axios
      .get(serverUrl + "/agent/" + agentId)
      .then((response) => {
        setAgentData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="AgentDetails">
      <Navbar />
      {agentData ? (
        <>
          <div className="agent-details">
            <div className="card">
              <div className="image-container">
                <img src={serverUrl + "/image/" + agentData.image} alt="" />
              </div>
              <div className="details-container">
                <h1>
                  {agentData.name} {agentData.surname}
                </h1>
                <p>
                  <i class="fa-regular fa-envelope"></i> {agentData.email}
                </p>
                <p>
                  <i class="fa-solid fa-phone"></i> 0{agentData.number}{" "}
                </p>
                <button>Call</button>
              </div>
            </div>
            <div className="form"></div>
          </div>

          <div className="sell-property">
            <form action="POST" className="form-section">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="message">Message:</label>
              <textarea name="message" id="message"></textarea>
              <button type="submit">Contact</button>
            </form>
          </div>
        </>
      ) : (
        <>Loading..</>
      )}
    </div>
  );
};

export default AgentDetails;
