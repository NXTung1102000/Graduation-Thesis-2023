import React from 'react';

import { getAllUsers } from '../../api/manageUser';

export default function Statistic() {
  // const [allUsers, setAllUsers] = React.useState<unknown>();
  getAllUsers()
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <div>
      <div>Statistic</div>
    </div>
  );
}
