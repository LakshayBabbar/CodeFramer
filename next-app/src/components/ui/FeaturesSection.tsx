import React from "react";
import { cn } from "@/lib/utils";
import { IconFingerprint } from "@tabler/icons-react";
import { AnimatedBeamMultiple } from "./multiple-objects-beam";
import Ripple from "./ripple";
import HeroVideoDialog from "./hero-video-dialog";
import { EvervaultCard, Icon } from "./evervault-card";
import { HoverBorderGradient } from "./hover-border-gradient";
import ShineBorder from "./shine-border";

export function FeaturesSection() {
    const features = [
        {
            id: 1,
            title: "Multiple Language Support",
            description:
                "Write and run code in various programming languages within a single environment.",
            skeleton: <SkeletonFour />,
            className:
                "col-span-1 w-full h-fit lg:col-span-3 lg:border-b lg:border-r dark:border-neutral-800 border-neutral-300",
        },

        {
            id: 2,
            skeleton: <SkeletonOne />,
            className:
                "col-span-1  lg:col-span-3 lg:border-b dark:border-neutral-800 border-neutral-300",
        },
        {
            id: 3,
            title: "Secure Authentication",
            skeleton: <SkeletonTwo />,
            className:
                "col-span-1 lg:col-span-2 dark:border-neutral-800",
        },
        {
            id: 4,
            title: "Experience CodeFramer in Action",
            description:
                "Watch a quick demo of seamless coding and AI-powered assistance.",
            skeleton: <SkeletonThree />,
            className: "border-l col-span-1 lg:col-span-4 dark:border-neutral-800 border-neutral-300 py-10",
        },
    ];
    return (
        <div className="relative z-20 max-w-7xl mx-auto bg-card">
            <div className="px-8">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                    Packed with lots of features
                </h4>

                <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                    From code execution to real-time debugging, CodeFramer has tools for everything. It can even help you write, improve, and debug your code seamlessly within the editor.
                </p>
            </div>

            <div className="relative ">
                <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border border-neutral-300 rounded-md dark:border-neutral-800">
                    {features.map((feature) => (
                        <FeatureCard key={feature.id} className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className=" h-full w-full">{feature.skeleton}</div>
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
            {children}
        </div>
    );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
            {children}
        </p>
    );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p
            className={cn(
                "text-sm md:text-base  max-w-4xl text-left mx-auto",
                "text-neutral-500 text-center font-normal dark:text-neutral-300",
                "text-left max-w-sm mx-0 md:text-sm my-2"
            )}
        >
            {children}
        </p>
    );
};

export const SkeletonOne = () => {
    return (
        <div className="flex items-center justify-center h-96 md:h-full w-full">
            <p className="text-2xl font-light text-neutral-700 dark:text-neutral-400 text-center mb-4">EDITOR <br />BUILT-IN AI</p>
            <Ripple />
        </div>
    );
};

export const SkeletonThree = () => {
    return (
        <div className="relative">
            <HeroVideoDialog
                animationStyle="top-in-bottom-out"
                videoSrc="https://github.com/user-attachments/assets/918cfc40-e247-4faf-afd2-e854fb5bb10e"
                thumbnailSrc="/editor.webp"
                thumbnailAlt="Hero Video"
            />
        </div>
    );
};

export const SkeletonTwo = () => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start w-[22rem] mx-auto p-4 relative h-[30rem]">
                <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
                <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
                <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
                <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

                <EvervaultCard HeadIcon={<IconFingerprint size={80} className="text-black dark:text-neutral-300" />} />

                <h2 className="dark:text-white text-black  font-light">
                    Experience secure authentication with our advanced encryption methods.
                </h2>
                <div className="mt-2">
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        className="px-4 py-1"
                    >
                        Powred by Auth.js
                    </HoverBorderGradient>
                </div>
            </div>
        </div>
    );
};

export const SkeletonFour = () => {
    return (
        <ShineBorder className="relative w-full p-1"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
            <AnimatedBeamMultiple />
        </ShineBorder>
    );
}