import Image from "next/image";
import Uploader from "@/components/uploader"

export default function Home() {
  return (
    <div id="site">
      <div className="flex flex-col min-h-screen bg-white">
        <header className="relative w-full mx-auto px-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10 w-full">
              <div className="md:w-0 md:flex-1">
                <a className="flex items-center" href="/">
                  <Image src={'/images/travel-blog-logo.webp'} alt="Starter Site" width="230" height="300" decoding="async" className="h-14 sm:h-20 w-auto" />
                  <p className="font-bold text-xl text-primary ml-3 mt-2">我们的故事</p>
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <div className="px-8">
            <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center">         
              <Uploader />
              <div className="md:w-6/12 mt-16 md:mt-0 md:mr-12 lg:mr-16 md:order-first">
                <p className="mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-[#667892]">
                  Through our award-winning blog, we love to provide travelers with guidance and inspiration and connect them to meaningful experiences as they travel the world with curiosity!
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
