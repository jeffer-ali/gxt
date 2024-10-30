import Image from "next/image";
import { accountDetails } from "@/lib/db"
import { List } from "@/components/list"
// import { debug } from '@/lib/utils';
// import { getUserByToken } from "@/lib/auth/firebase-admin"

export default async function ProfilePage() {
  const res = await accountDetails('utest1')
  console.log(res)
  // setTimeout(() => {
    // debug('debug info', res)
  // },2000)
  
  // const cookie = 'U2FsdGVkX19lP7zYayCKOakOV5%2FWUATFmNRbfBdUtMGIUNs98QyeIn94en4O10Pt30Ur%2BEo6IXuIYVnTLzOZB5ikhH%2Bid2DNmhdPUmCGKtH%2FcT6RdyTn8CU8QSDvcLWC32qUl2SbUBfDAp5VvYIt4xD5mFMaAtAvoHLk8KydQhdEAYc5dzxv7PBBd926Wd81i05gNI71usmNHRSyElBAzY%2FX8Qpi2ipr%2BcP%2BNMIbdu5PXcQdriX0pIZHUqumLVkU1orNb6cA5PXPwXsF%2FcwKB5BHx4frBIeiNL%2BbKkHHAI8gRKFZZ3tkvFYnTRT7E8BaNuHMY4yvUayeR43nIk7f3%2FEaAAYU5CmVlL9li1QD0CYmi7EPi2I6YRbCslTI4P%2FD6pFay50mdrHGknIVyesHrxHWv9UsZHftZmOJkPAwuyMb%2F%2BiGSZuXXD19TpkIxjGQ8TMJlbo3ZjI%2F7wVz397eukt0ocJXyg8jbLFfAtGE%2FiFtXk%2BFrV3fuePt8wjUGHYGH4TxnwtheEBPx7NAiu%2FR76PazJNnkjfOrP2HXcnfpbQjp9KskKQ9hjICfM8%2Fug4vc1ZYPuOb5fSoLjmT5qwOsSS4TwDFcL9xDezxB2VlHj%2BW3p3cr%2ByCiL0EONeIX0IJ6BCFTL3eGR4mW4BZ%2BzlgyiPuv0miMgNohcPJFlI8o0%2BMv%2BwwhGsdPSAMawhYaewAKvblNp1FiKoQWqnQ2h24RjGaROQIy6Iozg1DK4Zbv9DRXAVoBjLUo8inHtPT1gPUQA5O%2BiG44RmcCJRXqWA4zVt4stMIWTHXkG4XJGRQI2D7SR6E0wxdCyF5g%2FT0uuZHN7D%2B7JngCNEDHHZf372YcPIPHZBHXm9c1iOUduW6cSBWDyxOOiAyeYQMR%2BILTJ2ECoYr3o5MX687YjkgogkxzBsLHW5nBevXCK6W1qZDI29mbXfZ7wbIX4qePFNQrRF%2F3Td4MlNO1WDnG0ze0GjsDLEN4p5X%2B%2F5s2lyadiJorpYfGU8OEej%2FlfLaUPD%2FIHDVrQp8Wj%2BuZIXR8NRDaKAuK14hkzOCGKwmRYwUVjknLSAKFsTZaiKWy1EuxlnBmmQPZhySU%2FiAK%2BwObwTpuz5XdvepDNngXuJfgMdHzF5gHZEUtHnlPhnMsDVIHVuCZuvjypxF4qCfPAukfQ%2F6Ugki9w%3D%3D'
  // getUserByToken(cookie)
  return (
    <div className="w-full min-h-screen">
      <List list={res} />
    </div>
    
  );
}
