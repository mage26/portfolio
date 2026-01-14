import projects from "./projects.json";
import Card from "@/components/Card";
import Title from "@/components/Title";
import Carousel from "@/components/Carousel";
import ArrowRight from "@/icons/ArrowRight";

export default function WorkHistory() {
  return (
    <section className="relative flex justify-center gap-8 w-full max-w-6xl flex-col">
      <Title
        Element="h1"
        className="block uppercase text-4xl font-black text-center"
      >
        Projects
      </Title>
      <Carousel.Root>
        <Carousel.Content className="shadow-xl">
          {projects.map(({ name, description, image, example }) => (
            <Carousel.Item key={name.toLowerCase().replaceAll(" ", "-")}>
              <Card
                name={name}
                description={[description]}
                image={image}
                example={example}
              />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.ScrollbarRoot>
          <Carousel.ScrollbarTrack>
            <Carousel.ScrollbarThumb />
          </Carousel.ScrollbarTrack>
        </Carousel.ScrollbarRoot>

        <Carousel.ControlBack className="size-12 rotate-y-180 md:size-16 absolute flex items-center justify-center left-0 bg-primary dark:bg-primary-dark hover:bg-secondary dark:hover:bg-secondary-dark top-[135px] md:top-1/2 -translate-y-full md:-translate-x-full transition-all duration-200">
          <ArrowRight />
        </Carousel.ControlBack>
        <Carousel.ControlForward className="size-12 md:size-16 absolute flex items-center justify-center right-0 bg-primary dark:bg-primary-dark hover:bg-secondary dark:hover:bg-secondary-dark top-[135px] md:top-1/2 -translate-y-full md:translate-x-full transition-all duration-200">
          <ArrowRight />
        </Carousel.ControlForward>
      </Carousel.Root>
    </section>
  );
}
