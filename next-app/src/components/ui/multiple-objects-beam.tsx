"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { IconUser } from "@tabler/icons-react";
import Image from "next/image";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";


export function AnimatedBeamMultiple({
    className,
}: {
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div1aRef = useRef<HTMLDivElement>(null);
    const div1bRef = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null);
    const div7Ref = useRef<HTMLDivElement>(null);

    const iconsList = [{
        icon: icons.python,
        ref: div1Ref,
    },
    {
        icon: icons.sql,
        ref: div1aRef,
    },
    {
        icon: icons.bash,
        ref: div1bRef,
    },
    {
        icon: icons.js,
        ref: div2Ref,
    }, {
        icon: icons.cpp,
        ref: div3Ref,
    }, {
        icon: icons.c,
        ref: div4Ref,
    }, {
        icon: icons.node,
        ref: div5Ref,
    }]


    return (
        <div
            className={cn(
                "relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg bg-background p-10 md:shadow-xl",
                className,
            )}
            ref={containerRef}
        >
            <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
                <div className="flex flex-col justify-center">
                    <Circle ref={div7Ref} className="p-2">
                        <IconUser color="black" className="size-full" />
                    </Circle>
                </div>
                <div className="flex flex-col justify-center">
                    <Circle ref={div6Ref} className="size-16 p-2">
                        <Image src="/logo.webp" alt="codeframer logo" width={40} height={40} />
                    </Circle>
                </div>
                <div className="flex flex-col justify-center gap-2">
                    {iconsList.map((ele, index) => {
                        return (
                            <Circle key={index} ref={ele.ref} className="p-2">
                                <ele.icon />
                            </Circle>
                        );
                    })}
                </div>
            </div>

            {/* AnimatedBeams */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1aRef}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1bRef}
                toRef={div6Ref}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
                duration={5}
            />
        </div>
    );
}

const icons = {
    python: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z" /><path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z" /></svg>
    ),
    cpp: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" fillRule="evenodd" clipRule="evenodd"><path fill="#00549d" fillRule="evenodd" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z" clipRule="evenodd" /><path fill="#0086d4" fillRule="evenodd" d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255 c0-3.744,0-15.014,0-18.759c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38 c0.677-0.379,1.594-0.371,2.271,0.008c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z" clipRule="evenodd" /><path fill="#fff" fillRule="evenodd" d="M24,10c7.727,0,14,6.273,14,14s-6.273,14-14,14 s-14-6.273-14-14S16.273,10,24,10z M24,17c3.863,0,7,3.136,7,7c0,3.863-3.137,7-7,7s-7-3.137-7-7C17,20.136,20.136,17,24,17z" clipRule="evenodd" /><path fill="#0075c0" fillRule="evenodd" d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784 c0,3.795-0.032,14.589,0.009,18.384c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z" clipRule="evenodd" /><path fill="#fff" fillRule="evenodd" d="M31 21H33V27H31zM38 21H40V27H38z" clipRule="evenodd" /><path fill="#fff" fillRule="evenodd" d="M29 23H35V25H29zM36 23H42V25H36z" clipRule="evenodd" /></svg>
    ),
    c: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" fillRule="evenodd" clipRule="evenodd"><path fill="#283593" fillRule="evenodd" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z" clipRule="evenodd" /><path fill="#5c6bc0" fillRule="evenodd" d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255 c0-3.744,0-15.014,0-18.759c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38 c0.677-0.379,1.594-0.371,2.271,0.008c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z" clipRule="evenodd" /><path fill="#fff" fillRule="evenodd" d="M24,10c7.727,0,14,6.273,14,14s-6.273,14-14,14 s-14-6.273-14-14S16.273,10,24,10z M24,17c3.863,0,7,3.136,7,7c0,3.863-3.137,7-7,7s-7-3.137-7-7C17,20.136,20.136,17,24,17z" clipRule="evenodd" /><path fill="#3949ab" fillRule="evenodd" d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784 c0,3.795-0.032,14.589,0.009,18.384c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z" clipRule="evenodd" /></svg>
    ),
    node: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" baseProfile="basic"><path fill="#21a366" d="M24.007,45.419c-0.574,0-1.143-0.15-1.646-0.44l-5.24-3.103c-0.783-0.438-0.401-0.593-0.143-0.682	c1.044-0.365,1.255-0.448,2.369-1.081c0.117-0.067,0.27-0.043,0.39,0.028l4.026,2.389c0.145,0.079,0.352,0.079,0.486,0l15.697-9.061	c0.145-0.083,0.24-0.251,0.24-0.424V14.932c0-0.181-0.094-0.342-0.243-0.432L24.253,5.446c-0.145-0.086-0.338-0.086-0.483,0	L8.082,14.499c-0.152,0.086-0.249,0.255-0.249,0.428v18.114c0,0.173,0.094,0.338,0.244,0.42l4.299,2.483	c2.334,1.167,3.76-0.208,3.76-1.591V16.476c0-0.255,0.2-0.452,0.456-0.452h1.988c0.248,0,0.452,0.196,0.452,0.452v17.886	c0,3.112-1.697,4.9-4.648,4.9c-0.908,0-1.623,0-3.619-0.982l-4.118-2.373C5.629,35.317,5,34.216,5,33.042V14.928	c0-1.179,0.629-2.279,1.646-2.861L22.36,3.002c0.994-0.562,2.314-0.562,3.301,0l15.694,9.069C42.367,12.656,43,13.753,43,14.932	v18.114c0,1.175-0.633,2.271-1.646,2.861L25.66,44.971c-0.503,0.291-1.073,0.44-1.654,0.44" /><path fill="#21a366" d="M28.856,32.937c-6.868,0-8.308-3.153-8.308-5.797c0-0.251,0.203-0.452,0.455-0.452h2.028	c0.224,0,0.413,0.163,0.448,0.384c0.306,2.066,1.218,3.108,5.371,3.108c3.308,0,4.715-0.747,4.715-2.502	c0-1.01-0.401-1.76-5.54-2.263c-4.299-0.424-6.955-1.371-6.955-4.809c0-3.167,2.672-5.053,7.147-5.053	c5.026,0,7.517,1.745,7.831,5.493c0.012,0.13-0.035,0.255-0.122,0.35c-0.086,0.09-0.208,0.145-0.334,0.145h-2.039	c-0.212,0-0.397-0.149-0.44-0.354c-0.491-2.173-1.678-2.868-4.904-2.868c-3.611,0-4.031,1.257-4.031,2.2	c0,1.143,0.495,1.477,5.367,2.122c4.825,0.64,7.116,1.544,7.116,4.935c0,3.418-2.853,5.379-7.827,5.379" /></svg>
    ),
    js: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#ffd600" d="M6,42V6h36v36H6z" /><path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z" /></svg>
    ),
    sql: () => (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
        <path d="M 43.640625 1.0019531 C 42.177246 0.96137695 40.611719 1.7683594 39.058594 3.1464844 C 38.689594 3.4744844 38.321078 3.8385625 37.955078 4.2265625 C 33.705078 8.7355625 29.759203 17.086844 28.533203 23.464844 C 29.010203 24.432844 29.384859 25.669281 29.630859 26.613281 C 29.693859 26.855281 29.749922 27.081391 29.794922 27.275391 C 29.902922 27.733391 29.960938 28.029297 29.960938 28.029297 C 29.960938 28.029297 29.923578 27.885641 29.767578 27.431641 C 29.737578 27.344641 29.703062 27.250672 29.664062 27.138672 C 29.647063 27.092672 29.625609 27.036562 29.599609 26.976562 C 29.322609 26.331563 28.554797 24.970906 28.216797 24.378906 C 27.927797 25.230906 27.673937 26.027047 27.460938 26.748047 C 28.434938 28.531047 29.027344 31.585937 29.027344 31.585938 C 29.027344 31.585938 28.977422 31.388266 28.732422 30.697266 C 28.515422 30.086266 27.432781 28.188141 27.175781 27.744141 C 26.736781 29.364141 26.56175 30.458609 26.71875 30.724609 C 27.02375 31.240609 27.315313 32.129281 27.570312 33.113281 C 27.659312 33.454281 27.742266 33.806203 27.822266 34.158203 C 27.557266 36.485203 27.495047 38.822719 27.623047 41.136719 C 27.756047 43.644719 28.106906 46.1205 28.503906 48.5625 C 28.545906 48.8195 28.781922 49.005469 29.044922 48.980469 C 29.319922 48.954469 29.522094 48.710547 29.496094 48.435547 C 29.371094 47.104547 29.265266 45.777125 29.197266 44.453125 L 29.257812 45.046875 C 29.162813 43.857875 29.1365 42.577844 29.1875 41.214844 C 29.3685 36.380844 30.482109 30.550609 32.537109 24.474609 C 36.010109 15.302609 40.827328 7.9417344 45.236328 4.4277344 C 41.217328 8.0577344 35.778391 19.807203 34.150391 24.158203 C 32.327391 29.030203 31.034859 33.601422 30.255859 37.982422 C 31.599859 33.875422 35.943359 32.111328 35.943359 32.111328 C 35.943359 32.111328 38.075453 29.482516 40.564453 25.728516 C 39.073453 26.068516 36.622734 26.651094 35.802734 26.996094 C 34.592734 27.504094 34.267578 27.677734 34.267578 27.677734 C 34.267578 27.677734 38.186828 25.289984 41.548828 24.208984 C 46.173828 16.924984 51.212672 6.5767813 46.138672 2.0507812 C 45.359047 1.3555312 44.518652 1.0262988 43.640625 1.0019531 z M 9 3 C 6.8034768 3 5 4.8034768 5 7 L 5 40 C 5 42.196523 6.8034768 44 9 44 L 24 44 A 1.0001 1.0001 0 1 0 24 42 L 9 42 C 7.8885232 42 7 41.111477 7 40 L 7 7 C 7 5.8885232 7.8885232 5 9 5 L 33 5 A 1.0001 1.0001 0 1 0 33 3 L 9 3 z"></path>
    </svg>),
    bash: () => (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
        <linearGradient id="FAKZ2g97PrDXJBy36-66Qa_8gWOBXY72Osj_gr1" x1="35.753" x2="11.271" y1="3.643" y2="46.048" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f9f9f9"></stop><stop offset=".26" stopColor="#f0f1f2"></stop><stop offset=".678" stopColor="#d9dcdf"></stop><stop offset="1" stopColor="#c2c8cc"></stop></linearGradient><path fill="url(#FAKZ2g97PrDXJBy36-66Qa_8gWOBXY72Osj_gr1)" fillRule="evenodd" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0	c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867	c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0	c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867	c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z" clipRule="evenodd"></path><path fill="#343434" d="M23.987,46.221c-1.085,0-2.171-0.252-3.165-0.757c-2.22-1.127-5.118-2.899-7.921-4.613	c-1.973-1.206-3.836-2.346-5.297-3.157C5.381,36.458,4,34.113,4,31.572V16.627c0-2.59,1.417-4.955,3.699-6.173	c3.733-1.989,9.717-5.234,12.878-7.01l0,0c2.11-1.184,4.733-1.184,6.844,0c3.576,2.007,10.369,6.064,14.252,8.513	C43.13,12.874,44,14.453,44,16.182V32c0,2.4-0.859,4.048-2.553,4.895c-0.944,0.531-2.628,1.576-4.578,2.787	c-3.032,1.882-6.806,4.225-9.564,5.705C26.27,45.942,25.128,46.221,23.987,46.221z M21.556,5.188	C18.384,6.97,12.382,10.226,8.64,12.22C7.012,13.088,6,14.776,6,16.627v14.945c0,1.814,0.987,3.49,2.576,4.373	c1.498,0.832,3.378,1.981,5.369,3.199c2.77,1.693,5.634,3.445,7.783,4.536c1.458,0.739,3.188,0.717,4.631-0.056	c2.703-1.451,6.447-3.775,9.456-5.643c1.97-1.223,3.671-2.279,4.696-2.854C41.835,34.464,42,33.109,42,32V16.182	c0-1.037-0.521-1.983-1.392-2.532c-3.862-2.435-10.613-6.467-14.165-8.461C24.913,4.331,23.086,4.331,21.556,5.188L21.556,5.188z"></path><path fill="#343434" d="M22.977,41.654L22.92,28.216c-0.011-2.594,1.413-4.981,3.701-6.204l12.01-6.416	c1.998-1.068,4.414,0.38,4.414,2.646v14.73c0,1.041-0.54,2.008-1.426,2.554l-14.068,8.668	C25.557,45.424,22.987,43.996,22.977,41.654z"></path><linearGradient id="FAKZ2g97PrDXJBy36-66Qb_8gWOBXY72Osj_gr2" x1="32.281" x2="23.433" y1="26.55" y2="41.876" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f9f9f9"></stop><stop offset=".26" stopColor="#f0f1f2"></stop><stop offset=".678" stopColor="#d9dcdf"></stop><stop offset="1" stopColor="#c2c8cc"></stop></linearGradient><path fill="url(#FAKZ2g97PrDXJBy36-66Qb_8gWOBXY72Osj_gr2)" d="M28.799,26.274	c0.123-0.063,0.225,0.014,0.227,0.176l0.013,1.32c0.552-0.219,1.032-0.278,1.467-0.177c0.095,0.024,0.136,0.153,0.098,0.306	l-0.291,1.169c-0.024,0.089-0.072,0.178-0.132,0.233c-0.026,0.025-0.052,0.044-0.077,0.057c-0.04,0.02-0.078,0.026-0.114,0.019	c-0.199-0.045-0.671-0.148-1.413,0.228c-0.778,0.395-1.051,1.071-1.046,1.573c0.007,0.601,0.315,0.783,1.377,0.802	c1.416,0.023,2.027,0.643,2.042,2.067c0.016,1.402-0.733,2.905-1.876,3.826l0.025,1.308c0.001,0.157-0.1,0.338-0.225,0.4	l-0.775,0.445c-0.123,0.063-0.225-0.014-0.227-0.172l-0.013-1.286c-0.664,0.276-1.334,0.342-1.763,0.17	c-0.082-0.032-0.117-0.152-0.084-0.288l0.28-1.181c0.022-0.092,0.071-0.186,0.138-0.246c0.023-0.023,0.048-0.04,0.072-0.053	c0.044-0.022,0.087-0.027,0.124-0.013c0.462,0.155,1.053,0.082,1.622-0.206c0.722-0.365,1.206-1.102,1.198-1.834	c-0.007-0.664-0.366-0.939-1.241-0.946c-1.113,0.002-2.151-0.216-2.168-1.855c-0.014-1.35,0.688-2.753,1.799-3.641l-0.013-1.319	c-0.001-0.162,0.098-0.34,0.225-0.405L28.799,26.274z"></path><path fill="#21a366" d="M37.226,34.857l-3.704,2.185c-0.109,0.061-0.244-0.019-0.244-0.143v-1.252	c0-0.113,0.061-0.217,0.16-0.273l3.704-2.185c0.111-0.061,0.246,0.019,0.246,0.145v1.248C37.388,34.697,37.326,34.801,37.226,34.857"></path>
    </svg>)
}