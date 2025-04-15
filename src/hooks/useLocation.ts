import { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          setError(err.message);
          // Fallback to mock location in development
          if (process.env.NODE_ENV === "development") {
            setLocation({ lat: -26.2041, lng: 28.0473 }); // Johannesburg
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  }, []);

  return { location, error };
};
