import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Year({ data }) {
  const router = useRouter();
  const { year } = router.query;
  const [showModal, setShowModal] = useState(false);

  const queryTarget = data.find((item) => item["ID Year"].toString() === year);

  return (
    <div>
      <div className="query-wrapper">
        <div className="nation-id">({queryTarget["ID Nation"]})</div>
        <div className="nation">{queryTarget["Nation"]}</div>
        <div className="year">Year: {queryTarget["ID Year"]}</div>
        <button
          className="show-population"
          onClick={() => setShowModal(!showModal)}
        >
          <span>{`${showModal ? "Hide" : "Show"}`}</span> Population
        </button>
        <div className="home-link">
          <Link href={"/"}>
            <a>Home</a>
          </Link>
        </div>
      </div>

      <div id="modal" className={`${showModal ? "show" : "hide"}`}>
        <div>Population for Year {queryTarget["ID Year"]}:</div>
        {queryTarget["Population"]}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://datausa.io/api/data?drilldowns=Nation&measures=Population`
  );
  const { data } = await res.json();
  return { props: { data } };
}
