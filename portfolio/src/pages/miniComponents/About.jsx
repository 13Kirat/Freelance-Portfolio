import React, { useEffect, useState } from "react";

const About = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden" id="about">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src="/photo.jpg"
              alt="avatar"
              className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              I am Dr. Anil Singh, faculty in the Department of Electronics and Communication Engineering at Thapar Institute of Engineering and Technology, Patiala. My research focuses on Mixed-Signal Design, targeting smart, high-speed, and high-resolution ADCs for deep sub-micron CMOS technologies.
            </p>
            <p>
              I aim to create low-power, low-area, and cost-effective converters that remain robust against PVT variations through AI-driven adaptability. My vision is to bridge analog precision with AI intelligence, shaping the next generation of smarter, scalable, and energy-efficient mixed-signal systems.
            </p>
          </div>
        </div>
        {/* <p className="tracking-[1px] text-xl">
          My dedication and perseverance in timely delivery of work are integral
          to me. I maintain the courage to face any challenges for extended
          periods.
        </p> */}
      </div>
    </div>
  );
};

export default About;
