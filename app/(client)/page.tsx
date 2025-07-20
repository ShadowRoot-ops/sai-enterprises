import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";

const Home = async () => {
  const categoriesResult = await getCategories(6);
  return (
    <Container className="">
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categoriesResult.data} />
      <ShopByBrands />
    </Container>
  );
};

export default Home;
