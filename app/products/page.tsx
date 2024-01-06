import { PRODUCT_CATEGORIES } from "@/config";
import Container from "@/components/Container";
import ProductList from "@/components/product/ProductList";

const parse = (value: string | string[] | undefined) => {
  return typeof value === "string" ? value : undefined;
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sort = parse(searchParams.sort);

  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <Container className="pt-20">
      <ProductList
        title={label ?? "Browse high-quality assets"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </Container>
  );
}
