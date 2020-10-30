import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import Search from "../components/search";
import Slider from "../components/slider";
import Header from "../components/header";
import Layout from "../components/layout";
import PageBody from "../components/pagebody";
import getTopDeals from "../helpers/buildtime/getTopDeals";
import getCities from "../helpers/buildtime/getCities";
import axios from "axios";
import Cities from "../components/Thumbnail/cities";
import TopDeals from "../components/Thumbnail/topDeals";
import Picture from "../components/Thumbnail/picture";
import Link from "next/link";

export default function Home({ citiesdata, topdata }) {
  return (
    <div>
      <Layout>
          <Nav />
  
        <PageBody>
          <Search />
          <Slider />
          <div>
            {citiesdata
              ? citiesdata.map((city) => (
                  <Cities
                    key={city._id}
                    city_name={city.city_name}
                    number_of_hotels={city.number_of_hotels}
                  />
                ))
              : "no city data"}
          </div>

          <div>
            {topdata
              ? topdata.map((topdeal) => (
                  <TopDeals
                    key={topdeal._id}
                    name_of_hotel={topdeal.name_of_hotel}
                    name_of_city={topdeal.name_of_city}
                    percentage_off={topdeal.percentage_off}
                    image_url={topdeal.image_url}
                    slug={topdeal.slug}
                  />
                ))
              : "No topdeal data"}
          </div>

          <div>
            {citiesdata
              ? citiesdata.map((picture) => (
                  <Picture
                    key={picture._id}
                    city_name={picture.city_name}
                    number_of_hotels={picture.number_of_hotels}
                    thumb_url={picture.thumb_url}
                  />
                ))
              : "no city data"}
          </div>
        </PageBody>
        <Footer />
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  // params contains the thumb `id`.
  // If the route is like /thumb/1, then params.id is

  const [citiesdata, topdata] = await Promise.all([getCities(), getTopDeals()]);

  return { props: { citiesdata, topdata } };
}
