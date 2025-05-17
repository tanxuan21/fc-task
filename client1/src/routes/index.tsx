import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import('@/views/Home'))
const About = lazy(() => import('@/views/About'));
const NotFound = lazy(() => import('@/views/NotFound'));
const DayPlant = lazy(() => import('@/views/DayPlan'));
const Task = lazy(()=>(import('@/views/TaskEditor')));
interface RouteObject {
  path: string;
  element: React.ReactNode;
}



const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dayplan" replace />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '*',
    element: <NotFound />
  },
  { path: "/dayplan", element: <DayPlant></DayPlant> },
  {path:"/taskeditor/",element:<Task></Task>}
];



export default routes;