import Title from "@/components/Title";
export default function Home() {
  return (
    <section className="relative flex px-4 w-full max-w-4xl flex-col items-center justify-between sm:items-start">
      <div className="w-full flex items-center justify-center h-[calc(100vh-80px)] flex-col gap-8">
        <h1
          className="text-center text-2xl md:text-3xl opacity-0 inview:opacity-100 transition-all duration-500 translate-y-10 inview:translate-y-0"
          data-inview
        >
          <Title className="block uppercase text-6xl md:text-7xl font-black">
            Benjamin Berlin
          </Title>
          Senior Front End Web Developer
        </h1>
        <h2
          className="text-center text-xl transition-all duration-500 opacity-0 inview:opacity-100 translate-y-10 inview:translate-y-0"
          data-inview
        >
          Leading frontend development teams to leverage cutting-edge front-end
          ecosystems to rapidly create seamless, accessible, and beautifully
          animated user interfaces.
        </h2>
      </div>
    </section>
  );
}
