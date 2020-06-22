const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  return { lat: latitude, long: longitude };
};

const error = (err) => {
  console.error("There was an error retrieving location data", err);
};

export const getLocation = () => {
  navigator.geolocation.getCurrentPosition(success, error);
};
