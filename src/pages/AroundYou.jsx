import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Loader, Error, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("GB");
  const [loading, setLoading] = useState(true);
  const { isPlaying, activesong } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  // console.log(country);

  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_1wEc2gGA74SqZhTDpBkqsZvyaDICx&ipAdress=8.8.8.8"
      )
      // .then((res) => setCountry(res?.data?.location?.country))
      .then(() => setCountry(country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    // at_1wEc2gGA74SqZhTDpBkqsZvyaDICx
  }, [country]);

  if (isFetching && loading)
    return <Loader title="Loading songs around you..." />;

  if (error && country !== "KE") return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black text-gray-400">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            data={data}
            isPlaying={isPlaying}
            activeSong={activesong}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
