/* eslint-disable react/jsx-filename-extension */
import { SliceSimulator } from '@prismicio/slice-simulator-react';
import { SliceZone } from '@prismicio/react';

import { components } from '../slices';
import state from '../.slicemachine/libraries-state.json';

const SliceSimulatorPage = () => {
  return (
    <SliceSimulator
      state={state}
      sliceZone={({ slices }) => (
        <SliceZone slices={slices} components={components} />
      )}
    />
  );
};

export default SliceSimulatorPage;

// Only include this page in development
export const getStaticProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    return { notFound: true };
  }
  return { props: {} };
};
