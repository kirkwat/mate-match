import { Route, Routes } from "react-router-dom";
import {
  LandingPage,
  RequireAuth,
  Registration,
  Login,
  Missing,
  ProfileExplorer,
  ProfileDetails,
  ProfileEditor,
  RoommateList,
  RequestList,
  PersistentLogin,
} from "..";

export const Router = () => {
  return (
    <Routes>
      <Route path="/">
        {/* public routes */}
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* user routes */}
        <Route element={<PersistentLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<ProfileExplorer />} />
            <Route path="/requests" element={<RequestList />} />
            <Route
              path="/roommates"
              element={<RoommateList standalone={true} />}
            />
            <Route path="/profile" element={<ProfileDetails />} />
            <Route path="/profile/edit" element={<ProfileEditor />} />
            <Route path="/:username/profile" element={<ProfileDetails />} />
          </Route>
          {/* catchall */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
};
