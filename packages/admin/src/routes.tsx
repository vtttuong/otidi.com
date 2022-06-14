import React, {useContext, lazy, Suspense} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {
  LOGIN,
  POSTS,
  CATEGORY,
  DASHBOARD,
  ORDERS,
  SETTINGS,
  BANNERS,
  FAQS,
  COUPONS,
  TASKS,
  STAFF_MEMBERS,
  SITE_SETTINGS,
  USERS,
  BRANDS,
} from "settings/constants";
import AuthProvider, {AuthContext} from "context/auth";
import {InLineLoader} from "components/InlineLoader/InlineLoader";
import Brands from "containers/Brand/Brand";
import Payments from "containers/Payments/Payments";
import Users from "containers/Users/Users";
const Posts = lazy(() => import("containers/Posts/Posts"));
const AdminLayout = lazy(() => import("containers/Layout/Layout"));
const Dashboard = lazy(() => import("containers/Dashboard/Dashboard"));
const Category = lazy(() => import("containers/Category/Category"));
const Orders = lazy(() => import("containers/Orders/Orders"));
const Settings = lazy(() => import("containers/Settings/Settings"));
const SiteSettingForm = lazy(
  () => import("containers/SiteSettingForm/SiteSettingForm")
);
const StaffMembers = lazy(() => import("containers/StaffMembers/StaffMembers"));
const Customers = lazy(() => import("containers/Customers/Customers"));
const Banners = lazy(() => import("containers/Banners/Banners"));
const Faqs = lazy(() => import("containers/Faqs/Faqs"));
const Coupons = lazy(() => import("containers/Coupons/Coupons"));
const Tasks = lazy(() => import("containers/Tasks/Tasks"));
const Login = lazy(() => import("containers/Login/Login"));
const NotFound = lazy(() => import("containers/NotFound/NotFound"));

/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 */

function PrivateRoute({children, ...rest}) {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location},
            }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <PrivateRoute exact={true} path={DASHBOARD}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Dashboard />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <PrivateRoute path={POSTS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Posts />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={BRANDS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Brands />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>

          <PrivateRoute path={ORDERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Payments />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>

          <PrivateRoute path={USERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Users />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>

          {/*<PrivateRoute path={FAQS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Faqs />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={BANNERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Banners />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={COUPONS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Coupons />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={TASKS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Tasks />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Settings />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={STAFF_MEMBERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <StaffMembers />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={SITE_SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <SiteSettingForm />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
        <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    </AuthProvider>
  );
};

export default Routes;
