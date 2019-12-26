import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import StudentList from '~/pages/Student/List';
import StudentForm from '~/pages/Student/Form';
import PlanList from '~/pages/Plan/List';
import PlanForm from '~/pages/Plan/Form';
import EnrollmentList from '~/pages/Enrollment/List';
import EnrollmentForm from '~/pages/Enrollment/Form';

import HelpOrderList from '~/pages/HelpOrder/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={StudentList} isPrivate />
      <Route path="/students/add" exact component={StudentForm} isPrivate />
      <Route path="/students/:id" component={StudentForm} isPrivate />

      <Route path="/plans" exact component={PlanList} isPrivate />
      <Route path="/plans/add" exact component={PlanForm} isPrivate />
      <Route path="/plans/:id" component={PlanForm} isPrivate />

      <Route path="/enrollment" exact component={EnrollmentList} isPrivate />
      <Route
        path="/enrollment/add"
        exact
        component={EnrollmentForm}
        isPrivate
      />
      <Route path="/enrollment/:id" component={EnrollmentForm} isPrivate />

      <Route path="/help_orders" exact component={HelpOrderList} isPrivate />
    </Switch>
  );
}
