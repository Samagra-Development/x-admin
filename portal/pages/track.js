import Image from "next/image";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Track from "../components/track/track";

const TrackWrapper = (props) => {
  return (
    <Layout>
      <Track></Track>
    </Layout>
  );
};

export default TrackWrapper;
