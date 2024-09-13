import Image from "next/image";

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
                  <p className="font-bold text-xl text-secondary-500 ml-3 mt-2">My Starter Site</p>
                </a>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
