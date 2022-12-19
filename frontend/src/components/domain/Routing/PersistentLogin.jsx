import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken, useAuth } from "../../../hooks";
import { PlainNavBar } from "../../common";

export const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <PlainNavBar />
          <div className="container pt-4 pb-5 mb-4">
            <div className="bg-light rounded p-3 p-md-5 pb-md-4 mb-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="fs-2 fw-bold">&nbsp;Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};
