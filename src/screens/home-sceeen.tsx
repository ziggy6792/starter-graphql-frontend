import React from 'react';
import { useSearchUsersQuery } from 'src/generated-types';

const defaultSearch = {
  name: 'Simon',
};

const HomeSceen: React.FC = () => {
  const { data } = useSearchUsersQuery({ variables: { input: defaultSearch } });

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.searchUsers?.map(({ name, age }) => (
        <div key={name}>
          <div>Name: {name}</div> <div>Age: {age}</div>
        </div>
      ))}
    </div>
  );
};

export default HomeSceen;
