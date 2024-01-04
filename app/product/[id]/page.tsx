import Link from "next/link";
import { Check, Shield } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/config";
import Container from "@/components/Container";
import { getPayloadClient } from "@/get-payload";
import ImageSlider from "@/components/product/ImageSlider";
import ProductList from "@/components/product/ProductList";
import AddToCartButton from "@/components/AddToCartButton";

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: id,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  const product = docs[0];

  if (!product) {
    return notFound();
  }

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <Container>
      <div className="bg-white max-w-2xl mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-end">
          <ol className="flex items-center gap-2">
            {BREADCRUMBS.map((breadcrumb, i) => (
              <li key={breadcrumb.href}>
                <div className="flex items-center text-sm">
                  <Link
                    href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                  >
                    {breadcrumb.name}
                  </Link>

                  {i !== BREADCRUMBS.length - 1 && (
                    <svg
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <h1 className="mt-4 text-3xl text-gray-900 sm:text-4xl font-bold tracking-tight ">
            {product.name}
          </h1>

          <section className="mt-4">
            <div className="flex items-center gap-4">
              <p className="font-medium text-gray-900">
                {formatPrice(product.price)}
              </p>

              <div className="pl-4 text-muted-foreground border-l border-gray-300">
                {label}
              </div>
            </div>

            <p className="mt-4 text-base text-muted-foreground">
              {product.description}
            </p>

            <div className="flex items-center mt-6">
              <Check
                className="h-5 w-5 flex-shrink-0 text-green-500"
                aria-hidden="true"
              />

              <p className="ml-2 text-sm text-muted-foreground">
                Eligible for instant delivery
              </p>
            </div>
          </section>
        </div>

        {/* Product images */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-square rounded-lg">
            <ImageSlider urls={validUrls} />
          </div>
        </div>
      </div>

      {/* add to cart part */}
      <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
        <AddToCartButton product={product} />

        <div className="mt-6 text-center">
          <div className="group inline-flex text-sm text-medium">
            <Shield
              className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />

            <span className="text-muted-foreground hover:text-gray-700">
              30 Day Return Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <ProductList
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
        href="/products"
        query={{ category: product.category, limit: 4 }}
      />
    </Container>
  );
}
