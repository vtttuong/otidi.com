const OSM_API_URL = "https://nominatim.openstreetmap.org/search";

export const searchAddress = async (keyword: string) => {
  const params = {
    q: keyword,
    format: "json",
    addressdetails: "1",
  };

  const paramsString = new URLSearchParams(params).toString();

  const options = {
    method: "GET",
  };

  const url = `${OSM_API_URL}?${paramsString}`;
  let locations = [];

  const res = await fetch(url, options);
  const data = await res.json();
  if (data) {
    locations = data.map((item) => ({
      id: item.osm_id,
      address: item.display_name,
      longitude: item.lon,
      latitude: item.lat,
    }));
  }

  return locations;
};
