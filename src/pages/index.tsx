import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed';

import AppLayout from '../layouts/AppLayout';

const index = () => {
  return (
    <AppLayout>
      <CreatePost />
      <Feed />
    </AppLayout>
  );
};

export default index;
