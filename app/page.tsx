import Link from "next/link";
import Container from "@/components/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import ProductList from "@/components/product/ProductList";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

export default function Home() {
  return (
    <>
      <Container>
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center pt-36 py-20 text-center">
          <h1 className="text-4xl sm:text-6xl text-gray-900 font-bold tracking-tight">
            Your marketplace for high quality{" "}
            <span className="text-violet-600">digital assets</span>.
          </h1>

          <p className="max-w-prose mt-6 text-muted-foreground text-lg">
            Welcome to DigitalHippo. Every asset on our platform is verified by
            our team to ensure our highest quality standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>

            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>

        <ProductList
          title="Brand New"
          href="/products"
          query={{ sort: "desc", limit: 4 }}
        />
      </Container>
      <section className="bg-gray-50 border-t border-gray-200">
        <Container className="py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-6 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-violet-100 text-violet-900 flex items-center justify-center rounded-full">
                  {<perk.Icon className="w-1/3 h-1/3" />}
                </div>

                <h3 className="mt-6 text-base text-gray-900 font-medium">
                  {perk.name}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
