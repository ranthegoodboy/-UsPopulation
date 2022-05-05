import Head from "next/head";

import styles from "../styles/Home.module.css";

import Slider from "react-slick";

export default function Home({ data }) {
  console.log(data);

  const settings = {
    dots: true,
    arrows: true,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>USA Population</title>
        <meta name="Test Application" content="Test Application" />
      </Head>
      <div className="container">
        <Slider {...settings}>
          {data.map((element, index) => (
            <div key={index} onClick={() => console.log(index)}>
              <div className="slide-wrapper">
                <div className="nation-id">({element["ID Nation"]})</div>
                <div className="nation">{element["Nation"]}</div>
                <div className="year">Year: {element["ID Year"]}</div>
                <div className="population">
                  Population: {element["Population"]}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
    );
    const { data } = await res.json();
    return {
      props: { data },
    };
  } catch (error) {
    console.error(error);
  }
}
