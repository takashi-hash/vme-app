import { Route, Switch } from "react-router-dom";
import MasterMapView from "../compornents/Map/MasterMapView";
import RegisterMapView from "../compornents/Map/RegisterMapView";
import { MapListPage } from "../compornents/pages/MapListPage";
import { MasterDataInputPage } from "../compornents/pages/MasterDataInputPage";

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <MasterMapView />
      </Route>
      <Route path="/master">
        <MasterDataInputPage />
      </Route>
      <Route exact path="/maps">
        <MapListPage />
      </Route>
      <Route exact path="/maps/:id">
        <RegisterMapView />
      </Route>
    </Switch>
  );
};
