'use client';

import Link from "next/link";
import { useState } from "react";
import ReduceMotion from "../ReduceMotionToggle";
import DarkMode from '../DarkModeToggle';
import MenuIcon from "@/icons/Menu";
import Lightbox from "./Lightbox";

export default function Menu() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
        <nav className="fixed top-0 left-0 w-full h-25 md:h-30 bg-section z-1000">
            <div className="hidden md:flex w-full max-w-6xl flex-col text-xl px-5 md:flex-row h-20 mx-auto items-center md:gap-8 justify-between font-black">
                <Link href="/">HOME</Link>
                <div className="flex gap-8 w-full md:w-auto justify-between">
                    <Link href="/work-history">WORK HISTORY</Link>
                    <Link href="/projects">PROJECTS</Link>
                </div>
                <Link href="/contact">CONTACT ME</Link>
            </div>
            <div className="md:hidden w-full h-15 flex justify-end items-center px-5">
                <button type="button" onClick={() => setShowMenu(true)} className="cursor-pointer">
                    <MenuIcon />
                </button>
            </div>
            <div className="w-full  border-t border-foreground">
                <div className="h-10 mx-auto max-w-6xl flex gap-8 justify-center">
                    <ReduceMotion label="Reduce Motion" />
                    <DarkMode label="Dark Mode" />
                </div>
            </div>
        </nav>
        <Lightbox visible={showMenu} onClose={() => setShowMenu(false)} />
        </>
    )
}