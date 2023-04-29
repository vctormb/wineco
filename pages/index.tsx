import Image from 'next/image'
import { ButtonLink } from '@/components/button'
import { MIXPANEL } from '@/utils/mixpanel'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex">
        <div className="flex justify-center min-h-screen w-full py-24 px-20 lg:py-24 lg:px-24 bg-slate-100">
          <section className="flex justify-between h-full gap-10  md:max-h-[30rem] lg:mt-20 lg:max-h-[26rem]">
            <div className="flex flex-[1.4] flex-col justify-end">
              <div className="text-center md:max-w-2xl lg:max-w-full lg:text-left">
                <p className="text-red-900 font-semibold mb-5">
                  Discover our premium wine selection, curated for you
                </p>
                <h1 className="font-semibold text-5xl">
                  Experience Exceptional Wine
                </h1>
                <p className="mt-6 text-lg font-thin lg:max-w-full">
                  Our mission is to bring the world&apos;s best wines to your
                  doorstep, so you can unwind and savor the moment.
                </p>
                <div className="flex flex-col justify-center gap-5 md:gap-10 md:flex-row lg:justify-start mt-10">
                  <ButtonLink href="/#">Shop Now</ButtonLink>
                  <ButtonLink
                    href="/setup/create"
                    color="white"
                    onClick={() =>
                      MIXPANEL.track({
                        eventName: 'Clicked Wine Quiz CTA',
                        properties: {
                          Content: 'hero',
                        },
                      })
                    }
                  >
                    Take the Wine Quiz
                  </ButtonLink>
                </div>
              </div>
            </div>
            <div className="hidden lg:block flex-1">
              <div className="bg-neutral-300 rounded-lg h-full w-full relative">
                <Image
                  draggable={false}
                  alt="Wine cheers"
                  src="/cheers-wine.jpg"
                  className="h-full rounded-lg object-cover"
                  fill
                  priority
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
