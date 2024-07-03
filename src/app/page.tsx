"use client";

import ms from "ms";
import useSWR from "swr";
import Link from "next/link";
import { Lanyard } from "@/types";
import NextImage from "next/image";
import ColorThief, { RGBColor } from "colorthief";
import React, { ReactElement, useState, useEffect } from "react";
import { rgbToHex, fetcher, findBrightestColor } from "@/app/utils";

const discord_status: { [key: string]: ReactElement } = {
  online: <span className="text-cgreen">online</span>,
  idle: <span className="text-yellow-500">idle</span>,
  dnd: (
    <>
      on <span className="text-cred">do not disturb</span>
    </>
  ),
  offline: <span className="text-gray-500">offline</span>,
};

export default function Home() {
  const { data, isLoading, error } = useSWR<Lanyard>(
    "https://api.lanyard.rest/v1/users/731728644837343275",
    fetcher
  );
  const [musicColor, setMusicColor] = useState<RGBColor>([0, 0, 0]);

  useEffect(() => {
    const activities = data?.data.activities;

    activities?.map(async (activity) => {
      if (activity.id === "65206c178aacee48") {
        try {
          let colorThief = new ColorThief();
          const img = new Image();

          img.crossOrigin = "Anonymous";
          img.src = "https://" + activity.assets.large_image.split("https/")[1];

          if (img.complete) {
            setMusicColor(
              findBrightestColor(colorThief.getPalette(img, 3)!) || [0, 0, 0]
            );
          } else {
            img.addEventListener("load", function () {
              setMusicColor(
                findBrightestColor(colorThief.getPalette(img, 3)!) || [0, 0, 0]
              );
            });
          }
        } catch (err) {
          console.error("Error fetching image:", err);
        }
      }
    });
  }, [data?.data.activities]);

  return (
    <main className="text-cwhite bg-cblack-100 h-screen">
      <div className="flex justify-center items-center h-full flex-col gap-2">
        <section className="flex flex-col gap-3 bg-cblack-200 p-4 rounded max-w-[45rem] w-[22rem] md:w-[45rem]">
          {/* Header */}
          <section>
            <h1 className="text-3xl font-medium">
              Hey, I&apos;m <span className="text-cblue">Gilly!</span> 👋
            </h1>
            <p>
              Also known as Kurp, I&apos;m a highschool senior in Jamaica who likes
              to code in my free time.
            </p>
          </section>

          <div className="bg-[#474747] h-0.5" />

          {/* Current Activites */}
          <section className="flex flex-col">
            <h1 className="text-xl">Right now...</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Couldn&apos;t fetch data!</p>}
            {data && (
              <ul className="list-disc list-inside">
                <li>I&apos;m {discord_status[data!.data.discord_status]}</li>
                {data?.data.activities?.map((activity) => {
                  if (activity.id === "65206c178aacee48") {
                    return (
                      <li key={activity.id}>
                        I&apos;m listening to{" "}
                        <span style={{ color: rgbToHex(...musicColor) }}>
                          {activity.details}
                        </span>{" "}
                        {activity.state} on{" "}
                        <span className="text-applemusic">Apple Music</span>
                      </li>
                    );
                  }

                  if (activity.id === "9012e87075717b0a") {
                    return (
                      <li key={activity.id}>
                        I&apos;m{" "}
                        {activity.state?.split(" ")[1] ? (
                          <>
                            working on{" "}
                            <span className="text-cgrey">
                              {activity.state?.split(" ")[1]}
                            </span>{" "}
                            using
                          </>
                        ) : (
                          "idling on"
                        )}{" "}
                        <span className="text-vsc">{activity.name}</span> for{" "}
                        {ms(Date.now() - activity.timestamps.start!, {
                          long: true,
                        })}
                      </li>
                    );
                  }
                })}
              </ul>
            )}
          </section>

          <div className="bg-[#474747] h-0.5" />

          {/* Connections */}
          <section className="flex gap-2 flex-col">
            <h1 className="text-xl">Contact me!</h1>
            <ol className="flex gap-2">
              <Link
                href="mailto:test@example.com"
                className="flex gap-1 px-2 py-1 bg-slate-600 rounded w-fit"
              >
                <span className="bg-white p-1 rounded-xl">
                  <NextImage
                    src={"/email.svg"}
                    alt="discord logo"
                    height={16}
                    width={16}
                  />
                </span>
                Email
              </Link>
              <Link
                href="https://discord.com/users/731728644837343275"
                className="flex gap-1 px-2 py-1 bg-discord rounded w-fit"
              >
                <span className="bg-white p-1 rounded-xl">
                  <NextImage
                    src={"/discord.svg"}
                    alt="discord logo"
                    height={16}
                    width={16}
                  />
                </span>
                Discord
              </Link>
              <Link
                href="https://github.com/Kurpp"
                className="flex gap-1 px-2 py-1 bg-github rounded w-fit items-center"
              >
                <NextImage
                  src={"/github.svg"}
                  alt="discord logo"
                  height={20}
                  width={20}
                />
                Github
              </Link>
            </ol>
          </section>
        </section>

        <section className="flex flex-col gap-3 bg-cblack-200 p-4 rounded max-w-[45rem] w-[22rem] md:w-[45rem]">
          {/* Header */}
          <section>
            <h1 className="text-2xl font-medium">My Projects!</h1>
            <p>Below are my projects, feel free to check them out!</p>
          </section>

          <div className="bg-[#474747] h-0.5" />

          <div className="grid md:grid-cols-2 gap-2">
            <Link
              href="https://github.com/Kurpp/website"
              className="bg-[#545A63] rounded p-2 border-solid border-cgrey border-2"
            >
              <div className="flex justify-between">
                <div>
                  <h1 className="text-lg">kurp.dev</h1>
                  <p className="text-sm">
                    My personal website! <br />
                    It&apos;s the first website I&apos;ve made and the one you are on
                    right now.
                  </p>
                </div>
                <div>
                  <NextImage
                    alt="screenshot of kurp.dev"
                    width={200}
                    height={50}
                    src="/kurp-dev.png"
                    className="rounded"
                  />
                </div>
              </div>
            </Link>
            <Link
              href="/"
              className="bg-[#545A63] rounded p-2 border-solid border-cgrey border-2"
            >
              <div className="flex justify-between">
                <div>
                  <h1 className="text-lg">Coming soon!</h1>
                  {/* <p className="text-sm">
                    My personal website! <br />
                    It&apos;s the first website I&apos;ve made and the one you are on
                    right now.
                  </p> */}
                </div>
                {/* <div>
                  <NextImage
                    alt="screenshot of kurp.dev"
                    width={200}
                    height={50}
                    src="/kurp-dev.png"
                    className="rounded"
                  />
                </div> */}
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
