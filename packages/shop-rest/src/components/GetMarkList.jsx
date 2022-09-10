import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import MarkListTable from "./MarkListTable";
import GoogleMapReact from "google-map-react";

const GetMarkList = () => {
  const [markList, setMarkList] = useState([]);

  const getMarkList = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:4000/api/marklist")
      .then((response) => {
        setMarkList(response.data);
      })
      .catch((err) => {});
  };

  const fetchInitialData = async () => {
    const res = await fetch("http://localhost:4000/api/marklist");
    const initialData = await res.json();
    setMarkList(initialData);
  };
  useEffect(() => {
    fetchInitialData();
  }, []);

  const Map = ({ markList }) => {
    const defaultProps = {
      center: {
        lat: 10.8234917,
        lng: 106.6645122,
      },
      zoom: 15,
    };

    const Marker = (mark) => {
      return (
        <div style={{ fontSize: "24px", color: "Red" }}>
          <div
            className={"vippro"}
            lat={Number(mark.lat)}
            lng={Number(mark.lng)}
          >
            {mark.name}
          </div>
        </div>
      );
    };

    return (
      <div style={{ height: "90vh", width: "80%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCGdylwOS37HVgu289UA6q2J4omA81Rd-w" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {markList.map((mark) => {
            return (
              <Marker
                lat={mark.lat}
                lng={mark.lng}
                name={mark.name}
                key={mark.id}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  };
  return (
    <Fragment>
      <form>
        <button onClick={getMarkList}>get marklist</button>
      </form>
      <MarkListTable markList={markList} />
      <Map markList={markList} />
    </Fragment>
  );
};

export default GetMarkList;
