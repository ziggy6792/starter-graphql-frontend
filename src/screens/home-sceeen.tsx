import React from 'react';
import { useSearchUsersQuery } from 'src/generated-types';

const defaultSearch = {
  lastName: 'Ver',
};

const HomeSceen: React.FC = () => {
  const { data } = useSearchUsersQuery({ variables: { input: defaultSearch } });

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.searchUsers?.map(({ lastName, age, dob }) => (
        <div key={lastName}>
          <div>Name: {lastName}</div> <div>Age: {age}</div> <div>Age: {dob.toISOString()}</div>
        </div>
      ))}
    </div>
  );
};

export default HomeSceen;
