export default function Background() {
  return (
    <div className="fixed size-full left-0 top-0 bg-background overflow-hidden">
      <span className="absolute block size-[185px] top-[-185px] left-[13%] bg-primary/50 custom-animate [animation-delay:1s]  motion-off:hidden motion-off:md:blockmotion-off:top-[185px] motion-off:rounded-xl motion-off:opacity-60" />
      <span className="absolute block size-[107px] top-[-107px] left-[22%] bg-secondary/50 custom-animate [animation-delay:3s] motion-off:hidden motion-off:md:blockmotion-off:top-[545px] motion-off:roundedxl motion-off:opacity-75" />
      <span className="absolute block size-[189px] top-[-189px] left-[26%] bg-primary/50 custom-animate [animation-delay:8s] motion-off:hidden motion-off:md:blockmotion-off:top-[344px] motion-off:left-[15%] motion-off:rounded-lg motion-off:rotate-12" />
      <span className="absolute block size-[141px] top-[-141px] left-[9%] bg-secondary/50 custom-animate [animation-delay:11s] motion-off:hidden motion-off:md:blockmotion-off:top-80 motion-off:rounded motion-off:opacity-50 motion-off:rotate-45" />
      <span className="absolute block size-[120px] top-[-120px] left-[71%] bg-primary/50 custom-animate [animation-delay:16s] motion-off:hidden motion-off:md:blockmotion-off:top-[60%] motion-off:left-[10%] motion-off:rounded-xl motion-off:opacity-45 motion-off:-rotate-12" />
      <span className="hidden absolute md:block size-[135px] top-[-135px] left-[86%] bg-secondary/50 custom-animate [animation-delay:18s]" />
      <span className="hidden absolute md:block size-[167px] top-[-167px] left-[19%] bg-primary/50 custom-animate [animation-delay:24s]" />
      <span className="hidden absolute md:block size-[145px] top-[-145px] left-[24%] bg-secondary/50 custom-animate [animation-delay:27s]" />
      <span className="hidden absolute md:block size-[166px] top-[-166px] left-[20%] bg-primary/50 custom-animate [animation-delay:26s]" />
    </div>
  );
}
